import { Link } from "react-router-dom";
import downloadpng from "../assets/download.png";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
         
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <img src={downloadpng} alt="React Logo" width="50" height="50" className="me-2"  style={{height: '50px'}}/>
          Smart Hotel
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">

            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">
                Contact
              </Link>
            </li>

             <li className="nav-item">
            <Link className="nav-link  text-white" to="/rooms">
              Rooms
            </Link>
          </li>
            {/* 
              <li className="nav-item">
            <Link className="nav-link  text-white" to="/bill">
              Bill
            </Link>
          </li> */}

            <li className="nav-item">
            <Link className="nav-link  text-white" to="/adminlogin">
              Admin Login
            </Link>
          </li>
             

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;