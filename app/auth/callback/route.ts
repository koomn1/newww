import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      try {
        const userName =
          data.user.user_metadata.full_name || data.user.user_metadata.name || data.user.email?.split("@")[0]

        const emailResponse = await fetch(`${origin}/api/send-welcome-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
            name: userName,
          }),
        })

        if (emailResponse.ok) {
          console.log("[v0] Welcome email sent successfully to", data.user.email)
        } else {
          console.error("[v0] Failed to send welcome email:", await emailResponse.text())
        }
      } catch (emailError) {
        console.error("[v0] Error sending welcome email:", emailError)
        // Don't block OAuth flow if email fails
      }
    }
  }

  // Redirect to profile completion if needed, otherwise home
  return NextResponse.redirect(`${origin}/profile/complete`)
}
