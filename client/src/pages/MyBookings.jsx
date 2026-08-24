import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaPhone, FaTrashAlt, FaPrint, FaBed, FaTag } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";

const MyBookings = () => {
  const [bookings, setBookings] = useState(() => {
    return JSON.parse(localStorage.getItem("hotelBookings")) || [];
  });
  const [currency, setCurrency] = useState(getSelectedCurrency());
  const navigate = useNavigate();

  useEffect(() => {
    const updateCurr = () => setCurrency(getSelectedCurrency());
    window.addEventListener("currencyChange", updateCurr);
    return () => window.removeEventListener("currencyChange", updateCurr);
  }, []);

  const handleCancelBooking = (index) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updatedBookings = bookings.filter((_, i) => i !== index);
      setBookings(updatedBookings);
      localStorage.setItem("hotelBookings", JSON.stringify(updatedBookings));
    }
  };

  const handleViewBill = (booking) => {
    navigate("/bill", { state: booking });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-2">Guest Portal</span>
        <h1 className="fw-bold display-6">My Hotel Reservations</h1>
        <p className="text-muted">Manage your upcoming stays and access printable invoices</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm p-5">
          <FaBed className="display-1 text-muted mb-3" />
          <h3 className="fw-bold text-dark">No Active Reservations Found</h3>
          <p className="text-muted">You haven't booked any rooms yet.</p>
          <Link to="/rooms" className="btn btn-primary btn-lg mt-3 px-4">
            Browse & Book Rooms
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking, index) => (
            <div key={index} className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-warning">
                    <FaBed className="me-2" />
                    {booking.roomType}
                  </span>
                  <span
                    className={`badge ${
                      booking.status === "Confirmed"
                        ? "bg-success"
                        : booking.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {booking.status || "Confirmed"}
                  </span>
                </div>

                <div className="card-body p-4">
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block">
                        <FaUser className="me-1" /> Guest Name
                      </small>
                      <strong className="text-dark">{booking.name}</strong>
                    </div>

                    <div className="col-6">
                      <small className="text-muted d-block">
                        <FaPhone className="me-1" /> Phone
                      </small>
                      <strong className="text-dark">{booking.phone}</strong>
                    </div>

                    <div className="col-6">
                      <small className="text-muted d-block">
                        <FaCalendarAlt className="me-1" /> Check In
                      </small>
                      <strong className="text-dark">{booking.checkIn}</strong>
                    </div>

                    <div className="col-6">
                      <small className="text-muted d-block">
                        <FaCalendarAlt className="me-1" /> Check Out
                      </small>
                      <strong className="text-dark">{booking.checkOut}</strong>
                    </div>
                  </div>

                  {booking.addOns && booking.addOns.length > 0 && (
                    <div className="mb-2 bg-light p-2 rounded small">
                      <strong>Selected Add-ons:</strong> {booking.addOns.join(", ")}
                    </div>
                  )}

                  {booking.promoCode && (
                    <div className="mb-3">
                      <span className="badge bg-success-subtle text-success border border-success px-2 py-1 small">
                        <FaTag className="me-1" /> Coupon Used: {booking.promoCode} (-{formatCurrency(booking.discountAmount || 0, currency)})
                      </span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div>
                      <small className="text-muted d-block">Total Bill Paid</small>
                      <h4 className="fw-bold text-success mb-0">{formatCurrency(booking.totalBill, currency)}</h4>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                        onClick={() => handleViewBill(booking)}
                      >
                        <FaPrint /> Print Bill
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                        onClick={() => handleCancelBooking(index)}
                      >
                        <FaTrashAlt /> Cancel Stay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

