import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaAward, FaCalendarCheck, FaShieldAlt, FaUtensils, FaWifi, FaHeadset, FaConciergeBell } from "react-icons/fa";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-5 bg-white border-top">
      <div className="container py-4">
        <div className="row align-items-center g-5">
          {/* Left Side Images Grid */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
                    alt="Hotel Exterior"
                    className="img-fluid rounded-4 shadow-lg object-fit-cover w-100"
                    style={{ height: "280px" }}
                  />
                </div>
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900"
                    alt="Luxury Suite"
                    className="img-fluid rounded-4 shadow-lg object-fit-cover w-100 mt-4"
                    style={{ height: "280px" }}
                  />
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="position-absolute top-50 start-50 translate-middle glass-card bg-dark bg-opacity-90 text-white p-4 rounded-4 shadow-2xl text-center border border-warning" style={{ minWidth: "200px" }}>
                <FaAward className="display-4 text-warning mb-2" />
                <h3 className="fw-extrabold mb-0 text-warning">10+ Years</h3>
                <small className="text-light fw-semibold">Of Excellence & Hospitality</small>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="col-lg-6">
            <span className="badge bg-warning text-dark text-uppercase px-3 py-2 rounded-pill mb-3 fw-bold d-inline-flex align-items-center gap-1">
              <FaShieldAlt /> Premium Hospitality
            </span>

            <h2 className="display-5 fw-extrabold text-dark mb-4" style={{ fontWeight: 800 }}>
              Welcome To Grand Luxury Resort & Suites
            </h2>

            <p className="text-muted fs-5 mb-4 leading-relaxed">
              We offer world-class AC rooms, executive suites, fine dining, and unmatched hospitality. Whether you are traveling for business, family vacation, or a romantic escape, our dedicated staff ensures a flawless and memorable experience.
            </p>

            {/* Key Feature Highlights */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 shadow-sm">
                  <FaConciergeBell className="fs-3 text-warning flex-shrink-0" />
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">24/7 Butler Service</h6>
                    <small className="text-muted">Round-the-clock room care</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 shadow-sm">
                  <FaUtensils className="fs-3 text-danger flex-shrink-0" />
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">Gourmet Dining</h6>
                    <small className="text-muted">Multi-cuisine restaurant</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 shadow-sm">
                  <FaWifi className="fs-3 text-primary flex-shrink-0" />
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">Ultra-Fast Wi-Fi</h6>
                    <small className="text-muted">1 Gbps fiber connection</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 shadow-sm">
                  <FaHeadset className="fs-3 text-success flex-shrink-0" />
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">Instant Support</h6>
                    <small className="text-muted">Concierge & assistance</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3 pt-2">
              <button
                className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill shadow d-flex align-items-center gap-2 hover-scale"
                onClick={() => navigate("/rooms")}
              >
                <FaCalendarCheck /> Discover All Accommodations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;