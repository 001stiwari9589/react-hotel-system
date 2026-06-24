import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
    
    const navigate = useNavigate();
    const hanldebooking = () => {
       navigate("/booking");
    }

  return (
    <div className="col-md-4 mb-4">

      <div className="card shadow">

        <img
          src={room.image}
          className="card-img-top"
          height="250"
        />

        <div className="card-body">

          <h3>{room.name}</h3>

          <p>Price: ₹{room.price}</p>

          <button className="btn btn-primary"
          onClick={hanldebooking}>
            Book Now
          </button>

        </div>
      </div>
    </div>
  );
};

export default RoomCard;