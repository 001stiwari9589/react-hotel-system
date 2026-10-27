import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HotelLogo from "../components/HotelLogo";
import { FaPrint, FaArrowLeft, FaCheckCircle, FaTag } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";

const Bill = () => {
  const { state } = useLocation();
  const [currency, setCurrency] = useState(getSelectedCurrency());

  useEffect(() => {
    const checkCurr = () => setCurrency(getSelectedCurrency());
    window.addEventListener("currencyChange", checkCurr);
    return () => window.removeEventListener("currencyChange", checkCurr);
  }, []);

  const booking = state || {
    id: "BK-SAMPLE",
    name: "Guest User",
    email: "guest@example.com",
    phone: "9876543210",
    roomType: "AC Deluxe Room",
    checkIn: "2026-07-22",
    checkOut: "2026-07-24",
    guests: 2,
    numberOfNights: 2,
    totalBill: 4480,
    subtotal: 4480,
    discountAmount: 0,
    addOns: ["Breakfast Package"],
    status: "Confirmed",
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4 no-print">
            <Link to="/rooms" className="btn btn-outline-dark d-flex align-items-center gap-2">
              <FaArrowLeft /> Back to Rooms
            </Link>
            <button className="btn btn-success d-flex align-items-center gap-2" onClick={() => window.print()}>
              <FaPrint /> Print / Download Invoice PDF
            </button>
          </div>

          <div className="card shadow-lg border-0 p-5 rounded-4 bg-white printable-area">
            {/* Invoice Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mb-4">
              <div>
                <HotelLogo size="lg" light={true} />
              </div>

              <div className="text-end">
                <span className="badge bg-success px-3 py-2 fs-6 mb-2">
                  <FaCheckCircle className="me-1" /> {booking.status || "Paid & Confirmed"}
                </span>
                <p className="text-muted small mb-0">Booking ID: <strong>{booking.id || "BK-8839"}</strong></p>
                <p className="text-muted small mb-0">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Guest & Stay Summary */}
            <div className="row g-4 mb-4">
              <div className="col-6">
                <h6 className="fw-bold text-uppercase text-muted mb-2">Billed To:</h6>
                <h5 className="fw-bold mb-1">{booking.name}</h5>
                <p className="text-muted mb-0 small">{booking.email}</p>
                <p className="text-muted mb-0 small">Phone: {booking.phone}</p>
              </div>

              <div className="col-6 text-end">
                <h6 className="fw-bold text-uppercase text-muted mb-2">Stay Details:</h6>
                <p className="mb-1 small">
                  <strong>Check In:</strong> {booking.checkIn}
                </p>
                <p className="mb-1 small">
                  <strong>Check Out:</strong> {booking.checkOut}
                </p>
                <p className="mb-0 small">
                  <strong>Guests:</strong> {booking.guests} Guest(s)
                </p>
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Item Description</th>
                    <th className="text-center">Nights/Qty</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong className="d-block">{booking.roomType}</strong>
                      <small className="text-muted">Accommodation charge per night</small>
                    </td>
                    <td className="text-center">{booking.numberOfNights || 1} Night(s)</td>
                    <td className="text-end fw-bold">
                      {formatCurrency(booking.subtotal || booking.totalBill, currency)}
                    </td>
                  </tr>

                  {booking.addOns && booking.addOns.length > 0 && (
                    <tr>
                      <td>
                        <strong className="d-block">Selected Add-ons</strong>
                        <small className="text-muted">{booking.addOns.join(", ")}</small>
                      </td>
                      <td className="text-center">Included</td>
                      <td className="text-end fw-bold">Included</td>
                    </tr>
                  )}

                  {booking.promoCode && (
                    <tr className="table-success">
                      <td>
                        <strong className="d-block text-success">
                          <FaTag className="me-1" /> Coupon Applied: {booking.promoCode}
                        </strong>
                        <small className="text-success">Promotional Discount</small>
                      </td>
                      <td className="text-center text-success">Discount</td>
                      <td className="text-end fw-bold text-success">
                        -{formatCurrency(booking.discountAmount || 0, currency)}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td colSpan="2" className="text-end fw-bold">Total Paid (incl. 12% GST)</td>
                    <td className="text-end fw-bold text-success fs-5">
                      {formatCurrency(booking.totalBill, currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Invoice Footer */}
            <div className="border-top pt-4 text-center">
              <p className="fw-bold text-dark mb-1">Thank you for choosing Smart Hotel!</p>
              <small className="text-muted">
                If you have any questions about this invoice, please contact support at 001stiwari9589@gmail.com
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;