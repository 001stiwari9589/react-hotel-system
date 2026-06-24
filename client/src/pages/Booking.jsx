import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {

  const navigate = useNavigate();

const [booking, setBooking] =
  useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    totalBill: 0,
  });

 const handleChange = (e) => {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]: value,
    });
  };


  const calculateBill = () => {
  let roomPrice = 0;

  if (
    booking.roomType ===
    "AC Room"
  ) {
    roomPrice = 3000;
  } else if (
    booking.roomType ===
    "Non AC Room"
  ) {
    roomPrice = 1500;
  } else if (
    booking.roomType ===
    "Luxury Room"
  ) {
    roomPrice = 5000;
  }

  const checkInDate =
    new Date(
      booking.checkIn
    );

  const checkOutDate =
    new Date(
      booking.checkOut
    );

  const timeDifference =
    checkOutDate -
    checkInDate;

  const days = Math.ceil(
    timeDifference /
      (1000 *
        60 *
        60 *
        24)
  );

  return days > 0
    ? roomPrice * days
    : roomPrice;
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // old bookings
    const oldBookings =
      JSON.parse(localStorage.getItem("hotelBookings")) || [];

    // new booking add
      const finalBooking = {
      ...booking,
           totalBill:
             calculateBill(),
    };

     const updatedBookings = [
       ...oldBookings,
          finalBooking,
       ];

    // save in localStorage
    localStorage.setItem(
      "hotelBookings",
      JSON.stringify(updatedBookings)
    );

   navigate("/bill", {
       state: finalBooking,
    });

    

    // reset form
   setBooking({
  name: "",
  email: "",
  phone: "",
  roomType: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  totalBill: 0,
});
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Hotel Booking Form
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={booking.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={booking.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone"
                  name="phone"
                  value={booking.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Room Type */}
              <div className="mb-3">
                <label>Room Type</label>
                <select
                  className="form-control"
                  name="roomType"
                  value={booking.roomType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Room
                  </option>

                  <option value="AC Room">
                    AC Room
                  </option>

                  <option value="Non AC Room">
                    Non AC Room
                  </option>

                  <option value="Luxury Room">
                    Luxury Room
                  </option>
                </select>
              </div>

              {/* Check In */}
              <div className="mb-3">
                <label>Check In</label>
                <input
                  type="date"
                  className="form-control"
                  name="checkIn"
                  value={booking.checkIn}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Check Out */}
              <div className="mb-3">
                <label>Check Out</label>
                <input
                  type="date"
                  className="form-control"
                  name="checkOut"
                  value={booking.checkOut}
                  onChange={handleChange}
                  required
                />
              </div>

                <div className="mb-3">
                     <label>Guests</label>
                      <input
                      min={1}
                      max={3}
                      type="number"
                      className="form-control"
                      placeholder="Number of Guests"
                       name="guests"
                       value={booking.guests}
                       onChange={
                      handleChange
                   }
                         required
                          />
                  </div> 

                  <h4 className="mb-3 text-primary">
                       Total Bill: ₹
                           {calculateBill()}
                        </h4>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Book Now
              </button>

              

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Booking;

