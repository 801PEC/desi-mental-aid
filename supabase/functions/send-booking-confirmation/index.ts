import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  name: string;
  email: string;
  phone?: string;
  college: string;
  academicYear: string;
  preferredDate: string;
  timeSlot: string;
  sessionType: string;
  concerns?: string;
  bookingId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      college,
      academicYear,
      preferredDate,
      timeSlot,
      sessionType,
      concerns,
      bookingId,
    }: BookingConfirmationRequest = await req.json();

    console.log("Sending booking confirmation email to:", email);

    const sessionTypeFormatted = sessionType === 'individual' ? 'Individual Session (45 mins)' :
                                sessionType === 'crisis' ? 'Crisis Support (30 mins)' :
                                sessionType === 'followup' ? 'Follow-up Session (30 mins)' : sessionType;

    const emailResponse = await resend.emails.send({
      from: "MindCare Counseling <onboarding@resend.dev>",
      to: [email],
      subject: "🌟 Your Counseling Session is Confirmed!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Session Confirmation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 15px;">🌟</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Session Confirmed!</h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Your mental wellness journey starts here</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                <h2 style="color: #667eea; margin: 0 0 15px; font-size: 20px;">Hello ${name}! 👋</h2>
                <p style="margin: 0; color: #666;">Your counseling session has been successfully scheduled. We're here to support you every step of the way.</p>
              </div>

              <!-- Session Details -->
              <div style="background: white; border: 2px solid #e9ecef; border-radius: 10px; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #333; margin: 0 0 20px; font-size: 18px; display: flex; align-items: center;">
                  📅 Session Details
                </h3>
                
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f3f4;">
                    <span style="font-weight: 500; color: #555;">📅 Date:</span>
                    <span style="color: #333;">${new Date(preferredDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f3f4;">
                    <span style="font-weight: 500; color: #555;">⏰ Time:</span>
                    <span style="color: #333;">${timeSlot}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f3f4;">
                    <span style="font-weight: 500; color: #555;">🎯 Session Type:</span>
                    <span style="color: #333;">${sessionTypeFormatted}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f3f4;">
                    <span style="font-weight: 500; color: #555;">🏫 Institution:</span>
                    <span style="color: #333;">${college}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 12px 0;">
                    <span style="font-weight: 500; color: #555;">📚 Academic Year:</span>
                    <span style="color: #333;">${academicYear}</span>
                  </div>
                </div>
              </div>

              ${concerns ? `
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h4 style="color: #856404; margin: 0 0 10px; font-size: 16px;">💭 Discussion Topics:</h4>
                <p style="margin: 0; color: #856404; font-style: italic;">"${concerns}"</p>
              </div>
              ` : ''}

              <!-- Important Information -->
              <div style="background: #e8f5e8; border: 1px solid #c3e6c3; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #2d5a2d; margin: 0 0 15px; font-size: 16px;">🔒 Privacy & Confidentiality</h3>
                <ul style="margin: 0; color: #2d5a2d; padding-left: 20px;">
                  <li>All sessions are completely confidential and encrypted</li>
                  <li>Your privacy is protected by strict professional standards</li>
                  <li>Information is never shared without your explicit consent</li>
                </ul>
              </div>

              <!-- Next Steps -->
              <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: #0c4a6e; margin: 0 0 15px; font-size: 16px;">📋 Before Your Session</h3>
                <ul style="margin: 0; color: #0c4a6e; padding-left: 20px;">
                  <li>Find a quiet, private space for your session</li>
                  <li>Test your internet connection and audio/video</li>
                  <li>Have a glass of water nearby</li>
                  <li>Take a few deep breaths and know that you're taking a positive step</li>
                </ul>
              </div>

              <!-- Contact Information -->
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <h3 style="color: #333; margin: 0 0 15px;">Need to Reschedule or Have Questions?</h3>
                <p style="margin: 0 0 15px; color: #666;">We're here to help! Contact us anytime:</p>
                <p style="margin: 0; color: #667eea; font-weight: 500;">📞 Crisis Helpline: 1800-MINDCARE</p>
                <p style="margin: 5px 0 0; color: #667eea; font-weight: 500;">✉️ Email: support@mindcare.com</p>
              </div>

              <!-- Booking Reference -->
              <div style="text-align: center; margin-top: 30px; padding: 15px; background: #f1f3f4; border-radius: 6px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>Booking Reference:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px; font-family: monospace;">${bookingId}</code>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                You're taking an important step towards your mental wellness. We're proud of you! 💪
              </p>
              <p style="margin: 10px 0 0; color: #999; font-size: 12px;">
                MindCare Counseling Services - Supporting Student Mental Health
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);