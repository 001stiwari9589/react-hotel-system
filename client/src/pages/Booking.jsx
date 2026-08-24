import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaBed, FaCoffee, FaConciergeBell, FaTag, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";
import { validatePromoCode, calculateDiscount } from "../utils/promoCodes";

const getTodayDateString = () => new Date().toISOString().split("T")[0];
const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const preselectedRoom = location.state?.selectedRoom || "";

  const [booking, setBooking] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    roomType: preselectedRoom || "AC Room",
    checkIn: getTodayDateString(),
    checkOut: getTomorrowDateString(),
    guests: 1,
    addOns: {
      breakfast: false,
      extraBed: false,
      airportTransfer: false,
    },
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState({ text: "", type: "" });
  const [currency, setCurrency] = useState(getSelectedCurrency());

  useEffect(() => {
    const checkCurr = () => setCurrency(getSelectedCurrency());
    window.addEventListener("currencyChange", checkCurr);
    return () => window.removeEventListener("currencyChange", checkCurr);
  }, []);

  // Strict Validation Logic
  const validate = (dataToValidate = booking) => {
    const newErrors = {};
    const today = getTodayDateString();

    // Full Name Validation (Alphabets only)
    const trimmedName = dataToValidate.name.trim();
    if (!trimmedName) {
      newErrors.name = "Full Name is required.";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Full Name must be at least 3 letters long.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      newErrors.name = "Full Name cannot contain numbers or special symbols.";
    }

    // Email Address Validation
    const trimmedEmail = dataToValidate.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    // Phone Number Validation (Exactly 10 digits starting with valid mobile range)
    const cleanPhone = dataToValidate.phone.trim().replace(/\D/g, "");
    if (!dataToValidate.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Phone Number must be exactly 10 digits.";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.";
    }

    // Guests Count Validation (1 to 5)
    const guestsNum = Number(dataToValidate.guests);
    if (!dataToValidate.guests || isNaN(guestsNum)) {
      newErrors.guests = "Number of guests is required.";
    } else if (guestsNum < 1 || guestsNum > 5) {
      newErrors.guests = "Number of guests must be between 1 and 5.";
    }

    // Check-In Date Validation
    if (!dataToValidate.checkIn) {
      newErrors.checkIn = "Check-in date is required.";
    } else if (dataToValidate.checkIn < today) {
      newErrors.checkIn = "Check-in date cannot be in the past.";
    }

    // Check-Out Date Validation
    if (!dataToValidate.checkOut) {
      newErrors.checkOut = "Check-out date is required.";
    } else if (dataToValidate.checkOut <= dataToValidate.checkIn) {
      newErrors.checkOut = "Check-out date must be at least 1 day after Check-In.";
    }

    return newErrors;
  };

  // Keyboard Event Restriction: Name Field (Rejects numbers & symbols)
  const handleNameKeyDown = (e) => {
    const allowedNavigationKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", " "];
    if (allowedNavigationKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^[a-zA-Z.'-]$/.test(e.key)) {
      e.preventDefault(); // Block invalid key stroke instantly
    }
  };

  // Keyboard Event Restriction: Phone Field (Rejects letters & symbols)
  const handlePhoneKeyDown = (e) => {
    const allowedNavigationKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
    if (allowedNavigationKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault(); // Block invalid key stroke instantly
    }
  };

  // Sanitized Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === "name") {
      // Filter out any numbers and invalid characters instantly on paste/typing
      sanitizedValue = value.replace(/[^a-zA-Z\s.'-]/g, "");
    } else if (name === "phone") {
      // Filter out non-digits instantly and cap at 10 digits
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "email") {
      // Remove whitespace instantly
      sanitizedValue = value.replace(/\s/g, "");
    } else if (name === "guests") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly === "") {
        sanitizedValue = "";
      } else {
        const num = parseInt(digitsOnly, 10);
        if (num > 5) sanitizedValue = 5;
        else if (num < 1) sanitizedValue = 1;
        else sanitizedValue = num;
      }
    } else if (name === "checkIn") {
      const today = getTodayDateString();
      const newCheckIn = value < today ? today : value;
      sanitizedValue = newCheckIn;

      // Auto-adjust Check-Out if it falls on or before new Check-In
      if (booking.checkOut <= newCheckIn) {
        const nextDay = new Date(newCheckIn);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split("T")[0];
        setBooking((prev) => ({
          ...prev,
          checkIn: newCheckIn,
          checkOut: nextDayStr,
        }));
        return;
      }
    } else if (name === "checkOut") {
      const minCheckOut = booking.checkIn || getTodayDateString();
      if (value <= minCheckOut) {
        const nextDay = new Date(minCheckOut);
        nextDay.setDate(nextDay.getDate() + 1);
        sanitizedValue = nextDay.toISOString().split("T")[0];
      }
    }

    const updatedBooking = { ...booking, [name]: sanitizedValue };
    setBooking(updatedBooking);

    // Live validation update
    const fieldErrors = validate(updatedBooking);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || "",
    }));
  };

  const handleAddOnToggle = (addonKey) => {
    setBooking((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addonKey]: !prev.addOns[addonKey],
      },
    }));
  };

  const getRoomPricePerNight = (roomType) => {
    if (roomType.includes("AC") && !roomType.includes("Non AC")) return 2000;
    if (roomType.includes("Non AC")) return 1000;
    if (roomType.includes("Luxury") || roomType.includes("Suite") || roomType.includes("Penthouse")) return 5000;
    return 2000;
  };

  const calculateDays = () => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const diffTime = checkOutDate - checkInDate;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const calculateSubtotal = () => {
    const roomPrice = getRoomPricePerNight(booking.roomType);
    const days = calculateDays();
    let total = roomPrice * days;

    if (booking.addOns.breakfast) total += 300 * days * Number(booking.guests);
    if (booking.addOns.extraBed) total += 500 * days;
    if (booking.addOns.airportTransfer) total += 800;

    return Math.round(total * 1.12); // Subtotal with 12% GST
  };

  const discountAmount = appliedPromo ? calculateDiscount(calculateSubtotal(), appliedPromo) : 0;
  const calculateTotalBill = () => {
    const subtotal = calculateSubtotal();
    return Math.max(0, subtotal - discountAmount);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) {
      setPromoMessage({ text: "Please enter a promo code first.", type: "error" });
      return;
    }
    const result = validatePromoCode(promoInput);
    if (result.valid) {
      setAppliedPromo(result.promo);
      setPromoMessage({ text: result.message, type: "success" });
    } else {
      setAppliedPromo(null);
      setPromoMessage({ text: result.message, type: "error" });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoMessage({ text: "", type: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    const selectedAddOnsList = [];
    if (booking.addOns.breakfast) selectedAddOnsList.push("Breakfast Package");
    if (booking.addOns.extraBed) selectedAddOnsList.push("Extra Bed");
    if (booking.addOns.airportTransfer) selectedAddOnsList.push("Airport Pickup");

    const subtotal = calculateSubtotal();
    const totalBill = calculateTotalBill();
    const days = calculateDays();

    const finalBooking = {
      ...booking,
      id: "BK-" + Date.now().toString().slice(-6),
      subtotal,
      discountAmount,
      promoCode: appliedPromo ? appliedPromo.code : null,
      totalBill,
      numberOfNights: days,
      addOns: selectedAddOnsList,
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString(),
    };

    const oldBookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];
    const updatedBookings = [finalBooking, ...oldBookings];
    localStorage.setItem("hotelBookings", JSON.stringify(updatedBookings));

    // Save to records.json outside client folder via backend server
    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalBooking),
    }).catch((err) => console.log("Backend offline or recording failed:", err));

    navigate("/bill", { state: finalBooking });
  };

  const nights = calculateDays();
  const roomRate = getRoomPricePerNight(booking.roomType);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-dark text-white p-4 text-center">
              <h2 className="fw-bold mb-1">
                <FaBed className="me-2 text-warning" /> Reserve Your Room
              </h2>
              <p className="text-light small mb-0">Fill out your stay details below for instant confirmation</p>
            </div>

            <div className="card-body p-4 p-md-5">
              {isSubmitted && Object.keys(errors).length > 0 && (
                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 rounded-3 shadow-sm" role="alert">
                  <FaExclamationTriangle className="fs-5 flex-shrink-0" />
                  <div>
                    <strong>Invalid Form Inputs!</strong> Please correct the highlighted errors before submitting.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Guest Details */}
                <h5 className="fw-bold mb-3 text-primary border-bottom pb-2">Guest Details</h5>
                <div className="row g-3 mb-4">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaUser /></span>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : booking.name ? "is-valid" : ""}`}
                        placeholder="Enter letters only (e.g. Rahul Sharma)"
                        name="name"
                        value={booking.name}
                        onKeyDown={handleNameKeyDown}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.name ? (
                      <small className="text-danger fw-semibold mt-1 d-block">
                        {errors.name}
                      </small>
                    ) : (
                      <small className="text-muted small mt-1 d-block">
                        Letters & spaces only (No numbers allowed)
                      </small>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaEnvelope /></span>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : booking.email ? "is-valid" : ""}`}
                        placeholder="name@example.com"
                        name="email"
                        value={booking.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.email && (
                      <small className="text-danger fw-semibold mt-1 d-block">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaPhone /></span>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? "is-invalid" : booking.phone ? "is-valid" : ""}`}
                        placeholder="10 digit mobile number"
                        name="phone"
                        value={booking.phone}
                        onKeyDown={handlePhoneKeyDown}
                        onChange={handleChange}
                        maxLength={10}
                        required
                      />
                    </div>
                    {errors.phone ? (
                      <small className="text-danger fw-semibold mt-1 d-block">
                        {errors.phone}
                      </small>
                    ) : (
                      <small className="text-muted small mt-1 d-block">
                        Exactly 10 digits starting with 6-9
                      </small>
                    )}
                  </div>

                  {/* Number of Guests */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Number of Guests <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className={`form-control ${errors.guests ? "is-invalid" : "is-valid"}`}
                      name="guests"
                      value={booking.guests}
                      onChange={handleChange}
                      required
                    />
                    {errors.guests && (
                      <small className="text-danger fw-semibold mt-1 d-block">
                        {errors.guests}
                      </small>
                    )}
                  </div>
                </div>

                {/* Reservation Details */}
                <h5 className="fw-bold mb-3 text-primary border-bottom pb-2">Reservation Details</h5>
                <div className="row g-3 mb-4">
                  {/* Select Room Type */}
                  <div className="col-md-12">
                    <label className="form-label fw-bold">
                      Select Room Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-select-lg"
                      name="roomType"
                      value={booking.roomType}
                      onChange={handleChange}
                      required
                    >
                      <option value="AC Room">AC Deluxe Room ({formatCurrency(2000, currency)} / night)</option>
                      <option value="Non AC Room">Non AC Economy Room ({formatCurrency(1000, currency)} / night)</option>
                      <option value="Luxury Room">Luxury Royal Suite ({formatCurrency(5000, currency)} / night)</option>
                    </select>
                  </div>

                  {/* Check In Date */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Check In Date <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaCalendarAlt /></span>
                      <input
                        type="date"
                        className={`form-control ${errors.checkIn ? "is-invalid" : "is-valid"}`}
                        name="checkIn"
                        min={getTodayDateString()}
                        value={booking.checkIn}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.checkIn && (
                      <small className="text-danger fw-semibold mt-1 d-block">
                        {errors.checkIn}
                      </small>
                    )}
                  </div>

                  {/* Check Out Date */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Check Out Date <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><FaCalendarAlt /></span>
                      <input
                        type="date"
                        className={`form-control ${errors.checkOut ? "is-invalid" : "is-valid"}`}
                        name="checkOut"
                        min={booking.checkIn || getTodayDateString()}
                        value={booking.checkOut}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.checkOut && (
                      <small className="text-danger fw-semibold mt-1 d-block">
                        {errors.checkOut}
                      </small>
                    )}
                  </div>
                </div>

                {/* Add-On Services */}
                <h5 className="fw-bold mb-3 text-primary border-bottom pb-2">
                  <FaConciergeBell className="me-2" /> Add-On Services
                </h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <div
                      className={`card p-3 border text-center cursor-pointer ${
                        booking.addOns.breakfast ? "border-success bg-light" : ""
                      }`}
                      onClick={() => handleAddOnToggle("breakfast")}
                    >
                      <FaCoffee className="display-6 text-warning mb-2 mx-auto" />
                      <h6 className="fw-bold mb-1">Breakfast</h6>
                      <small className="text-muted">{formatCurrency(300, currency)} / guest / day</small>
                      <input
                        type="checkbox"
                        className="form-check-input mx-auto mt-2"
                        checked={booking.addOns.breakfast}
                        onChange={() => handleAddOnToggle("breakfast")}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className={`card p-3 border text-center cursor-pointer ${
                        booking.addOns.extraBed ? "border-success bg-light" : ""
                      }`}
                      onClick={() => handleAddOnToggle("extraBed")}
                    >
                      <FaBed className="display-6 text-primary mb-2 mx-auto" />
                      <h6 className="fw-bold mb-1">Extra Bed</h6>
                      <small className="text-muted">{formatCurrency(500, currency)} / night</small>
                      <input
                        type="checkbox"
                        className="form-check-input mx-auto mt-2"
                        checked={booking.addOns.extraBed}
                        onChange={() => handleAddOnToggle("extraBed")}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className={`card p-3 border text-center cursor-pointer ${
                        booking.addOns.airportTransfer ? "border-success bg-light" : ""
                      }`}
                      onClick={() => handleAddOnToggle("airportTransfer")}
                    >
                      <FaConciergeBell className="display-6 text-success mb-2 mx-auto" />
                      <h6 className="fw-bold mb-1">Airport Pickup</h6>
                      <small className="text-muted">{formatCurrency(800, currency)} fixed</small>
                      <input
                        type="checkbox"
                        className="form-check-input mx-auto mt-2"
                        checked={booking.addOns.airportTransfer}
                        onChange={() => handleAddOnToggle("airportTransfer")}
                      />
                    </div>
                  </div>
                </div>

                {/* Promo Code Coupon Box */}
                <h5 className="fw-bold mb-3 text-primary border-bottom pb-2">
                  <FaTag className="me-2" /> Promotional Coupon
                </h5>
                <div className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaTag className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control text-uppercase"
                      placeholder="Try 'WELCOME10', 'LUXURY20', or 'SAVE500'"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      disabled={!!appliedPromo}
                    />
                    {appliedPromo ? (
                      <button
                        type="button"
                        className="btn btn-outline-danger d-flex align-items-center gap-1"
                        onClick={handleRemovePromo}
                      >
                        <FaTimesCircle /> Remove Code
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-dark fw-bold"
                        onClick={handleApplyPromo}
                      >
                        Apply Code
                      </button>
                    )}
                  </div>

                  {promoMessage.text && (
                    <div
                      className={`mt-2 small d-flex align-items-center gap-1 ${
                        promoMessage.type === "success" ? "text-success fw-bold" : "text-danger fw-bold"
                      }`}
                    >
                      {promoMessage.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
                      {promoMessage.text}
                    </div>
                  )}
                </div>

                {/* Price Breakdown Banner */}
                <div className="card bg-light border-0 p-4 mb-4 rounded-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">
                      Base Room Rate ({nights} night{nights > 1 ? "s" : ""}):
                    </span>
                    <span className="fw-bold">{formatCurrency(roomRate * nights, currency)}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Taxes & Service Charge (12% GST):</span>
                    <span className="fw-bold">Included</span>
                  </div>

                  {appliedPromo && (
                    <div className="d-flex justify-content-between align-items-center mb-2 text-success">
                      <span>
                        <FaTag className="me-1" /> Promo Discount ({appliedPromo.code}):
                      </span>
                      <span className="fw-bold">-{formatCurrency(discountAmount, currency)}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
                    <span className="fs-5 fw-bold text-dark">Estimated Total:</span>
                    <span className="fs-3 fw-bold text-success">
                      {formatCurrency(calculateTotalBill(), currency)}
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-success btn-lg w-100 py-3 fw-bold shadow">
                  Confirm & Generate Invoice
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
