import { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

const AddRoomModal = ({ onClose, onAddRoom }) => {
  const [newRoom, setNewRoom] = useState({
    name: "",
    category: "AC Room",
    price: "",
    image: "",
    description: "",
    capacity: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRoom.name || !newRoom.price) return;

    onAddRoom({
      ...newRoom,
      id: Date.now(),
      price: Number(newRoom.price),
      image: newRoom.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      rating: 5,
    });
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">
              <FaPlus className="me-2" /> Add New Room
            </h5>
            <button
              type="button"
              className="btn btn-outline-light btn-sm rounded-circle"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Room Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="e.g. Executive Deluxe Suite"
                  value={newRoom.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={newRoom.category}
                    onChange={handleChange}
                  >
                    <option value="AC Room">AC Room</option>
                    <option value="Non AC Room">Non AC Room</option>
                    <option value="Luxury Room">Luxury Room</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Price (₹ per night)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="2500"
                    value={newRoom.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Image URL (Optional)</label>
                <input
                  type="url"
                  className="form-control"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={newRoom.image}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  placeholder="Describe room highlights..."
                  value={newRoom.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save & Publish Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
