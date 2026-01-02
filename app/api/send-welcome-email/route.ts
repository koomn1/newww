import { type NextRequest, NextResponse } from "next"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.error("[v0] RESEND_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: "Zoghdan Store <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Zoghdan for Incense and Perfumes",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Zoghdan</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #0A0A0A;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px;">
                    <!-- Header with Logo -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center;">
                        <div style="width: 80px; height: 80px; margin: 0 auto; background: linear-gradient(135deg, #D4AF37, #C5A028); border-radius: 50%; display: inline-block;"></div>
                        <h1 style="color: #D4AF37; font-size: 32px; margin: 20px 0 0; font-weight: 400;">Welcome to Zoghdan</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px; color: #E0E0E0; font-size: 16px; line-height: 1.6;">
                        <p style="margin: 0 0 16px;">Dear ${name || "Valued Customer"},</p>
                        <p style="margin: 0 0 16px;">Thank you for joining Zoghdan for Incense and Perfumes. We're delighted to welcome you to our family of luxury fragrance enthusiasts.</p>
                        <p style="margin: 0 0 16px;">At Zoghdan, we pride ourselves on offering the finest Arabic perfumes and traditional Bukhoor, crafted with care in our factory in Motubas Center, Kafr El-Sheikh, Egypt.</p>
                        <p style="margin: 0 0 16px;"><strong style="color: #D4AF37;">What's Next?</strong></p>
                        <ul style="margin: 0 0 16px; padding-left: 20px;">
                          <li style="margin-bottom: 8px;">Complete your profile with shipping details</li>
                          <li style="margin-bottom: 8px;">Explore our exclusive collection</li>
                          <li style="margin-bottom: 8px;">Enjoy a luxurious shopping experience</li>
                        </ul>
                      </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                      <td style="padding: 20px 40px; text-align: center;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://zoghdan.com"}/shop" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #D4AF37, #C5A028); color: #000000; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Start Shopping</a>
                      </td>
                    </tr>
                    
                    <!-- Contact Info -->
                    <tr>
                      <td style="padding: 20px 40px 40px; color: #A0A0A0; font-size: 14px; text-align: center; border-top: 1px solid #2A2A2A;">
                        <p style="margin: 0 0 8px;">Need assistance? We're here to help!</p>
                        <p style="margin: 0 0 4px; color: #D4AF37;">📞 +201002324488</p>
                        <p style="margin: 0 0 4px;">📍 Motubas Center, Kafr El-Sheikh, Egypt</p>
                        <p style="margin: 16px 0 0; font-size: 12px; color: #808080;">© 2025 Zoghdan for Incense and Perfumes. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Send welcome email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
