import { useEffect, useState } from "react";
import { getReviews } from "../utils/reviews";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = () => {
      setReviews(getReviews());
    };
    loadReviews();
    window.addEventListener("reviewsChange", loadReviews);
    return () => window.removeEventListener("reviewsChange", loadReviews);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-warning" : "text-muted opacity-25"}
      />
    ));
  };

  return (
    <section className="py-5 bg-light border-top">
      <div className="container py-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-2">
            Guest Testimonials
          </span>
          <h2 className="fw-bold display-6">What Our Guests Say</h2>
          <p className="text-muted">
            Read real feedback and experiences from our valued stayers
          </p>
        </div>

        <div className="row g-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 position-relative bg-white">
                <FaQuoteLeft className="display-4 text-primary opacity-10 position-absolute top-0 end-0 m-3" />
                <div className="d-flex align-items-center mb-3">
                  <FaUserCircle className="display-6 text-primary me-3" />
                  <div>
                    <h5 className="fw-bold mb-0 text-dark">{review.name}</h5>
                    <small className="text-muted">{review.roomType}</small>
                  </div>
                </div>

                <div className="mb-3 d-flex gap-1">
                  {renderStars(review.rating)}
                </div>

                <p className="text-muted flex-grow-1 italic fs-6">
                  "{review.comment}"
                </p>

                <div className="border-top pt-3 text-end">
                  <small className="text-muted">{review.date}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
