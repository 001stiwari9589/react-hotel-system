import Hero from "../components/Hero";
import QuickBookingBar from "../components/QuickBookingBar";
import StatsSection from "../components/StatsSection";
import FeaturedRooms from "../components/FeaturedRooms";
import AboutSection from "./AboutSection";
import AmenitiesSection from "../components/AmenitiesSection";
import SpecialOffersSection from "../components/SpecialOffersSection";
import ReviewsSection from "../components/ReviewsSection";
import FaqSection from "../components/FaqSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home-page-wrapper overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Floating Quick Availability & Search Bar */}
      <QuickBookingBar />

      {/* Key Stats Counter Section */}
      <StatsSection />

      {/* Featured Luxury Rooms Showcase */}
      <FeaturedRooms />

      {/* About Hotel Story & Experience */}
      <AboutSection />

      {/* Luxury Amenities Grid */}
      <AmenitiesSection />

      {/* Special Promo Offers & Discounts */}
      <SpecialOffersSection />

      {/* Guest Reviews & Feedback */}
      <ReviewsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* VIP Member Newsletter & Secret Deals */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
