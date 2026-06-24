import { useLocation } from "react-router-dom";
import downloadpng from "../assets/download.png";
const Bill = () => {
  const { state } =
    useLocation();

  const booking = state;

  return (
    <div className="container py-5">
      <div className="card shadow p-4">

        <h1 className="text-center text-success mb-4">
          <img src={downloadpng} alt="React Logo" width="50" height="50" className="me-2" 
          style={{background: 'black',borderRadius: '50%'}}/>
          Hotel Booking Bill
        </h1>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                {booking.name}
              </td>
            </tr>

            <tr>
              <th>Email</th>
              <td>
                {booking.email}
              </td>
            </tr>

            <tr>
              <th>Phone</th>
              <td>
                {booking.phone}
              </td>
            </tr>

            <tr>
              <th>Room Type</th>
              <td>
                {
                  booking.roomType
                }
              </td>
            </tr>

            <tr>
              <th>Check In</th>
              <td>
                {
                  booking.checkIn
                }
              </td>
            </tr>

            <tr>
              <th>Check Out</th>
              <td>
                {
                  booking.checkOut
                }
              </td>
            </tr>

            <tr>
              <th>Guests</th>
              <td>
                {
                  booking.guests
                }
              </td>
            </tr>

            <tr>
              <th>Total Bill</th>
              <td>
                ₹
                {
                  booking.totalBill
                }
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-success w-100"
          onClick={() =>
            window.print()
          }
        >
          Print Bill
        </button>
      </div>
    </div>
  );
};

export default Bill;