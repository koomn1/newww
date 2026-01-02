"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditProfilePage() {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profile) {
        setFullName(profile.full_name || "")
        setPhone(profile.phone || "")
        setAddress(profile.address || "")
      }

      setIsLoading(false)
    }

    loadProfile()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone,
          address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id)

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push("/profile")
      }, 1500)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
        <div className="text-[#D4AF37]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0A0A] p-6">
      <div className="w-full max-w-md">
        <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
          <CardHeader className="space-y-4">
            <Link href="/profile" className="flex items-center gap-2 text-sm text-[#D4AF37] hover:underline w-fit">
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>
            <div>
              <CardTitle className="font-serif text-2xl text-[#D4AF37]">Edit Profile</CardTitle>
              <CardDescription className="text-[#A0A0A0]">Update your account information</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#D4AF37]">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#D4AF37]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#D4AF37]">
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-950/50 border border-red-900 p-3 text-sm text-red-200">{error}</div>
              )}

              {success && (
                <div className="rounded-md bg-green-950/50 border border-green-900 p-3 text-sm text-green-200">
                  Profile updated successfully! Redirecting...
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121] font-semibold"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
