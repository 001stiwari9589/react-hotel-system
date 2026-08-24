import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelLogo from "../components/HotelLogo";
import AddRoomModal from "../components/AddRoomModal";
import { FaBed, FaDollarSign, FaCalendarCheck, FaPlus, FaSearch, FaTrashAlt, FaSignOutAlt, FaTag, FaStar, FaCommentDots, FaCheck, FaTimes } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";
import { getPromoCodes, addPromoCode, deletePromoCode } from "../utils/promoCodes";
import { getReviews, deleteReview } from "../utils/reviews";

const Admin = () => {
  const [activeAdminTab, setActiveAdminTab] = useState("bookings"); // 'bookings' | 'promos' | 'reviews'
  const [bookings, setBookings] = useState(() => {
    return JSON.parse(localStorage.getItem("hotelBookings")) || [];
  });
  const [rooms, setRooms] = useState(() => {
    return JSON.parse(localStorage.getItem("hotelRooms")) || [];
  });
  const [promoCodes, setPromoCodesState] = useState(() => getPromoCodes());
  const [reviews, setReviewsState] = useState(() => getReviews());
  const [currency, setCurrency] = useState(getSelectedCurrency());

  // New Promo Code Form State
  const [newPromo, setNewPromo] = useState({ code: "", type: "percent", value: 10, description: "" });
  const [promoFormMsg, setPromoFormMsg] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem("adminLogin"));
    if (!isAdmin) {
      navigate("/adminlogin");
    }

    // Fetch records stored in records.json outside client folder
    fetch("/api/records")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data && resData.data.bookings && resData.data.bookings.length > 0) {
          setBookings((prev) => {
            const mergedMap = new Map();
            [...resData.data.bookings, ...prev].forEach((b) => {
              if (b.id && !mergedMap.has(b.id)) mergedMap.set(b.id, b);
            });
            return Array.from(mergedMap.values());
          });
        }
      })
      .catch((err) => console.log("Backend offline, using localStorage fallback:", err));

    const checkCurr = () => setCurrency(getSelectedCurrency());
    window.addEventListener("currencyChange", checkCurr);
    return () => window.removeEventListener("currencyChange", checkCurr);
  }, [navigate]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this booking record?")) {
      const updatedBookings = bookings.filter((_, i) => i !== index);
      setBookings(updatedBookings);
      localStorage.setItem("hotelBookings", JSON.stringify(updatedBookings));
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = newStatus;
    setBookings(updatedBookings);
    localStorage.setItem("hotelBookings", JSON.stringify(updatedBookings));
  };

  const handleAddRoom = (newRoom) => {
    const updatedRooms = [newRoom, ...rooms];
    setRooms(updatedRooms);
    localStorage.setItem("hotelRooms", JSON.stringify(updatedRooms));
  };

  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!newPromo.code.trim()) return;
    const res = addPromoCode(newPromo);
    if (res.success) {
      setPromoCodesState(res.codes);
      setNewPromo({ code: "", type: "percent", value: 10, description: "" });
      setPromoFormMsg("Promo code created successfully!");
      setTimeout(() => setPromoFormMsg(""), 3000);
    } else {
      setPromoFormMsg(res.message);
    }
  };

  const handleDeletePromo = (code) => {
    if (window.confirm(`Delete promo code ${code}?`)) {
      const updated = deletePromoCode(code);
      setPromoCodesState(updated);
    }
  };

  const handleDeleteReview = (id) => {
    if (window.confirm("Delete this guest review?")) {
      const updated = deleteReview(id);
      setReviewsState(updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/adminlogin");
  };

  // Calculations for Admin Analytics
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalBill) || 0), 0);
  const activeBookingsCount = bookings.filter((b) => b.status !== "Cancelled").length;

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm) ||
      b.roomType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || (b.status || "Confirmed") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-5">
      {/* Top Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <HotelLogo size="lg" light={true} />
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-success d-flex align-items-center gap-2 shadow-sm"
            onClick={() => setShowAddRoomModal(true)}
          >
            <FaPlus /> Add New Room
          </button>
          <button className="btn btn-outline-danger d-flex align-items-center gap-2 shadow-sm" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-uppercase small fw-bold text-light">Total Revenue</span>
                <h2 className="fw-bold mb-0 mt-2">{formatCurrency(totalRevenue, currency)}</h2>
              </div>
              <FaDollarSign className="display-4 opacity-50" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-success text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-uppercase small fw-bold text-light">Active Reservations</span>
                <h2 className="fw-bold mb-0 mt-2">{activeBookingsCount}</h2>
              </div>
              <FaCalendarCheck className="display-4 opacity-50" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-uppercase small fw-bold text-light">Total Registered Rooms</span>
                <h2 className="fw-bold mb-0 mt-2">{rooms.length || 6}</h2>
              </div>
              <FaBed className="display-4 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn px-4 py-2 rounded-pill fw-bold ${
            activeAdminTab === "bookings" ? "btn-primary" : "btn-light text-dark border"
          }`}
          onClick={() => setActiveAdminTab("bookings")}
        >
          <FaCalendarCheck className="me-2" /> Reservations ({bookings.length})
        </button>

        <button
          className={`btn px-4 py-2 rounded-pill fw-bold ${
            activeAdminTab === "promos" ? "btn-primary" : "btn-light text-dark border"
          }`}
          onClick={() => setActiveAdminTab("promos")}
        >
          <FaTag className="me-2" /> Promo Codes ({promoCodes.length})
        </button>

        <button
          className={`btn px-4 py-2 rounded-pill fw-bold ${
            activeAdminTab === "reviews" ? "btn-primary" : "btn-light text-dark border"
          }`}
          onClick={() => setActiveAdminTab("reviews")}
        >
          <FaCommentDots className="me-2" /> Customer Reviews ({reviews.length})
        </button>
      </div>

      {/* Bookings Section */}
      {activeAdminTab === "bookings" && (
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <h4 className="fw-bold mb-0">Booking Reservations Management</h4>

            <div className="d-flex gap-2">
              {/* Search input */}
              <div className="input-group" style={{ maxWidth: "250px" }}>
                <span className="input-group-text bg-light">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search guest or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked-In">Checked-In</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted">No reservations matching current criteria.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Guest Name</th>
                    <th>Contact Info</th>
                    <th>Room Type</th>
                    <th>Dates (In / Out)</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{booking.name}</td>
                      <td>
                        <div>{booking.phone}</div>
                        <small className="text-muted">{booking.email}</small>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">{booking.roomType}</span>
                        {booking.promoCode && (
                          <small className="d-block text-success fw-bold">Code: {booking.promoCode}</small>
                        )}
                      </td>
                      <td>
                        <small className="d-block">
                          <strong>In:</strong> {booking.checkIn}
                        </small>
                        <small className="d-block">
                          <strong>Out:</strong> {booking.checkOut}
                        </small>
                      </td>
                      <td className="fw-bold text-success">{formatCurrency(booking.totalBill, currency)}</td>
                      <td>
                        <select
                          className={`form-select form-select-sm fw-bold ${
                            (booking.status || "Confirmed") === "Confirmed"
                              ? "text-success border-success"
                              : (booking.status || "Confirmed") === "Cancelled"
                              ? "text-danger border-danger"
                              : "text-primary border-primary"
                          }`}
                          value={booking.status || "Confirmed"}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked-In">Checked-In</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Delete record"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Promo Codes Manager Section */}
      {activeAdminTab === "promos" && (
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <h4 className="fw-bold mb-4">Promotional Discount Coupons Manager</h4>

          <div className="row g-4">
            <div className="col-md-5">
              <div className="card p-3 border-0 bg-light rounded-3">
                <h6 className="fw-bold mb-3 text-primary">Create New Promo Code</h6>
                {promoFormMsg && (
                  <div className="alert alert-info py-2 small">{promoFormMsg}</div>
                )}
                <form onSubmit={handleCreatePromo}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Coupon Code</label>
                    <input
                      type="text"
                      className="form-control text-uppercase"
                      placeholder="e.g. SUMMER30"
                      value={newPromo.code}
                      onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                      required
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-bold">Discount Type</label>
                      <select
                        className="form-select"
                        value={newPromo.type}
                        onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value })}
                      >
                        <option value="percent">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (₹)</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label small fw-bold">Discount Value</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={newPromo.value}
                        onChange={(e) => setNewPromo({ ...newPromo, value: Number(e.target.value) })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 30% off summer special"
                      value={newPromo.description}
                      onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100 fw-bold">
                    <FaPlus className="me-1" /> Add Promo Code
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-7">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Code</th>
                      <th>Type & Value</th>
                      <th>Description</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((p) => (
                      <tr key={p.code}>
                        <td>
                          <span className="badge bg-primary fs-6 font-monospace">{p.code}</span>
                        </td>
                        <td>
                          <strong className="text-success">
                            {p.type === "percent" ? `${p.value}% OFF` : `${formatCurrency(p.value, currency)} OFF`}
                          </strong>
                        </td>
                        <td className="small text-muted">{p.description}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeletePromo(p.code)}
                            title="Delete Coupon"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guest Reviews Moderation Section */}
      {activeAdminTab === "reviews" && (
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <h4 className="fw-bold mb-4">Guest Feedback & Reviews Moderation</h4>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Guest Name</th>
                  <th>Room Category</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id}>
                    <td className="fw-bold">{r.name}</td>
                    <td>
                      <span className="badge bg-light text-dark border">{r.roomType}</span>
                    </td>
                    <td>
                      <div className="text-warning small">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < r.rating ? "text-warning" : "text-muted opacity-25"} />
                        ))}
                      </div>
                    </td>
                    <td className="small text-secondary" style={{ maxWidth: "300px" }}>
                      "{r.comment}"
                    </td>
                    <td className="small text-muted">{r.date}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteReview(r.id)}
                        title="Delete Review"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <AddRoomModal
          onClose={() => setShowAddRoomModal(false)}
          onAddRoom={handleAddRoom}
        />
      )}
    </div>
  );
};

export default Admin;