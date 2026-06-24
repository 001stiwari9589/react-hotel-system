import { FaFacebook,FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,} from "react-icons/fa";
import downloadpng from "../assets/download.png";
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Hotel Info */}
          <div className="col-md-4 mb-4">
            <h3 className="text-warning">
             <img src={downloadpng} alt="React Logo" width="50" height="50" className="me-2" />
              Smart Hotel
            </h3>

            <p>
              Experience luxury,
              comfort, and smart
              room booking with
              our modern hotel
              management system.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h4 className="text-warning">
              Quick Links
            </h4>

            <ul className="list-unstyled">
              <li>
                <a
                  href="/"
                  className="text-white text-decoration-none"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-white text-decoration-none"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/rooms"
                  className="text-white text-decoration-none"
                >
                  Rooms
                </a>
              </li>

              <li>
                <a
                  href="/booking"
                  className="text-white text-decoration-none"
                >
                  Booking
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-white text-decoration-none"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h4 className="text-warning">
              Contact Us
            </h4>

            <p>
              <FaMapMarkerAlt />{" "}
              Madhya Pradesh,
              India
            </p>

            <p>
              <FaPhoneAlt /> +91
              9876543210
            </p>

            <p>
              <FaEnvelope />{" "}
              smarthotel@gmail.com
            </p>

            {/* Social Icons */}
            <div className="mt-3 d-flex gap-3 fs-4">
              <FaFacebook
                style={{
                  cursor:
                    "pointer",
                }}
              />

              <FaInstagram
                style={{
                  cursor:
                    "pointer",
                }}
              />

              <FaTwitter
                style={{
                  cursor:
                    "pointer",
                }}
              />
            </div>
          </div>
        </div>

        <hr />

        {/* Copyright */}
        <div className="text-center">
          <p className="mb-0">
            © 2026 Smart Hotel.
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;