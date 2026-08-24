import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";
import RoomDetailsModal from "./RoomDetailsModal";
import { FaArrowRight, FaCrown } from "react-icons/fa";

const defaultFeatured = [
  {
    id: 3,
    name: "Luxury Royal Suite",
    category: "Luxury Room",
    price: 5000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    description: "Ultra-luxury suite featuring private balcony, jacuzzi, complimentary gourmet breakfast, and VIP lounge access.",
  },
  {
    id: 5,
    name: "Presidential Penthouse",
    category: "Luxury Room",
    price: 7500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    description: "Top-floor penthouse with panoramic ocean views, private butler service, and luxury master bath with spa.",
  },
  {
    id: 1,
    name: "AC Deluxe Room",
    category: "AC Room",
    price: 2000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    description: "Comfortable air-conditioned room with king-size plush bed, high-speed Wi-Fi, and panoramic city views.",
  },
];

const FeaturedRooms = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(defaultFeatured);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hotelRooms"));
    if (saved && saved.length > 0) {
      // Pick top 3 rated rooms
      const sorted = [...saved].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setRooms(sorted.slice(0, 3));
    }
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
          <div>
            <span className="badge bg-warning text-dark fw-bold text-uppercase px-3 py-2 rounded-pill mb-2 d-inline-flex align-items-center gap-1">
              <FaCrown /> World-Class Accommodations
            </span>
            <h2 className="fw-extrabold display-6 text-dark mb-2" style={{ fontWeight: 800 }}>
              Featured Rooms & Luxury Suites
            </h2>
            <p className="text-muted mb-0 fs-5">
              Handpicked luxury living spaces crafted for your ultimate relaxation
            </p>
          </div>
          <button
            className="btn btn-outline-dark rounded-pill px-4 py-2 mt-3 mt-md-0 fw-semibold d-flex align-items-center gap-2 hover-scale"
            onClick={() => navigate("/rooms")}
          >
            View All Rooms <FaArrowRight />
          </button>
        </div>

        {/* Room Cards Grid */}
        <div className="row">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onViewDetails={(r) => setSelectedRoom(r)}
            />
          ))}
        </div>

        {/* Details Modal */}
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      </div>
    </section>
  );
};

export default FeaturedRooms;
