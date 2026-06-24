import RoomCard from "../components/RoomCard";

const Rooms = () => {

  const rooms = [
    {
      id: 1,
      name: "AC Room",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    },

    {
      id: 2,
      name: "Non AC Room",
      price: 1000,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    },

    {
      id: 3,
      name: "Luxury Room",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
  ];

  return (
    <div className="container mt-5"
    id="rooms">

      <h1 className="text-center mb-4">
        Our Rooms
      </h1>

      <div className="row">

        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}

      </div>
    </div>
  );
};

export default Rooms;