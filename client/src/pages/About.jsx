
const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">
          About Smart Hotel Management System
        </h1>
        <p className="text-muted">
          A modern solution for easy hotel room booking and management.
        </p>
      </div>

      <div className="card shadow-lg p-4 border-0">
        <h3 className="mb-3">Who We Are</h3>
        <p>
          Our Smart Hotel Management System is designed to make hotel
          operations simple, fast, and efficient. This system helps hotel
          owners manage rooms, bookings, customer details, and room
          availability in one place.
        </p>

        <h3 className="mt-4 mb-3">Our Features</h3>
        <ul className="list-group">
          <li className="list-group-item">
            🏨 Easy Room Booking System
          </li>
          <li className="list-group-item">
            ❄️ AC and Non-AC Room Availability
          </li>
          <li className="list-group-item">
            💰 Room Price Management
          </li>
          <li className="list-group-item">
            📅 Booking Status Tracking
          </li>
          <li className="list-group-item">
            👨‍💼 Customer Information Management
          </li>
          <li className="list-group-item">
            🔒 Secure and User-Friendly System
          </li>
        </ul>

        <h3 className="mt-4 mb-3">Our Goal</h3>
        <p>
          Our goal is to provide a smart and digital way to manage hotel
          bookings and services efficiently while saving time and improving
          customer experience.
        </p>
      </div>
    </div>
  )
}

export default About