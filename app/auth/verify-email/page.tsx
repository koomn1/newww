import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0A0A0A] p-6">
      <div className="w-full max-w-md">
        <Card className="border-[#2A2A2A] bg-[#1A1A1A]">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028]">
              <Mail className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="font-serif text-2xl text-[#D4AF37]">Check Your Email</CardTitle>
            <CardDescription className="text-[#A0A0A0]">
              We've sent you a verification link to confirm your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-sm text-[#808080]">
              Please check your inbox and click the verification link to complete your registration.
            </p>
            <Link href="/auth/login">
              <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:from-[#C5A028] hover:to-[#B69121] font-semibold">
                Return to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
