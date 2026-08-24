import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUserFriends, FaBed, FaSearch } from "react-icons/fa";

const QuickBookingBar = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [category, setCategory] = useState("All");
  const [guests, setGuests] = useState("2 Guests");

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (category !== "All") queryParams.append("category", category);
    if (checkIn) queryParams.append("checkIn", checkIn);
    if (checkOut) queryParams.append("checkOut", checkOut);
    if (guests) queryParams.append("guests", guests);

    navigate(`/rooms?${queryParams.toString()}`);
  };

  return (
    <div className="container position-relative z-3" style={{ marginTop: "-50px" }}>
      <div className="card border-0 shadow-lg rounded-4 p-4 glass-card bg-dark text-white border border-secondary border-opacity-25" style={{ background: "rgba(15, 23, 42, 0.95)" }}>
        <form onSubmit={handleSearch} className="row g-3 align-items-end">
          {/* Check-In Date */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label text-warning fw-semibold mb-1 small d-flex align-items-center gap-2">
              <FaCalendarAlt /> Check-In Date
            </label>
            <input
              type="date"
              className="form-control text-white border border-secondary rounded-3 px-3 py-2"
              style={{ backgroundColor: "rgba(30, 41, 59, 0.9)", color: "#fff" }}
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          {/* Check-Out Date */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label text-warning fw-semibold mb-1 small d-flex align-items-center gap-2">
              <FaCalendarAlt /> Check-Out Date
            </label>
            <input
              type="date"
              className="form-control text-white border border-secondary rounded-3 px-3 py-2"
              style={{ backgroundColor: "rgba(30, 41, 59, 0.9)", color: "#fff" }}
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* Room Category */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label text-warning fw-semibold mb-1 small d-flex align-items-center gap-2">
              <FaBed /> Room Category
            </label>
            <select
              className="form-select border border-secondary text-white rounded-3 px-3 py-2"
              style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All" className="text-dark">All Categories</option>
              <option value="AC Room" className="text-dark">AC Rooms</option>
              <option value="Non AC Room" className="text-dark">Non AC Rooms</option>
              <option value="Luxury Room" className="text-dark">Luxury Suites & Penthouses</option>
            </select>
          </div>

          {/* Guests & Search Button */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label text-warning fw-semibold mb-1 small d-flex align-items-center gap-2">
              <FaUserFriends /> Guests
            </label>
            <div className="d-flex gap-2">
              <select
                className="form-select border border-secondary text-white rounded-3 px-3 py-2"
                style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1 Guest" className="text-dark">1 Adult</option>
                <option value="2 Guests" className="text-dark">2 Adults</option>
                <option value="3+ Guests" className="text-dark">3+ Guests / Family</option>
              </select>
              <button
                type="submit"
                className="btn btn-warning fw-bold px-4 rounded-3 d-flex align-items-center justify-content-center gap-2 hover-scale flex-shrink-0"
              >
                <FaSearch /> Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickBookingBar;
