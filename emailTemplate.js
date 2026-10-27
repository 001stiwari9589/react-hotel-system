/**
 * Premium Luxury Email Template for Hotel Booking Notifications
 * Optimized for desktop and mobile email clients (Gmail, Outlook, Apple Mail)
 */

function generateBookingEmailHtml(booking, options = {}) {
  const {
    id = "BK-" + Date.now().toString().slice(-6),
    name = "Guest",
    email = "N/A",
    phone = "N/A",
    roomType = "Deluxe Room",
    checkIn = "N/A",
    checkOut = "N/A",
    numberOfNights = 1,
    guests = 1,
    addOns = [],
    subtotal = 0,
    discountAmount = 0,
    promoCode = null,
    totalBill = 0,
    bookedAt = new Date().toLocaleDateString("en-IN"),
  } = booking;

  const isOwnerCopy = options.isOwner !== false;
  const targetEmail = options.targetEmail || "001stiwari9589@gmail.com";

  // Format currency
  const formatINR = (val) => {
    const num = Number(val) || 0;
    return "₹" + num.toLocaleString("en-IN");
  };

  // Add-ons list HTML
  const addOnsArray = Array.isArray(addOns) ? addOns : [];
  const addOnsBadges =
    addOnsArray.length > 0
      ? addOnsArray
          .map(
            (addon) =>
              `<span style="display:inline-block;background-color:#fef3c7;color:#92400e;font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;margin:4px 4px 4px 0;border:1px solid #fde68a;">✨ ${addon}</span>`
          )
          .join(" ")
      : `<span style="color:#64748b;font-size:13px;font-style:italic;">None selected</span>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Room Booking - ${id}</title>
</head>
<body style="margin:0;padding:0;background-color:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">
  <!-- Outer Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0b1120;padding:30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);padding:40px 30px;text-align:center;border-bottom:3px solid #f59e0b;">
              <!-- Logo / Crest -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 15px auto;">
                <tr>
                  <td style="background:linear-gradient(135deg,#f59e0b,#d97706);width:56px;height:56px;border-radius:50%;text-align:center;vertical-align:middle;box-shadow:0 8px 16px rgba(245,158,11,0.35);">
                    <span style="font-size:28px;line-height:56px;">🏨</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:1px;color:#ffffff;text-transform:uppercase;">
                Smart Hotel <span style="color:#f59e0b;">& Suites</span>
              </h1>
              <p style="margin:6px 0 0 0;font-size:13px;letter-spacing:2px;color:#94a3b8;text-transform:uppercase;font-weight:500;">
                ★ ★ ★ ★ ★ Luxury Hospitality System
              </p>
            </td>
          </tr>

          <!-- Alert Title & Booking Reference -->
          <tr>
            <td style="background-color:#fffbeb;padding:22px 30px;border-bottom:1px solid #fef3c7;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background-color:#d97706;color:#ffffff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:6px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">
                      ${isOwnerCopy ? "🔔 NEW RESERVATION ALERT" : "🎉 BOOKING CONFIRMATION"}
                    </span>
                    <h2 style="margin:4px 0 2px 0;font-size:19px;font-weight:700;color:#78350f;">
                      ${isOwnerCopy ? "A New Room Has Been Booked!" : "Your Reservation is Confirmed!"}
                    </h2>
                    <p style="margin:0;font-size:13px;color:#92400e;">
                      Reservation Reference: <strong style="color:#b45309;font-family:monospace;font-size:15px;">#${id}</strong> • Booked on: ${bookedAt}
                    </p>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;background-color:#10b981;color:#ffffff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;text-transform:uppercase;box-shadow:0 2px 4px rgba(16,185,129,0.25);">
                      ✓ Confirmed
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding:32px 30px;">

              <!-- Two Column Details: Guest Info & Stay Details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <!-- Guest Details Box -->
                  <td width="48%" style="vertical-align:top;background-color:#f8fafc;padding:20px;border-radius:12px;border:1px solid #e2e8f0;">
                    <h3 style="margin:0 0 14px 0;font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">
                      👤 Guest Information
                    </h3>
                    <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size:13px;">
                      <tr>
                        <td style="color:#64748b;font-weight:500;" width="70">Name:</td>
                        <td style="color:#0f172a;font-weight:700;">${name}</td>
                      </tr>
                      <tr>
                        <td style="color:#64748b;font-weight:500;">Email:</td>
                        <td><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;font-weight:600;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="color:#64748b;font-weight:500;">Phone:</td>
                        <td><a href="tel:${phone}" style="color:#0f172a;text-decoration:none;font-weight:700;">${phone}</a></td>
                      </tr>
                      <tr>
                        <td style="color:#64748b;font-weight:500;">Guests:</td>
                        <td style="color:#0f172a;font-weight:600;">👥 ${guests} Guest(s)</td>
                      </tr>
                    </table>
                  </td>

                  <!-- Spacing -->
                  <td width="4%"></td>

                  <!-- Stay Details Box -->
                  <td width="48%" style="vertical-align:top;background-color:#f8fafc;padding:20px;border-radius:12px;border:1px solid #e2e8f0;">
                    <h3 style="margin:0 0 14px 0;font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">
                      🛏️ Stay Information
                    </h3>
                    <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size:13px;">
                      <tr>
                        <td style="color:#64748b;font-weight:500;" width="75">Room:</td>
                        <td style="color:#d97706;font-weight:700;">${roomType}</td>
                      </tr>
                      <tr>
                        <td style="color:#64748b;font-weight:500;">Check-In:</td>
                        <td style="color:#0f172a;font-weight:600;">📅 ${checkIn}</td>
                      </tr>
                      <tr>
                        <td style="color:#64748b;font-weight:500;">Check-Out:</td>
                        <td style="color:#0f172a;font-weight:600;">📅 ${checkOut}</td>
                      </tr>
                      <tr>
                        <td style="color:#64748b;font-weight:500;">Duration:</td>
                        <td style="color:#0f172a;font-weight:700;">🌙 ${numberOfNights} Night(s)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Add-ons Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;padding:16px 20px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:24px;">
                <tr>
                  <td>
                    <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
                      ✨ Selected Packages & Add-Ons
                    </div>
                    <div>
                      ${addOnsBadges}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Financial & Billing Breakdown Table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">
                <tr style="background-color:#0f172a;color:#ffffff;">
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                    💳 Bill Breakdown & Payment Summary
                  </td>
                  <td align="right" style="padding:14px 18px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                    Amount
                  </td>
                </tr>
                <tr style="background-color:#ffffff;border-bottom:1px solid #f1f5f9;">
                  <td style="padding:12px 18px;font-size:14px;color:#334155;">
                    Stay Charges (${numberOfNights} Night${numberOfNights > 1 ? "s" : ""} × ${roomType})
                  </td>
                  <td align="right" style="padding:12px 18px;font-size:14px;font-weight:600;color:#0f172a;">
                    ${formatINR(subtotal)}
                  </td>
                </tr>

                ${
                  discountAmount > 0
                    ? `
                <tr style="background-color:#f0fdf4;border-bottom:1px solid #bbf7d0;">
                  <td style="padding:12px 18px;font-size:14px;color:#166534;">
                    🎁 Promo Discount ${promoCode ? `<span style="font-weight:700;background-color:#dcfce7;padding:2px 8px;border-radius:4px;font-size:12px;">(${promoCode})</span>` : ""}
                  </td>
                  <td align="right" style="padding:12px 18px;font-size:14px;font-weight:700;color:#16a34a;">
                    - ${formatINR(discountAmount)}
                  </td>
                </tr>
                `
                    : ""
                }

                <tr style="background:linear-gradient(135deg, #fef3c7, #fde68a);font-size:16px;">
                  <td style="padding:16px 18px;font-weight:800;color:#78350f;">
                    TOTAL AMOUNT DUE / PAID:
                  </td>
                  <td align="right" style="padding:16px 18px;font-size:20px;font-weight:800;color:#b45309;">
                    ${formatINR(totalBill)}
                  </td>
                </tr>
              </table>

              <!-- Quick Action Buttons for Owner / Reception -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="text-align:center;margin-bottom:10px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="padding:0 6px;">
                          <a href="tel:${phone}" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                            📞 Call Guest (${phone})
                          </a>
                        </td>
                        <td style="padding:0 6px;">
                          <a href="mailto:${email}?subject=Booking%20Confirmation%20${id}%20-%20Smart%20Hotel" style="display:inline-block;background-color:#f59e0b;color:#0f172a;font-size:13px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:8px;box-shadow:0 4px 6px -1px rgba(245,158,11,0.25);">
                            ✉️ Reply to Guest
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color:#0f172a;color:#94a3b8;padding:26px 30px;text-align:center;font-size:12px;line-height:1.7;border-top:1px solid #1e293b;">
              <p style="margin:0 0 6px 0;color:#f1f5f9;font-weight:600;font-size:13px;">
                Smart Hotel Management System
              </p>
              <p style="margin:0 0 10px 0;">
                Notification dispatched to: <strong style="color:#f59e0b;">${targetEmail}</strong><br>
                Location: Madhya Pradesh, India • Phone: +91 9589 018011
              </p>
              <p style="margin:0;font-size:11px;color:#64748b;">
                © ${new Date().getFullYear()} Smart Hotel & Suites. All Rights Reserved. This email is automatically generated by the hotel reservation engine.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

module.exports = {
  generateBookingEmailHtml,
};
