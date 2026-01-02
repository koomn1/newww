"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/i18n"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()
  const { t } = useTranslation()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError(t.auth.error)
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t.auth.passwordLength)
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
            provider: "email",
          },
        },
      })
      if (error) throw error

      try {
        const emailResponse = await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name: fullName,
          }),
        })

        if (emailResponse.ok) {
          console.log("[v0] Welcome email sent successfully")
        } else {
          console.error("[v0] Failed to send welcome email:", await emailResponse.text())
        }
      } catch (emailError) {
        console.error("[v0] Error sending welcome email:", emailError)
        // Don't block signup flow if email fails
      }

      toast({
        title: t.auth.signUpSuccess,
        description: t.auth.checkEmail,
      })

      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t.auth.error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t.auth.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0A0A] p-6">
      <div className="w-full max-w-md">
        <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028]">
              <Image
                src="/images/img-20251223-165157-423.jpg"
                alt="Zoghdan Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <CardTitle className="font-serif text-3xl text-[#D4AF37]">{t.auth.createAccount}</CardTitle>
            <CardDescription className="text-[#A0A0A0]">{t.hero.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign Up Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialSignUp("google")}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121] font-semibold"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t.auth.continueWithGoogle}
              </Button>

              <Button
                onClick={() => handleSocialSignUp("facebook")}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121] font-semibold"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                {t.auth.continueWithFacebook}
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-[#2A2A2A]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A] px-2 text-xs text-[#808080]">
                {t.common.or.toUpperCase()}
              </span>
            </div>

            {/* Email Sign Up Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#D4AF37]">
                  {t.auth.fullName}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t.auth.fullNamePlaceholder}
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#D4AF37]">
                  {t.auth.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#D4AF37]">
                  {t.auth.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#D4AF37]">
                  {t.auth.confirmPassword}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t.auth.confirmPasswordPlaceholder}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#606060]"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-950/50 border border-red-900 p-3 text-sm text-red-200">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121] font-semibold"
                disabled={isLoading}
              >
                {isLoading ? t.common.loading : t.auth.createAccount}
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="bg-[#2A2A2A]" />

              <div className="text-center text-sm text-[#A0A0A0]">
                {t.auth.hasAccount}{" "}
                <Link href="/auth/login" className="text-[#D4AF37] hover:underline font-medium">
                  {t.auth.signIn}
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-[#808080]">
                <Phone className="h-4 w-4" />
                <span>{t.auth.loginSupport}</span>
                <a href="tel:+201002324488" className="text-[#D4AF37] hover:underline">
                  +201002324488
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
