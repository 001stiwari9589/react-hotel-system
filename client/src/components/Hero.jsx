import hotelimg from '../assets/hotelimg.jpg';
const Hero = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "100vh",
        backgroundImage:`url(${hotelimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className="display-2 fw-bold">
          Welcome To Smart Hotel
        </h1>

        <p className="lead mt-3 px-3">
          Experience luxury, comfort, and smart room booking
          with our modern hotel management system.
        </p>

        <div className="mt-4">
          <button className="btn btn-warning btn-lg me-3 px-4"
          onClick= {() => {window.location.href = "/rooms"}}>
            Book Room
          </button>

          <button className="btn btn-outline-light btn-lg px-4"
         onClick={() => {document.getElementById("about")
               ?.scrollIntoView({ behavior: "smooth",});
                  }}>
            Explore More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero