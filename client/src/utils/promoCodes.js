// Promo code utility functions for discounts & management

const DEFAULT_PROMO_CODES = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    description: "10% off on your stay",
  },
  {
    code: "LUXURY20",
    type: "percent",
    value: 20,
    description: "20% off luxury bookings",
  },
  {
    code: "SAVE500",
    type: "fixed",
    value: 500,
    description: "Flat ₹500 discount",
  },
  {
    code: "ROYAL15",
    type: "percent",
    value: 15,
    description: "15% off Royal & Suite rooms",
  },
];

export const getPromoCodes = () => {
  const saved = localStorage.getItem("hotelPromoCodes");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_PROMO_CODES;
    }
  }
  localStorage.setItem("hotelPromoCodes", JSON.stringify(DEFAULT_PROMO_CODES));
  return DEFAULT_PROMO_CODES;
};

export const savePromoCodes = (codes) => {
  localStorage.setItem("hotelPromoCodes", JSON.stringify(codes));
};

export const addPromoCode = (newCode) => {
  const codes = getPromoCodes();
  const exists = codes.some(
    (c) => c.code.toUpperCase() === newCode.code.toUpperCase()
  );
  if (exists) {
    return { success: false, message: "Promo code already exists!" };
  }
  const updated = [
    { ...newCode, code: newCode.code.toUpperCase() },
    ...codes,
  ];
  savePromoCodes(updated);
  return { success: true, codes: updated };
};

export const deletePromoCode = (codeToDelete) => {
  const codes = getPromoCodes();
  const updated = codes.filter(
    (c) => c.code.toUpperCase() !== codeToDelete.toUpperCase()
  );
  savePromoCodes(updated);
  return updated;
};

export const validatePromoCode = (inputCode) => {
  if (!inputCode) return { valid: false, message: "Please enter a promo code" };
  const cleanCode = inputCode.trim().toUpperCase();
  const codes = getPromoCodes();
  const found = codes.find((c) => c.code.toUpperCase() === cleanCode);

  if (!found) {
    return { valid: false, message: "Invalid or expired promo code" };
  }

  return { valid: true, promo: found, message: `Applied! ${found.description}` };
};

export const calculateDiscount = (totalAmountInINR, promo) => {
  if (!promo) return 0;
  if (promo.type === "percent") {
    return Math.round((totalAmountInINR * promo.value) / 100);
  }
  if (promo.type === "fixed") {
    return Math.min(totalAmountInINR, promo.value);
  }
  return 0;
};
