import { useState } from "react";
import { FaEnvelope, FaPaperPlane, FaLock, FaCheckCircle } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const vipPayload = {
        email: email,
        joinedAt: new Date().toISOString(),
        promoCode: "VIP10",
      };

      // Save VIP member details to records.json outside client folder
      fetch("/api/vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vipPayload),
      }).catch((err) => console.log("Backend offline or VIP recording failed:", err));

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-5 text-white position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="container py-4 position-relative z-2">
        <div className="card border border-warning border-opacity-25 rounded-4 p-5 glass-card bg-opacity-75 text-center shadow-2xl mx-auto" style={{ maxWidth: "850px", background: "rgba(15, 23, 42, 0.85)" }}>
          <div className="d-inline-flex p-3 bg-warning bg-opacity-25 text-warning rounded-circle mb-3 mx-auto">
            <FaEnvelope className="display-5" />
          </div>

          <h2 className="fw-extrabold display-6 text-white mb-2" style={{ fontWeight: 800 }}>
            Unlock Exclusive Secret Deals & 10% OFF
          </h2>

          <p className="text-light opacity-80 mb-4 fs-5 mx-auto" style={{ maxWidth: "600px" }}>
            Subscribe to our VIP newsletter to receive secret seasonal discounts, room upgrades, and members-only offers.
          </p>

          {subscribed ? (
            <div className="alert alert-success d-inline-flex align-items-center gap-2 px-4 py-3 rounded-pill shadow fs-6 fw-bold">
              <FaCheckCircle className="fs-5" /> Thank you for subscribing! Your 10% discount promo code has been sent to your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="row justify-content-center g-2 max-w-600 mx-auto">
              <div className="col-sm-8">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="form-control form-control-lg border-secondary text-white rounded-pill px-4 shadow-sm"
                  style={{ backgroundColor: "rgba(30, 41, 59, 0.9)", fontSize: "1rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <button
                  type="submit"
                  className="btn btn-warning btn-lg w-100 fw-bold rounded-pill px-4 shadow d-flex align-items-center justify-content-center gap-2 hover-scale"
                  style={{ fontSize: "1rem" }}
                >
                  <FaPaperPlane /> Join VIP
                </button>
              </div>
            </form>
          )}

          <div className="d-flex justify-content-center align-items-center gap-2 mt-4 text-muted small opacity-75">
            <FaLock className="text-warning" /> No spam ever. Unsubscribe anytime with one click.
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
