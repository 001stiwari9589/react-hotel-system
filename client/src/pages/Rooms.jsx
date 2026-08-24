import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import RoomDetailsModal from "../components/RoomDetailsModal";
import { FaSearch, FaFilter, FaSortAmountDown, FaHeart } from "react-icons/fa";
import { formatCurrency, getSelectedCurrency } from "../utils/currency";

const initialRooms = [
  {
    id: 1,
    name: "AC Deluxe Room",
    category: "AC Room",
    price: 2000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    description: "Comfortable air-conditioned room with king-size bed, high-speed WiFi, and city view.",
  },
  {
    id: 2,
    name: "Non AC Economy Room",
    category: "Non AC Room",
    price: 1000,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    description: "Budget-friendly ventilated room suitable for solo travelers or short stays.",
  },
  {
    id: 3,
    name: "Luxury Royal Suite",
    category: "Luxury Room",
    price: 5000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    description: "Ultra-luxury suite featuring private balcony, jacuzzi, complimentary gourmet breakfast, and VIP lounge.",
  },
  {
    id: 4,
    name: "Executive AC Suite",
    category: "AC Room",
    price: 3200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
    description: "Spacious suite designed for business travelers with dedicated workspace and premium amenities.",
  },
  {
    id: 5,
    name: "Presidential Penthouse",
    category: "Luxury Room",
    price: 7500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    description: "Top-floor penthouse with panoramic views, private butler service, and luxury master bath.",
  },
  {
    id: 6,
    name: "Standard Non AC Room",
    category: "Non AC Room",
    price: 1200,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    description: "Cozy standard room featuring queen bed, workstation, and attached modern bathroom.",
  },
];

const Rooms = () => {
  const location = useLocation();
  const [rooms] = useState(() => {
    const savedRooms = JSON.parse(localStorage.getItem("hotelRooms"));
    if (savedRooms && savedRooms.length > 0) {
      return savedRooms;
    }
    localStorage.setItem("hotelRooms", JSON.stringify(initialRooms));
    return initialRooms;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRoomModal, setSelectedRoomModal] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currency, setCurrency] = useState(getSelectedCurrency());

  useEffect(() => {
    const updateLocalState = () => {
      const savedWishlist = JSON.parse(localStorage.getItem("hotelWishlist")) || [];
      setWishlist(savedWishlist);
      setCurrency(getSelectedCurrency());
    };

    updateLocalState();

    if (location.search.includes("filter=wishlist")) {
      setSelectedCategory("Wishlist");
    }

    window.addEventListener("wishlistChange", updateLocalState);
    window.addEventListener("currencyChange", updateLocalState);
    return () => {
      window.removeEventListener("wishlistChange", updateLocalState);
      window.removeEventListener("currencyChange", updateLocalState);
    };
  }, [location.search]);

  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesCategory = true;
      if (selectedCategory === "Wishlist") {
        matchesCategory = wishlist.includes(room.id);
      } else if (selectedCategory !== "All") {
        matchesCategory = room.category === selectedCategory || room.name.includes(selectedCategory);
      }
      const matchesPrice = room.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      if (sortOrder === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="container py-5" id="rooms">
      <div className="text-center mb-5">
        <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-2">Explore Accommodations</span>
        <h1 className="fw-bold text-dark display-5">Our Premier Rooms & Suites</h1>
        <p className="text-muted">Find the perfect room tailored for your comfort and style</p>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="card border-0 shadow-sm p-4 mb-5 rounded-4 bg-light">
        <div className="row g-3 align-items-center">
          {/* Search Input */}
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search rooms by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaFilter className="text-muted" />
              </span>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="AC Room">AC Rooms</option>
                <option value="Non AC Room">Non AC Rooms</option>
                <option value="Luxury Room">Luxury Suites</option>
                <option value="Wishlist">❤️ My Wishlist ({wishlist.length})</option>
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaSortAmountDown className="text-muted" />
              </span>
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sort By: Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="col-md-2">
            <label className="form-label text-muted small fw-bold mb-1">
              Max Price: {formatCurrency(maxPrice, currency)}
            </label>
            <input
              type="range"
              className="form-range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm">
          {selectedCategory === "Wishlist" ? (
            <div>
              <FaHeart className="display-4 text-muted mb-3 opacity-50" />
              <h4 className="text-muted fw-bold">Your Wishlist is Empty</h4>
              <p className="text-muted">Click the heart icon on any room to save it for later.</p>
            </div>
          ) : (
            <h4 className="text-muted">No rooms match your filter criteria.</h4>
          )}
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setMaxPrice(10000);
              setSortOrder("default");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onViewDetails={(r) => setSelectedRoomModal(r)}
            />
          ))}
        </div>
      )}

      {/* Modal trigger */}
      {selectedRoomModal && (
        <RoomDetailsModal
          room={selectedRoomModal}
          onClose={() => setSelectedRoomModal(null)}
        />
      )}
    </div>
  );
};

export default Rooms;