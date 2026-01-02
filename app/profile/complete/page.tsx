"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { UserCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function CompleteProfilePage() {
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("Motubas")
  const [governorate, setGovernorate] = useState("Kafr El-Sheikh")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()
  const { t } = useTranslation()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
        // Check if profile is already complete
        const { data: profile } = await supabase.from("profiles").select("phone, address").eq("id", user.id).single()

        if (profile?.phone && profile?.address) {
          router.push("/")
        }
      }
    }
    getUser()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!phone.startsWith("+20")) {
      setError("Phone number must start with +20")
      setIsLoading(false)
      return
    }

    if (phone.length < 13) {
      setError("Please enter a valid Egyptian phone number")
      setIsLoading(false)
      return
    }

    try {
      const fullAddress = `${address}, ${city}, ${governorate}, Egypt`

      const { error } = await supabase
        .from("profiles")
        .update({
          phone,
          address: fullAddress,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id)

      if (error) throw error

      router.push("/")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0A0A] p-6">
      <div className="w-full max-w-md">
        <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028]">
              <UserCircle className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="font-serif text-2xl text-[#D4AF37]">{t.profile.completeProfile}</CardTitle>
            <CardDescription className="text-[#A0A0A0]">{t.profile.shippingInfo}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#D4AF37]">
                    {t.profile.phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+201002324488"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                  />
                  <p className="text-xs text-[#808080]">Format: +20XXXXXXXXXX</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#D4AF37]">
                    {t.profile.address}
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main Street"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#D4AF37]">
                      {t.profile.city}
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Motubas"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="governorate" className="text-[#D4AF37]">
                      {t.profile.governorate}
                    </Label>
                    <Input
                      id="governorate"
                      type="text"
                      placeholder="Kafr El-Sheikh"
                      required
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                    />
                  </div>
                </div>

                <div className="rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3">
                  <p className="text-xs text-[#D4AF37]">{t.contact.locationText}</p>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-950/50 border border-red-900 p-3 text-sm text-red-200">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121] font-semibold"
                disabled={isLoading}
              >
                {isLoading ? t.common.loading : t.profile.save}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
