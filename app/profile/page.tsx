import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserCircle, Mail, Phone, MapPin, LogOut } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#D4AF37] mb-2">My Profile</h1>
          <p className="text-[#A0A0A0]">Manage your account information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Account Information */}
          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-[#808080] mb-1">Full Name</div>
                <div className="text-white">{profile?.full_name || "Not provided"}</div>
              </div>
              <div>
                <div className="text-sm text-[#808080] mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
                <div className="text-white">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-[#808080] mb-1">Sign-in Method</div>
                <div className="text-white capitalize">
                  {profile?.provider === "google" && "Google"}
                  {profile?.provider === "facebook" && "Facebook"}
                  {profile?.provider === "email" && "Email & Password"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-[#808080] mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </div>
                <div className="text-white">{profile?.phone || "Not provided"}</div>
              </div>
              <div>
                <div className="text-sm text-[#808080] mb-1">Shipping Address</div>
                <div className="text-white">{profile?.address || "Not provided"}</div>
              </div>
              {(!profile?.phone || !profile?.address) && (
                <Link href="/profile/complete">
                  <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121]">
                    Complete Profile
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/profile/edit">
              <Button className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">Edit Profile</Button>
            </Link>
            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="outline"
                className="w-full border-red-900 text-red-400 hover:bg-red-950/50 hover:text-red-300 bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
