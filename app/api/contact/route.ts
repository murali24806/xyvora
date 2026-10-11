import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (Note: in a serverless environment like Vercel, this is per-instance)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 requests per minute per IP

// Utility to escape HTML entities to prevent XSS in emails
const escapeHTML = (str?: string) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Basic email validation regex
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export async function POST(req: Request) {
  try {
    // -------------------------------------------------------------
    // Rate Limiting
    // -------------------------------------------------------------
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (ip !== 'unknown') {
      const now = Date.now();
      const ipData = rateLimit.get(ip) || { count: 0, lastReset: now };

      if (now - ipData.lastReset > RATE_LIMIT_WINDOW_MS) {
        ipData.count = 1;
        ipData.lastReset = now;
      } else {
        ipData.count++;
      }

      rateLimit.set(ip, ipData);

      if (ipData.count > MAX_REQUESTS_PER_WINDOW) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    const body = await req.json();
    
    // -------------------------------------------------------------
    // Input Validation
    // -------------------------------------------------------------
    if (!body.email || !isValidEmail(body.email)) {
       return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    
    // Check if the API key is configured
    if (!process.env.BREVO_API_KEY) {
      console.error("Missing BREVO_API_KEY environment variable");
      return NextResponse.json(
        { error: "Server configuration error: Missing API Key" },
        { status: 500 }
      );
    }

    // -------------------------------------------------------------
    // Input Sanitization (Escaping HTML)
    // -------------------------------------------------------------
    const safeName = escapeHTML(body.name);
    const safeEmail = escapeHTML(body.email);
    const safePhone = escapeHTML(body.phone);
    const safeCompany = escapeHTML(body.company);
    const safeService = escapeHTML(body.service);
    const safeDate = escapeHTML(body.date);
    const safeTime = escapeHTML(body.time);
    const safeMessage = escapeHTML(body.message);

    // Determine the subject based on the form type
    const isBooking = body.type === 'booking';
    const subject = isBooking 
      ? `New Slot Booking: ${safeService} - ${safeName}`
      : `New Contact Inquiry from ${safeName}`;

    // Construct the email HTML content
    let htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">
          ${isBooking ? '📅 New Service Booking' : '✉️ New Contact Message'}
        </h2>
        
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
    `;

    if (safePhone) htmlContent += `<p><strong>Phone:</strong> ${safePhone}</p>`;
    if (safeCompany) htmlContent += `<p><strong>Company:</strong> ${safeCompany}</p>`;
    if (safeService) htmlContent += `<p><strong>Service Requested:</strong> ${safeService}</p>`;
    if (safeDate) htmlContent += `<p><strong>Preferred Date:</strong> ${safeDate}</p>`;
    if (safeTime) htmlContent += `<p><strong>Preferred Time:</strong> ${safeTime}</p>`;
    
    if (safeMessage) {
      htmlContent += `
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6d28d9; border-radius: 4px;">
          <strong>Project Details/Message:</strong><br/>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `;
    }

    htmlContent += `
        </div>
        <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #eaeaea; font-size: 12px; color: #888;">
          This email was automatically generated from the XyvorA website contact form.
        </div>
      </div>
    `;

    // Send request to Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: "XyvorA Website",
          email: "xyvoratech@gmail.com" // Using verified email as sender
        },
        to: [
          {
            email: "xyvoratech@gmail.com",
            name: "XyvorA Team"
          }
        ],
        replyTo: {
          email: body.email, // Unescaped for actual delivery
          name: body.name
        },
        subject: subject,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email via Brevo" },
        { status: response.status }
      );
    }

    // -------------------------------------------------------------
    // Send Auto-Responder to the Customer
    // -------------------------------------------------------------
    const customerSubject = isBooking 
      ? `Booking Confirmation: ${safeService} with XyvorA`
      : `We received your message - XyvorA`;

    const customerHtmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">
          ${isBooking ? '🎉 Appointment Received!' : '👋 Thanks for reaching out!'}
        </h2>
        
        <div style="margin-top: 20px;">
          <p>Hi ${safeName},</p>
          <p>Thank you for contacting XyvorA! This email is to confirm that we have successfully received your ${isBooking ? 'booking request' : 'message'}.</p>
          
          ${isBooking ? `
            <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6d28d9; border-radius: 4px; margin: 20px 0;">
              <strong>Your Booking Details:</strong><br/><br/>
              <strong>Service:</strong> ${safeService}<br/>
              <strong>Date:</strong> ${safeDate}<br/>
              <strong>Time:</strong> ${safeTime}
            </div>
          ` : ''}
          
          <p>Our team will review your details and get back to you shortly to discuss the next steps.</p>
          <p>Best regards,<br/><strong>The XyvorA Team</strong></p>
        </div>
      </div>
    `;

    const customerResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: "XyvorA",
          email: "xyvoratech@gmail.com" // Verified sender email
        },
        to: [
          {
            email: body.email, // Unescaped for actual delivery
            name: body.name
          }
        ],
        subject: customerSubject,
        htmlContent: customerHtmlContent
      })
    });

    if (!customerResponse.ok) {
      console.error("Failed to send auto-responder to customer", await customerResponse.text());
    }

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
    
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
