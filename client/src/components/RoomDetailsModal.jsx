import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaWifi, FaTv, FaCoffee, FaSnowflake, FaParking, FaSwimmingPool, FaStar, FaTimes, FaCommentDots } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";
import { getReviews, addReview } from "../utils/reviews";

const RoomDetailsModal = ({ room, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'reviews'
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState("");
  const [currency, setCurrency] = useState(getSelectedCurrency());

  useEffect(() => {
    setReviews(getReviews());
    setCurrency(getSelectedCurrency());
  }, []);

  if (!room) return null;

  const handleBookNow = () => {
    onClose();
    navigate("/booking", { state: { selectedRoom: room.name, price: room.price } });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const updated = addReview({
      name: newReview.name,
      rating: newReview.rating,
      roomType: room.name,
      comment: newReview.comment,
    });

    setReviews(updated);
    setNewReview({ name: "", rating: 5, comment: "" });
    setReviewSubmittedMsg("Thank you! Your review has been submitted successfully.");
    setTimeout(() => setReviewSubmittedMsg(""), 4000);
  };

  const roomReviews = reviews.filter((r) => r.roomType === room.name || r.roomType === room.category);

  const amenities = room.amenities || [
    { icon: <FaWifi />, name: "High-Speed Wi-Fi" },
    { icon: <FaSnowflake />, name: "Air Conditioning" },
    { icon: <FaTv />, name: "Smart TV" },
    { icon: <FaCoffee />, name: "Free Breakfast" },
    { icon: <FaParking />, name: "Free Parking" },
    { icon: <FaSwimmingPool />, name: "Pool Access" },
  ];

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg overflow-hidden rounded-4">
          <div className="modal-header bg-dark text-white d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <h5 className="modal-title fw-bold mb-0">{room.name}</h5>
              <div className="btn-group btn-group-sm">
                <button
                  className={`btn ${activeTab === "overview" ? "btn-warning" : "btn-outline-light"}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`btn ${activeTab === "reviews" ? "btn-warning" : "btn-outline-light"}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  <FaCommentDots className="me-1" /> Reviews ({roomReviews.length})
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-light btn-sm rounded-circle"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>

          <div className="modal-body p-4">
            {activeTab === "overview" ? (
              <div className="row g-4">
                <div className="col-md-6">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="img-fluid rounded shadow-sm w-100"
                    style={{ height: "260px", objectFit: "cover" }}
                  />
                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <span className="badge bg-success fs-6">
                      {room.category || "Premium"}
                    </span>
                    <div className="text-warning fw-bold">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < (room.rating || 4) ? "text-warning" : "text-muted"}
                        />
                      ))}
                      <span className="ms-1 text-dark">({room.rating || 4.8}/5)</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="fw-bold text-primary">{room.name}</h4>
                    <p className="text-muted">
                      {room.description ||
                        "Experience ultimate comfort and luxury with modern amenities, elegant interior design, and 24/7 room service."}
                    </p>

                    <h6 className="fw-bold mt-3 mb-2">Room Amenities:</h6>
                    <div className="row g-2">
                      {amenities.map((item, index) => (
                        <div key={index} className="col-6 d-flex align-items-center text-secondary small">
                          <span className="text-primary me-2">{item.icon}</span>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-top mt-3 d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small">Price per night:</span>
                      <h3 className="fw-bold text-success mb-0">{formatCurrency(room.price, currency)}</h3>
                    </div>
                    <button className="btn btn-success btn-lg px-4" onClick={handleBookNow}>
                      Book Room Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="fw-bold mb-3">Guest Reviews & Ratings</h5>

                {reviewSubmittedMsg && (
                  <div className="alert alert-success py-2 small">{reviewSubmittedMsg}</div>
                )}

                {/* Reviews List */}
                <div className="mb-4" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {roomReviews.length === 0 ? (
                    <p className="text-muted small">No reviews for this room yet. Be the first to leave one!</p>
                  ) : (
                    roomReviews.map((rev) => (
                      <div key={rev.id} className="border-bottom py-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className="small">{rev.name}</strong>
                          <div className="text-warning small">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < rev.rating ? "text-warning" : "text-muted opacity-25"} />
                            ))}
                          </div>
                        </div>
                        <p className="mb-0 text-muted small">"{rev.comment}"</p>
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>{rev.date}</small>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-light p-3 rounded-3 border">
                  <h6 className="fw-bold mb-2 small">Leave a Guest Review</h6>
                  <div className="row g-2 mb-2">
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Your Name (Optional)"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </div>
                    <div className="col-4">
                      <select
                        className="form-select form-select-sm text-warning fw-bold"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                        <option value={3}>⭐⭐⭐ (3/5)</option>
                        <option value={2}>⭐⭐ (2/5)</option>
                        <option value={1}>⭐ (1/5)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder="Share your experience staying in this room..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm w-100">
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsModal;

