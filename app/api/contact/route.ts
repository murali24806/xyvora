import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if the API key is configured
    if (!process.env.BREVO_API_KEY) {
      console.error("Missing BREVO_API_KEY environment variable");
      return NextResponse.json(
        { error: "Server configuration error: Missing API Key" },
        { status: 500 }
      );
    }

    // Determine the subject based on the form type
    const isBooking = body.type === 'booking';
    const subject = isBooking 
      ? `New Slot Booking: ${body.service} - ${body.name}`
      : `New Contact Inquiry from ${body.name}`;

    // Construct the email HTML content
    let htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">
          ${isBooking ? '📅 New Service Booking' : '✉️ New Contact Message'}
        </h2>
        
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
    `;

    if (body.phone) htmlContent += `<p><strong>Phone:</strong> ${body.phone}</p>`;
    if (body.company) htmlContent += `<p><strong>Company:</strong> ${body.company}</p>`;
    if (body.service) htmlContent += `<p><strong>Service Requested:</strong> ${body.service}</p>`;
    if (body.date) htmlContent += `<p><strong>Preferred Date:</strong> ${body.date}</p>`;
    if (body.time) htmlContent += `<p><strong>Preferred Time:</strong> ${body.time}</p>`;
    
    if (body.message) {
      htmlContent += `
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6d28d9; border-radius: 4px;">
          <strong>Project Details/Message:</strong><br/>
          <p style="white-space: pre-wrap;">${body.message}</p>
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
          email: "saipatnala248@gmail.com" // Using verified email as sender
        },
        to: [
          {
            email: "saipatnala248@gmail.com",
            name: "Sai Patnala"
          }
        ],
        replyTo: {
          email: body.email,
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

    return NextResponse.json({ success: true, message: "Email sent successfully" });
    
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
