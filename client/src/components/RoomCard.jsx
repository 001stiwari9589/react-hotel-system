import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaEye, FaCalendarCheck, FaHeart, FaRegHeart } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";

const RoomCard = ({ room, onViewDetails }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currency, setCurrency] = useState(getSelectedCurrency());

  useEffect(() => {
    const checkWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem("hotelWishlist")) || [];
      setIsFavorite(savedWishlist.includes(room.id));
      setCurrency(getSelectedCurrency());
    };
    checkWishlist();
    window.addEventListener("wishlistChange", checkWishlist);
    window.addEventListener("currencyChange", checkWishlist);
    return () => {
      window.removeEventListener("wishlistChange", checkWishlist);
      window.removeEventListener("currencyChange", checkWishlist);
    };
  }, [room.id]);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    const savedWishlist = JSON.parse(localStorage.getItem("hotelWishlist")) || [];
    let updated;
    if (savedWishlist.includes(room.id)) {
      updated = savedWishlist.filter((id) => id !== room.id);
    } else {
      updated = [...savedWishlist, room.id];
    }
    localStorage.setItem("hotelWishlist", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("wishlistChange"));
  };

  const handleBooking = () => {
    navigate("/booking", {
      state: { selectedRoom: room.name, price: room.price },
    });
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-0 h-100 rounded-3 overflow-hidden transition-all">
        <div className="position-relative">
          <img
            src={room.image}
            alt={room.name}
            className="card-img-top"
            style={{ height: "220px", objectFit: "cover" }}
          />
          <button
            className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3 p-2 shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: "36px", height: "36px", zIndex: 5 }}
            onClick={toggleWishlist}
            title={isFavorite ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            {isFavorite ? (
              <FaHeart className="text-danger fs-6" />
            ) : (
              <FaRegHeart className="text-muted fs-6" />
            )}
          </button>
          <span className="badge bg-primary position-absolute top-0 end-0 m-3 px-3 py-2 shadow">
            {formatCurrency(room.price, currency)} / night
          </span>
        </div>

        <div className="card-body d-flex flex-column justify-content-between p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="card-title fw-bold mb-0 text-dark">{room.name}</h4>
              <div className="text-warning small">
                <FaStar /> <span className="text-dark fw-bold">{room.rating || 4.5}</span>
              </div>
            </div>
            <p className="card-text text-muted small">
              {room.description || "Fully furnished room with modern design, premium bedding, and high-speed Wi-Fi."}
            </p>
          </div>

          <div className="d-flex gap-2 mt-3 pt-3 border-top">
            <button
              className="btn btn-outline-dark btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
              onClick={() => onViewDetails(room)}
            >
              <FaEye /> View Details
            </button>
            <button
              className="btn btn-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
              onClick={handleBooking}
            >
              <FaCalendarCheck /> Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;