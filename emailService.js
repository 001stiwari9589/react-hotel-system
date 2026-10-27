const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { generateBookingEmailHtml } = require("./emailTemplate");

// Default Target Email requested by user
const DEFAULT_TARGET_EMAIL = "001stiwari9589@gmail.com";

// Directory to store HTML preview files for easy local inspection
const EMAILS_DIR = path.join(__dirname, "emails");
if (!fs.existsSync(EMAILS_DIR)) {
  try {
    fs.mkdirSync(EMAILS_DIR, { recursive: true });
  } catch (e) {
    console.error("Could not create emails directory:", e);
  }
}

/**
 * Creates and configures a nodemailer transporter
 */
async function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (user && pass) {
    // Configured with real SMTP (e.g. Gmail App Password)
    return {
      transporter: nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || "gmail",
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: process.env.SMTP_PORT === "587" ? false : true,
        auth: { user, pass },
        tls: {
          rejectUnauthorized: false,
        },
      }),
      from: `Smart Hotel Reservations <${user}>`,
      isLive: true,
    };
  }

  // Fallback to ethereal test account for dev/testing when no credentials are provided
  try {
    const testAccount = await nodemailer.createTestAccount();
    const testTransporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    return {
      transporter: testTransporter,
      from: `"Smart Hotel System" <${testAccount.user}>`,
      isLive: false,
      isTestAccount: true,
    };
  } catch (err) {
    // If offline or ethereal fails, return null transporter (file-based preview only)
    return {
      transporter: null,
      from: `"Smart Hotel System" <no-reply@smarthotel.com>`,
      isLive: false,
      isTestAccount: false,
    };
  }
}

/**
 * Send Booking Email Notification to the Hotel Owner & Guest
 * @param {Object} booking Booking details object
 */
async function sendBookingNotification(booking) {
  const targetEmail = process.env.ADMIN_EMAIL || process.env.NOTIFICATION_EMAIL || DEFAULT_TARGET_EMAIL;
  const htmlContent = generateBookingEmailHtml(booking, { isOwner: true, targetEmail });

  // 1. Always save a copy of the styled email locally as HTML for instant review
  let localPreviewPath = null;
  try {
    const safeId = (booking.id || "latest").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `booking_${safeId}.html`;
    const fullPath = path.join(EMAILS_DIR, filename);
    const latestPath = path.join(EMAILS_DIR, "latest_booking.html");

    fs.writeFileSync(fullPath, htmlContent, "utf8");
    fs.writeFileSync(latestPath, htmlContent, "utf8");
    localPreviewPath = fullPath;
  } catch (fileErr) {
    console.error("[EMAIL] Failed to write local preview file:", fileErr);
  }

  const subject = `🏨 New Reservation: ${booking.roomType || "Room"} by ${booking.name || "Guest"} [${booking.id || "N/A"}]`;

  // 2. Transmit via nodemailer
  try {
    const { transporter, from, isLive, isTestAccount } = await getTransporter();

    if (!transporter) {
      console.log(`\n======================================================`);
      console.log(`[EMAIL NOTICE] Booking Notification generated for: ${targetEmail}`);
      console.log(`[EMAIL NOTICE] Styled HTML saved locally to: ${localPreviewPath}`);
      console.log(`[EMAIL NOTICE] (Configure EMAIL_USER & EMAIL_PASS in .env to send live emails)`);
      console.log(`======================================================\n`);
      return {
        success: true,
        mode: "local-preview",
        recipient: targetEmail,
        localPreview: localPreviewPath,
      };
    }

    const mailOptions = {
      from,
      to: targetEmail,
      subject,
      html: htmlContent,
      replyTo: booking.email || targetEmail,
    };

    const info = await transporter.sendMail(mailOptions);
    let previewUrl = null;

    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info);
    }

    console.log(`\n======================================================`);
    console.log(`[EMAIL SUCCESS] Notification email successfully processed!`);
    console.log(`[EMAIL] To: ${targetEmail}`);
    console.log(`[EMAIL] Subject: ${subject}`);
    console.log(`[EMAIL] Mode: ${isLive ? "LIVE SMTP" : "DEV TEST/PREVIEW"}`);
    if (previewUrl) {
      console.log(`[EMAIL] Live Web Preview: ${previewUrl}`);
    }
    if (localPreviewPath) {
      console.log(`[EMAIL] Local Styled File: ${localPreviewPath}`);
    }
    console.log(`======================================================\n`);

    // Also send confirmation to guest if guest email is present and not same as owner
    if (isLive && booking.email && booking.email.toLowerCase() !== targetEmail.toLowerCase()) {
      try {
        const guestHtml = generateBookingEmailHtml(booking, { isOwner: false, targetEmail: booking.email });
        await transporter.sendMail({
          from,
          to: booking.email,
          subject: `Your Booking is Confirmed! [${booking.id}] - Smart Hotel & Suites`,
          html: guestHtml,
        });
        console.log(`[EMAIL] Guest confirmation copy also dispatched to: ${booking.email}`);
      } catch (guestErr) {
        console.warn(`[EMAIL] Failed to send guest confirmation copy:`, guestErr.message);
      }
    }

    return {
      success: true,
      mode: isLive ? "live" : "preview",
      messageId: info.messageId,
      recipient: targetEmail,
      previewUrl: previewUrl || null,
      localPreview: localPreviewPath,
    };
  } catch (error) {
    console.error(`[EMAIL ERROR] Could not dispatch email to ${targetEmail}:`, error.message);
    return {
      success: false,
      error: error.message,
      recipient: targetEmail,
      localPreview: localPreviewPath,
    };
  }
}

/**
 * Returns latest booking email HTML for API or dashboard viewing
 */
function getLatestEmailHtml() {
  const latestPath = path.join(EMAILS_DIR, "latest_booking.html");
  if (fs.existsSync(latestPath)) {
    return fs.readFileSync(latestPath, "utf8");
  }
  return null;
}

module.exports = {
  DEFAULT_TARGET_EMAIL,
  sendBookingNotification,
  getLatestEmailHtml,
};
