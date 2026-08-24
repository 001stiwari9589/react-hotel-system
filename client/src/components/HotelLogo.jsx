import { FaHotel } from "react-icons/fa";

const HotelLogo = ({ size = "md", light = false }) => {
  const iconSize = size === "lg" ? 48 : size === "sm" ? 32 : 40;
  const fontSize = size === "lg" ? "fs-2" : size === "sm" ? "fs-5" : "fs-4";

  return (
    <div className="d-flex align-items-center gap-2 text-decoration-none">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          background: "linear-gradient(135deg, #ffc107 0%, #ff8c00 100%)",
          color: "#000",
          boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)",
        }}
      >
        <FaHotel style={{ fontSize: `${iconSize * 0.55}px` }} />
      </div>
      <div className="d-flex flex-column leading-none">
        <span className={`fw-bold text-warning ${fontSize} lh-1`}>
          SMART<span className={light ? "text-dark" : "text-white"}>HOTEL</span>
        </span>
        <span
          className={`small fw-bold text-uppercase tracking-wider ${
            light ? "text-muted" : "text-light opacity-75"
          }`}
          style={{ fontSize: "0.65rem", letterSpacing: "1.5px" }}
        >
          Luxury & Comfort
        </span>
      </div>
    </div>
  );
};

export default HotelLogo;
