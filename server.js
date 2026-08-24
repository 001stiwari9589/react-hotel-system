const http = require("http");
const fs = require("fs");
const path = require("path");

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

  // POST /api/booking - Save room booking details into records.json
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

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, message: "Booking recorded successfully", booking: newBooking }));
    } catch (err) {
      console.error("[SERVER] Error processing booking:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "Invalid booking payload" }));
    }
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
});
