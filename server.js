require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const { sendBookingNotification, getLatestEmailHtml } = require("./emailService");

const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "records.json");

// Helper to ensure records.json exists with initial schema
function getRecords() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData = { bookings: [], vipMembers: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }
    const rawData = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(rawData || '{"bookings":[],"vipMembers":[]}');
  } catch (error) {
    console.error("Error reading records.json:", error);
    return { bookings: [], vipMembers: [] };
  }
}

// Helper to safely write data to records.json
function saveRecords(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing to records.json:", error);
    return false;
  }
}

// Helper to parse JSON request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const json = body ? JSON.parse(body) : {};
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", (err) => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight CORS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;

  // GET /api/records - Retrieve all bookings and VIP members
  if (req.method === "GET" && (url === "/api/records" || url === "/api/records/")) {
    const data = getRecords();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, data }));
    return;
  }

  // GET /api/latest-email - View the HTML rendering of the latest booking notification email
  if (req.method === "GET" && (url === "/api/latest-email" || url === "/api/latest-email/")) {
    const html = getLatestEmailHtml();
    if (html) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "No booking emails generated yet." }));
    }
    return;
  }

  // POST /api/booking - Save room booking details and dispatch styled email notification to 001stiwari9589@gmail.com
  if (req.method === "POST" && (url === "/api/booking" || url === "/api/booking/")) {
    try {
      const bookingData = await parseRequestBody(req);
      const records = getRecords();

      const newBooking = {
        ...bookingData,
        recordedAt: new Date().toISOString(),
      };

      records.bookings.unshift(newBooking);
      saveRecords(records);

      console.log(`[SERVER] Saved new booking: ${newBooking.id || newBooking.name}`);

      // Dispatch beautifully styled email to hotel owner (001stiwari9589@gmail.com)
      const emailResult = await sendBookingNotification(newBooking);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: "Booking recorded successfully and notification email dispatched",
          booking: newBooking,
          email: emailResult,
        })
      );
    } catch (err) {
      console.error("[SERVER] Error processing booking:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "Invalid booking payload" }));
    }
    return;
  }

  // POST /api/test-email - Trigger a sample test booking email to 001stiwari9589@gmail.com
  if ((req.method === "POST" || req.method === "GET") && (url === "/api/test-email" || url === "/api/test-email/")) {
    const sampleBooking = {
      id: "BK-SAMPLE-" + Date.now().toString().slice(-4),
      name: "Satyam Tiwari (Test Guest)",
      email: "001stiwari9589@gmail.com",
      phone: "+91 9589018011",
      roomType: "Presidential Penthouse",
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
      numberOfNights: 2,
      guests: 2,
      addOns: ["Breakfast Package", "Airport Pickup"],
      subtotal: 15000,
      discountAmount: 1500,
      promoCode: "VIP10",
      totalBill: 13500,
      bookedAt: new Date().toLocaleDateString("en-IN"),
    };

    const emailResult = await sendBookingNotification(sampleBooking);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: "Test email dispatched for 001stiwari9589@gmail.com",
        email: emailResult,
      })
    );
    return;
  }

  // POST /api/vip - Save VIP join details into records.json
  if (req.method === "POST" && (url === "/api/vip" || url === "/api/vip/")) {
    try {
      const vipData = await parseRequestBody(req);
      const records = getRecords();

      const newVipMember = {
        id: "VIP-" + Date.now().toString().slice(-6),
        email: vipData.email,
        promoCode: vipData.promoCode || "VIP10",
        joinedAt: new Date().toISOString(),
        ...vipData,
      };

      // Check if email already exists in vipMembers
      const existing = records.vipMembers.find((m) => m.email.toLowerCase() === vipData.email.toLowerCase());
      if (!existing) {
        records.vipMembers.unshift(newVipMember);
        saveRecords(records);
        console.log(`[SERVER] Saved new VIP member: ${vipData.email}`);
      }

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, message: "VIP membership recorded successfully", vipMember: newVipMember }));
    } catch (err) {
      console.error("[SERVER] Error processing VIP signup:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "Invalid VIP signup payload" }));
    }
    return;
  }

  // Fallback 404 for unknown endpoints
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, error: "Endpoint not found" }));
});

server.listen(PORT, () => {
  console.log(`[SERVER] Hotel Management Backend running on http://localhost:${PORT}`);
  console.log(`[SERVER] Records file: ${DATA_FILE}`);
  console.log(`[SERVER] Notification target email: ${process.env.ADMIN_EMAIL || "001stiwari9589@gmail.com"}`);
  console.log(`[SERVER] View latest styled email at: http://localhost:${PORT}/api/latest-email`);
});
