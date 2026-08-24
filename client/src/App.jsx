import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Bill from "./pages/Bill";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
