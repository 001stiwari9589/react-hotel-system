import { useNavigate } from "react-router-dom";
const AboutSection = () => {
    const navigate = useNavigate()

  return (
    <section 
     id="about"
     className="container py-5">
      <div className="row align-items-center">
        
        {/* Left Side Image */}
        <div className="col-md-6 mb-4">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
            alt="Hotel"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Right Side Content */}
        <div className="col-md-6">
          <h5 className="text-success">
            About Our Hotel
          </h5>

          <h1 className="fw-bold mb-3">
            Welcome To Luxury Hotel
          </h1>

          <p className="text-muted">
            We provide luxury rooms,
            premium facilities, and
            the best hospitality for
            our guests. Our hotel
            offers AC rooms, luxury
            suites, free WiFi,
            restaurant service, and
            24/7 customer support.
          </p>

          <p className="text-muted">
            Enjoy a comfortable and
            memorable stay with your
            family and friends in
            our modern and stylish
            rooms.
          </p>

          {/* Features */}
          <div className="row mt-4">
            <div className="col-6">
              ✅ Luxury Rooms
            </div>

            <div className="col-6">
              ✅ Free WiFi
            </div>

            <div className="col-6">
              ✅ Restaurant
            </div>

            <div className="col-6">
              ✅ 24/7 Support
            </div>
          </div>

          <button className="btn btn-success mt-4 px-4"
            onClick={() =>
                navigate("/rooms")}>
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;