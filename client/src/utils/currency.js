// Currency utility for conversion and formatting

export const CURRENCIES = {
  INR: { symbol: "₹", rate: 1, label: "INR (₹)" },
  USD: { symbol: "$", rate: 0.012, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.011, label: "EUR (€)" },
};

export const getSelectedCurrency = () => {
  return localStorage.getItem("selectedCurrency") || "INR";
};

export const setSelectedCurrency = (currencyCode) => {
  if (CURRENCIES[currencyCode]) {
    localStorage.setItem("selectedCurrency", currencyCode);
    window.dispatchEvent(new Event("currencyChange"));
  }
};

export const formatCurrency = (amountInINR, currencyCode = null) => {
  const code = currencyCode || getSelectedCurrency();
  const currency = CURRENCIES[code] || CURRENCIES.INR;
  const converted = amountInINR * currency.rate;

  if (code === "INR") {
    return `${currency.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
  } else {
    return `${currency.symbol}${converted.toFixed(2)}`;
  }
};
