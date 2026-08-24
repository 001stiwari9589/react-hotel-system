import { FaHotel, FaUsers, FaStar, FaAward } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: <FaHotel className="display-5 text-warning mb-3" />,
      number: "150+",
      label: "Luxury Rooms & Suites",
      sublabel: "Designed for ultimate comfort",
    },
    {
      icon: <FaUsers className="display-5 text-primary mb-3" />,
      number: "25,000+",
      label: "Happy Guests Hosted",
      sublabel: "Trusted worldwide since 2018",
    },
    {
      icon: <FaStar className="display-5 text-warning mb-3" />,
      number: "4.9 / 5",
      label: "Guest Satisfaction",
      sublabel: "Over 3,500+ 5-Star Reviews",
    },
    {
      icon: <FaAward className="display-5 text-success mb-3" />,
      number: "15+",
      label: "Hospitality Awards",
      sublabel: "Recognized international excellence",
    },
  ];

  return (
    <section className="py-5 bg-dark text-white border-top border-bottom border-secondary border-opacity-25" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="container py-3">
        <div className="row g-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-lg-3">
              <div className="card h-100 border-0 p-4 rounded-4 text-white shadow-sm glass-card bg-opacity-50" style={{ background: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(10px)" }}>
                <div>{stat.icon}</div>
                <h2 className="fw-extrabold display-6 text-warning mb-1" style={{ fontWeight: 800 }}>
                  {stat.number}
                </h2>
                <h6 className="fw-bold mb-1">{stat.label}</h6>
                <small className="text-muted opacity-75">{stat.sublabel}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
