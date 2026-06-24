import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import downloadpng from "../assets/download.png";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin =
      JSON.parse(localStorage.getItem("adminLogin"));

    if (!isAdmin) {
      navigate("/admin-login");
    }

    const savedBookings =
      JSON.parse(localStorage.getItem("hotelBookings")) || [];

    setBookings(savedBookings);
  }, []);

  const handleDelete = (index) => {
    const updatedBookings = bookings.filter(
      (_, i) => i !== index
    );

   setBookings(updatedBookings);

    localStorage.setItem(
      "hotelBookings",
      JSON.stringify(updatedBookings)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/admin-login");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">
         <img src={downloadpng} alt="React Logo" width="50" height="50" className="me-2" 
                  style={{background: 'black',borderRadius: '50%'}}/>
          Admin Dashboard
        </h1>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {bookings.length === 0 ? (
        <h3>No Booking Found</h3>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Room Type</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(index)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;