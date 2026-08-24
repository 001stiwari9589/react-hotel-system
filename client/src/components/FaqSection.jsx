import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    id: "faq1",
    question: "What are the Check-in and Check-out timings?",
    answer: "Standard Check-in is from 2:00 PM onwards, and Check-out is until 11:00 AM. Early check-in or late check-out can be requested based on availability during booking.",
  },
  {
    id: "faq2",
    question: "Is complimentary breakfast included in the booking?",
    answer: "Yes! All Luxury Suites, Presidential Penthouses, and Executive AC rooms include a complimentary gourmet buffet breakfast.",
  },
  {
    id: "faq3",
    question: "How does free cancellation & rescheduling work?",
    answer: "You can cancel or reschedule your booking free of charge up to 24 hours prior to check-in directly through the 'My Bookings' section.",
  },
  {
    id: "faq4",
    question: "Are airport pick-up & drop-off chauffeur services available?",
    answer: "Yes, we provide 24/7 luxury airport transfer services. Luxury suite guests receive complimentary airport pickup.",
  },
  {
    id: "faq5",
    question: "What payment methods and currencies are supported?",
    answer: "We support major credit/debit cards, UPI, Net Banking, and multi-currency billing (INR, USD, EUR, GBP, AED, JPY).",
  },
  {
    id: "faq6",
    question: "Are pets allowed in the hotel?",
    answer: "We have dedicated pet-friendly deluxe rooms and suite categories available. Please inform our concierge prior to check-in.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-5 bg-light border-top">
      <div className="container py-4" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-5">
          <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-2 fw-bold d-inline-flex align-items-center gap-1">
            <FaQuestionCircle /> Got Questions?
          </span>
          <h2 className="fw-extrabold display-6 text-dark mb-2" style={{ fontWeight: 800 }}>
            Frequently Asked Questions
          </h2>
          <p className="text-muted fs-5">
            Everything you need to know about your luxury stay
          </p>
        </div>

        <div className="accordion rounded-4 shadow-sm overflow-hidden" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="accordion-item border-0 border-bottom">
              <h2 className="accordion-header" id={`heading-${faq.id}`}>
                <button
                  className={`accordion-button fw-bold py-3 px-4 text-dark ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${faq.id}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse-${faq.id}`}
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <span className="text-primary me-2 fw-extrabold">Q{index + 1}.</span> {faq.question}
                </button>
              </h2>
              <div
                id={`collapse-${faq.id}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading-${faq.id}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body px-4 py-3 text-muted leading-relaxed bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
