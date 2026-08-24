import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import HotelLogo from "./HotelLogo";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5" style={{ borderTop: "2px solid rgba(255, 193, 7, 0.3)" }}>
      <div className="container">
        <div className="row g-4">
          {/* Hotel Info */}
          <div className="col-md-4 mb-4">
            <div className="mb-3">
              <HotelLogo size="md" />
            </div>

            <p className="text-light opacity-75 small">
              Experience luxury, comfort, and smart room booking with our modern hotel management system. High-class hospitality guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-warning fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <a href="/" className="text-white text-decoration-none hover-warning">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About
                </a>
              </li>

              <li>
                <a href="/rooms" className="text-white text-decoration-none">
                  Rooms & Suites
                </a>
              </li>

              <li>
                <a href="/booking" className="text-white text-decoration-none">
                  Book A Stay
                </a>
              </li>

              <li>
                <a href="/my-bookings" className="text-white text-decoration-none">
                  My Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-warning fw-bold mb-3">Contact Us</h5>

            <p className="small mb-2 text-light opacity-75">
              <FaMapMarkerAlt className="text-warning me-2" /> Madhya Pradesh, India
            </p>

            <p className="small mb-2 text-light opacity-75">
              <FaPhoneAlt className="text-warning me-2" /> +91 9589 018011
            </p>

            <p className="small mb-3 text-light opacity-75">
              <FaEnvelope className="text-warning me-2" /> smarthotel@gmail.com
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 fs-5 text-warning">
              <FaFacebook style={{ cursor: "pointer" }} />
              <FaInstagram style={{ cursor: "pointer" }} />
              <FaTwitter style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* Copyright */}
        <div className="text-center text-light opacity-75 small">
          <p className="mb-0">© 2026 Smart Hotel. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;