import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaCalendarCheck, FaCompass, FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <div className="position-relative overflow-hidden text-white bg-dark" style={{ minHeight: "92vh", backgroundColor: "#0f172a" }}>
      {/* Live HD MP4 Stream Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
        style={{ opacity: 1, backgroundColor: "#0f172a" }}
      >
        <source
          src="https://assets.mixkit.co/videos/42913/42913-720.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/42911/42911-720.mp4"
          type="video/mp4"
        />
      </video>

      {/* White Force Style Cinematic Hotel Video Slider Fallback */}
      <div className="hero-slider-bg">
        <div
          className="bg-slide"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&auto=format&fit=crop')",
          }}
        ></div>
        <div
          className="bg-slide"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.5)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&auto=format&fit=crop')",
          }}
        ></div>
        <div
          className="bg-slide"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.5)), url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&auto=format&fit=crop')",
          }}
        ></div>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Hero Content */}
      <div className="container position-relative z-2 h-100 d-flex flex-column justify-content-center py-5" style={{ minHeight: "92vh" }}>
        <div className="row justify-content-center text-center py-5">
          <div className="col-lg-10 col-xl-8">
            {/* Top Star Rating Badge */}
            <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill glass-card mb-4 animate-fade-in-up">
              <div className="text-warning">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span className="fw-bold small text-light text-uppercase tracking-wider">
                5-Star Luxury Experience & Smart Booking
              </span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="display-3 fw-extrabold mb-3 text-white animate-fade-in-up animate-delay-1 lh-tight" style={{ fontWeight: 800, textShadow: "0 4px 25px rgba(0, 0, 0, 0.9)" }}>
              Discover Unmatched Luxury & Exceptional Comfort
            </h1>

            {/* Hero Subtitle */}
            <p className="lead fs-4 text-light opacity-90 mb-4 animate-fade-in-up animate-delay-2 mx-auto" style={{ maxWidth: "680px", textShadow: "0 2px 15px rgba(0, 0, 0, 0.85)" }}>
              Book premium AC rooms, luxury suites, and gourmet amenities effortlessly with instant online confirmation.
            </p>

            {/* Quick Feature Pills */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5 animate-fade-in-up animate-delay-2">
              <span className="badge bg-dark bg-opacity-75 border border-warning text-warning px-3 py-2 rounded-pill small">
                <FaCheckCircle className="me-1" /> Best Rate Guaranteed
              </span>
              <span className="badge bg-dark bg-opacity-75 border border-warning text-warning px-3 py-2 rounded-pill small">
                <FaCheckCircle className="me-1" /> Free High-Speed Wi-Fi
              </span>
              <span className="badge bg-dark bg-opacity-75 border border-warning text-warning px-3 py-2 rounded-pill small">
                <FaCheckCircle className="me-1" /> 24/7 Room Service
              </span>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-3 animate-fade-in-up animate-delay-3">
              <button
                className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill shadow-lg d-flex align-items-center gap-2 hover-scale"
                onClick={() => navigate("/rooms")}
              >
                <FaCalendarCheck /> Book Your Stay Now
              </button>

              <button
                className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold rounded-pill glass-card d-flex align-items-center gap-2"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <FaCompass /> Explore Rooms & Amenities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;