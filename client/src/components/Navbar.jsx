import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HotelLogo from "./HotelLogo";
import { FaBookmark, FaUserShield, FaCalendarCheck, FaHeart, FaGlobe } from "react-icons/fa";
import { CURRENCIES, getSelectedCurrency, setSelectedCurrency } from "../utils/currency";

const Navbar = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currency, setCurrencyState] = useState(getSelectedCurrency());
  const location = useLocation();

  useEffect(() => {
    const checkState = () => {
      const savedBookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];
      setBookingCount(savedBookings.length);

      const savedWishlist = JSON.parse(localStorage.getItem("hotelWishlist")) || [];
      setWishlistCount(savedWishlist.length);

      setCurrencyState(getSelectedCurrency());
    };

    checkState();
    window.addEventListener("storage", checkState);
    window.addEventListener("wishlistChange", checkState);
    window.addEventListener("currencyChange", checkState);
    const interval = setInterval(checkState, 2000);

    return () => {
      window.removeEventListener("storage", checkState);
      window.removeEventListener("wishlistChange", checkState);
      window.removeEventListener("currencyChange", checkState);
      clearInterval(interval);
    };
  }, []);

  const handleCurrencyChange = (e) => {
    const newCurr = e.target.value;
    setSelectedCurrency(newCurr);
    setCurrencyState(newCurr);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-lg py-2.5"
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "2px solid rgba(255, 193, 7, 0.4)",
        zIndex: 1030,
        paddingTop: "0.65rem",
        paddingBottom: "0.65rem",
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand me-3 py-0" to="/">
          <HotelLogo size="sm" />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 text-white p-2 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-lg-3 gap-2 align-items-lg-center py-2 py-lg-0">
            <li className="nav-item">
              <Link
                className={`custom-nav-link ${isActive("/") ? "active-link" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`custom-nav-link ${isActive("/about") ? "active-link" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`custom-nav-link ${isActive("/rooms") ? "active-link" : ""}`}
                to="/rooms"
              >
                Rooms & Suites
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`custom-nav-link ${isActive("/rooms") && location.search.includes("wishlist") ? "active-link" : ""}`}
                to="/rooms?filter=wishlist"
              >
                <FaHeart className="me-1 text-danger" /> Wishlist
                {wishlistCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2 px-2 py-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`custom-nav-link ${isActive("/booking") ? "active-link" : ""}`}
                to="/booking"
              >
                <FaCalendarCheck className="me-1 text-warning" /> Book A Stay
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`custom-nav-link ${isActive("/my-bookings") ? "active-link" : ""}`}
                to="/my-bookings"
              >
                <FaBookmark className="me-1 text-warning" /> My Bookings
                {bookingCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2 pulse-badge px-2 py-1">
                    {bookingCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Currency Selector */}
            <li className="nav-item my-1 my-lg-0">
              <div className="d-inline-flex align-items-center bg-dark bg-opacity-75 text-white rounded-pill px-2.5 py-1 border border-warning border-opacity-50">
                <FaGlobe className="text-warning me-1.5 small" />
                <select
                  className="bg-transparent text-white border-0 fw-bold cursor-pointer"
                  style={{ outline: "none", fontSize: "0.85rem" }}
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  {Object.keys(CURRENCIES).map((code) => (
                    <option key={code} value={code} className="text-dark">
                      {CURRENCIES[code].label}
                    </option>
                  ))}
                </select>
              </div>
            </li>

            {/* Admin Panel Button */}
            <li className="nav-item my-1 my-lg-0">
              <Link
                className="btn btn-admin-glow px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2 text-decoration-none"
                to="/adminlogin"
                style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}
              >
                <FaUserShield /> Admin Panel
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;