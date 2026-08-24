import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTag, FaCopy, FaCheck, FaGem, FaGift, FaPercentage } from "react-icons/fa";

const offers = [
  {
    code: "LUXURY20",
    badge: "20% OFF",
    title: "Luxury Suite Experience",
    description: "Get 20% flat discount on all Luxury Royal Suites & Presidential Penthouses.",
    icon: <FaGem className="display-4 text-warning" />,
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  },
  {
    code: "WELCOME10",
    badge: "10% OFF",
    title: "New Guest Welcome Deal",
    description: "Enjoy 10% instant discount on your first hotel stay with complimentary breakfast.",
    icon: <FaGift className="display-4 text-danger" />,
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  },
  {
    code: "ROYAL15",
    badge: "15% OFF",
    title: "Executive Royal Special",
    description: "Save 15% on Royal & AC Suites when booking 2 or more consecutive nights.",
    icon: <FaPercentage className="display-4 text-success" />,
    gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
  },
];

const SpecialOffersSection = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 3000);
  };

  return (
    <section className="py-5 bg-dark text-white border-top border-bottom border-secondary border-opacity-25" style={{ background: "#0b0f19" }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark text-uppercase px-3 py-2 rounded-pill mb-2 fw-bold d-inline-flex align-items-center gap-1">
            <FaTag /> Exclusive Savings
          </span>
          <h2 className="fw-extrabold display-6 text-white mb-2" style={{ fontWeight: 800 }}>
            Special Offers & Promo Codes
          </h2>
          <p className="text-muted fs-5">
            Use these verified promo codes at checkout for instant discounts
          </p>
        </div>

        <div className="row g-4">
          {offers.map((offer) => (
            <div key={offer.code} className="col-lg-4 col-md-6">
              <div
                className="card border border-warning border-opacity-25 rounded-4 p-4 h-100 text-white shadow-lg position-relative overflow-hidden transition-all hover-translate"
                style={{ background: offer.gradient }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  {offer.icon}
                  <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill fs-6 shadow">
                    {offer.badge}
                  </span>
                </div>

                <h4 className="fw-bold text-white mb-2">{offer.title}</h4>
                <p className="text-light opacity-75 small flex-grow-1 mb-4">
                  {offer.description}
                </p>

                <div className="p-3 bg-black bg-opacity-40 rounded-3 border border-secondary border-opacity-50 d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>
                      PROMO CODE:
                    </small>
                    <span className="fw-extrabold text-warning tracking-wider fs-5">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    className="btn btn-outline-warning btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                    onClick={() => handleCopy(offer.code)}
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <FaCheck className="text-success" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>
                </div>

                <button
                  className="btn btn-warning w-100 fw-bold rounded-pill py-2 shadow hover-scale"
                  onClick={() => navigate("/booking")}
                >
                  Book Stay With This Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
