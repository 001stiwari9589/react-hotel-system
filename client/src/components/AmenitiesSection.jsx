import {
  FaSwimmingPool,
  FaUtensils,
  FaSpa,
  FaDumbbell,
  FaCocktail,
  FaCar,
} from "react-icons/fa";

const amenities = [
  {
    icon: <FaSwimmingPool className="display-4 text-primary" />,
    title: "Infinity Pool & Sun Deck",
    description: "Heated rooftop pool offering stunning skyline views, poolside cocktails, and private cabanas.",
    tag: "Relaxation",
  },
  {
    icon: <FaUtensils className="display-4 text-warning" />,
    title: "Gourmet Fine Dining",
    description: "Multi-cuisine gourmet restaurant featuring master chefs, organic ingredients, and 24/7 room service.",
    tag: "Fine Dining",
  },
  {
    icon: <FaSpa className="display-4 text-success" />,
    title: "Wellness Spa & Massage",
    description: "Rejuvenate your body and mind with aromatherapy, deep tissue massages, sauna, and steam baths.",
    tag: "Wellness",
  },
  {
    icon: <FaDumbbell className="display-4 text-danger" />,
    title: "24/7 Fitness Center",
    description: "Fully equipped modern gym with cardio zone, free weights, personal trainers, and yoga studio.",
    tag: "Fitness",
  },
  {
    icon: <FaCocktail className="display-4 text-info" />,
    title: "Sky Lounge & Bar",
    description: "Panoramic rooftop lounge with live jazz music, fine wines, and signature craft cocktails.",
    tag: "Nightlife",
  },
  {
    icon: <FaCar className="display-4 text-warning" />,
    title: "Luxury Airport Chauffeur",
    description: "Complimentary luxury sedan pickup and drop-off service for all penthouse and VIP guests.",
    tag: "Transport",
  },
];

const AmenitiesSection = () => {
  return (
    <section className="py-5 bg-white border-top border-bottom">
      <div className="container py-4">
        {/* Title */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-2 fw-bold">
            Unrivaled Hospitality
          </span>
          <h2 className="fw-extrabold display-6 text-dark mb-3" style={{ fontWeight: 800 }}>
            World-Class Amenities & Services
          </h2>
          <p className="text-muted fs-5">
            Designed to make your stay unforgettable with round-the-clock luxury amenities.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="row g-4">
          {amenities.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 transition-all hover-translate bg-light position-relative overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="p-3 bg-white rounded-4 shadow-sm d-inline-block">
                    {item.icon}
                  </div>
                  <span className="badge bg-dark text-warning rounded-pill px-3 py-1 small fw-bold">
                    {item.tag}
                  </span>
                </div>
                <h4 className="fw-bold mb-2 text-dark">{item.title}</h4>
                <p className="text-muted mb-0 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
