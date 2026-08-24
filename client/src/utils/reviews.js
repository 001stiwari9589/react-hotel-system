// Guest reviews and ratings management utility

const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    name: "Ananya Sharma",
    rating: 5,
    roomType: "Luxury Royal Suite",
    comment: "Incredible stay! The balcony view and jacuzzi made our anniversary truly unforgettable.",
    date: "2026-07-20",
  },
  {
    id: "rev-2",
    name: "Rohan Verma",
    rating: 5,
    roomType: "AC Deluxe Room",
    comment: "Very clean room with super fast WiFi. Staff was extremely polite and helpful throughout.",
    date: "2026-07-25",
  },
  {
    id: "rev-3",
    name: "Vikram Malhotra",
    rating: 4,
    roomType: "Presidential Penthouse",
    comment: "Butler service was top notch! The panoramic city view at sunset is breathtaking.",
    date: "2026-07-28",
  },
];

export const getReviews = () => {
  const saved = localStorage.getItem("hotelReviews");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_REVIEWS;
    }
  }
  localStorage.setItem("hotelReviews", JSON.stringify(DEFAULT_REVIEWS));
  return DEFAULT_REVIEWS;
};

export const saveReviews = (reviews) => {
  localStorage.setItem("hotelReviews", JSON.stringify(reviews));
  window.dispatchEvent(new Event("reviewsChange"));
};

export const addReview = (reviewData) => {
  const reviews = getReviews();
  const newReview = {
    id: "rev-" + Date.now(),
    name: reviewData.name || "Anonymous Guest",
    rating: Number(reviewData.rating) || 5,
    roomType: reviewData.roomType || "General Stay",
    comment: reviewData.comment,
    date: new Date().toISOString().split("T")[0],
  };

  const updated = [newReview, ...reviews];
  saveReviews(updated);
  return updated;
};

export const deleteReview = (reviewId) => {
  const reviews = getReviews();
  const updated = reviews.filter((r) => r.id !== reviewId);
  saveReviews(updated);
  return updated;
};
