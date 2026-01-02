import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Mail } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin (you can set this in user metadata during signup)
  const isAdmin = user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect("/")
  }

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching profiles:", error)
  }

  // Calculate statistics
  const totalUsers = profiles?.length || 0
  const googleUsers = profiles?.filter((p) => p.provider === "google").length || 0
  const facebookUsers = profiles?.filter((p) => p.provider === "facebook").length || 0
  const emailUsers = profiles?.filter((p) => p.provider === "email").length || 0

  // Users with complete profiles
  const completeProfiles = profiles?.filter((p) => p.phone && p.address).length || 0
  const incompleteProfiles = totalUsers - completeProfiles

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#D4AF37] mb-2">Admin Dashboard</h1>
          <p className="text-[#A0A0A0]">User management and analytics</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#D4AF37]">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalUsers}</div>
              <p className="text-xs text-[#808080] mt-1">All registered users</p>
            </CardContent>
          </Card>

          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#D4AF37]">Google Sign-ups</CardTitle>
              <svg className="h-4 w-4 text-[#D4AF37]" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{googleUsers}</div>
              <p className="text-xs text-[#808080] mt-1">{((googleUsers / totalUsers) * 100).toFixed(1)}% of total</p>
            </CardContent>
          </Card>

          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#D4AF37]">Facebook Sign-ups</CardTitle>
              <svg className="h-4 w-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{facebookUsers}</div>
              <p className="text-xs text-[#808080] mt-1">
                {totalUsers > 0 ? ((facebookUsers / totalUsers) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#D4AF37]">Email Sign-ups</CardTitle>
              <Mail className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{emailUsers}</div>
              <p className="text-xs text-[#808080] mt-1">
                {totalUsers > 0 ? ((emailUsers / totalUsers) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion Stats */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#D4AF37]">Complete Profiles</CardTitle>
              <UserPlus className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{completeProfiles}</div>
              <p className="text-xs text-[#808080] mt-1">Users with phone and address</p>
            </CardContent>
          </Card>

          <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#D4AF37]">Incomplete Profiles</CardTitle>
              <UserPlus className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{incompleteProfiles}</div>
              <p className="text-xs text-[#808080] mt-1">Users missing information</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users Table */}
        <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#D4AF37]">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#D4AF37]">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#D4AF37]">Provider</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#D4AF37]">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#D4AF37]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#D4AF37]">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles && profiles.length > 0 ? (
                    profiles.slice(0, 10).map((profile) => (
                      <tr key={profile.id} className="border-b border-[#2A2A2A]/50">
                        <td className="py-3 px-4 text-sm text-white">{profile.full_name || "N/A"}</td>
                        <td className="py-3 px-4 text-sm text-[#A0A0A0]">{profile.email}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-[#D4AF37]/10 px-2 py-1 text-xs font-medium text-[#D4AF37] capitalize">
                            {profile.provider}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#A0A0A0]">{profile.phone || "N/A"}</td>
                        <td className="py-3 px-4 text-sm">
                          {profile.phone && profile.address ? (
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                              Complete
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-400">
                              Incomplete
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#A0A0A0]">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#808080]">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
