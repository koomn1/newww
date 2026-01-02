"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/hooks/use-cart"
import { useTranslation } from "@/lib/i18n"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && cart.items.length === 0) {
      router.push("/shop")
    }
  }, [cart.items.length, mounted, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare order message for WhatsApp
    const orderDetails = cart.items
      .map(
        (item) =>
          `• ${item.name} (${item.nameArabic}) - ${t.cart.quantity}: ${item.quantity} - ${item.price * item.quantity} EGP`,
      )
      .join("\n")

    const whatsappMessage = `
🛍️ *${t.thankYou.title}*

👤 *${t.checkout.contactInfo}:*
${t.checkout.fullName}: ${formData.name}
${t.checkout.phone}: ${formData.phone}
${t.checkout.city}: ${formData.city}

📍 *${t.checkout.shippingInfo}:*
${formData.address}

🎁 *${t.thankYou.orderDetails}:*
${orderDetails}

💰 *${t.cart.total}: ${cart.total} EGP*

${formData.notes ? `📝 *${t.checkout.notes}:* ${formData.notes}` : ""}
    `.trim()

    // Create WhatsApp URL
    const phoneNumber = "201002324488" // Zoghdan's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Store order details in sessionStorage for thank you page
    sessionStorage.setItem(
      "lastOrder",
      JSON.stringify({
        orderNumber: `ZGD${Date.now()}`,
        ...formData,
        items: cart.items,
        total: cart.total,
        date: new Date().toISOString(),
      }),
    )

    // Clear cart
    clearCart()

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank")

    // Redirect to thank you page
    setTimeout(() => {
      router.push("/thank-you")
    }, 500)
  }

  if (!mounted || cart.items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">{t.checkout.title}</h1>
          <p className="text-muted-foreground">{t.checkout.shippingInfo}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-2xl font-bold text-foreground">{t.checkout.contactInfo}</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {t.checkout.fullName} {t.checkout.required}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t.checkout.fullName}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      {t.checkout.phone} {t.checkout.required}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+20 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">
                      {t.checkout.city} {t.checkout.required}
                    </Label>
                    <Input
                      id="city"
                      placeholder={t.checkout.city}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-2xl font-bold text-foreground">{t.checkout.shippingInfo}</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">
                      {t.checkout.address} {t.checkout.required}
                    </Label>
                    <Textarea
                      id="address"
                      placeholder={t.checkout.address}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">{t.checkout.notes}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t.checkout.notes}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/30">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{t.contact.subtitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.thankYou.contact}: <span className="font-medium text-primary">+201002324488</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{t.contact.locationText}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 space-y-6 sticky top-24">
                <h2 className="font-serif text-2xl font-bold text-foreground">{t.checkout.orderSummary}</h2>

                {/* Cart Items */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.cart.quantity}: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">{item.price * item.quantity} EGP</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-medium">{cart.total} EGP</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.cart.shipping}</span>
                    <span className="font-medium">{t.checkout.processing}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl">
                  <span className="font-semibold text-foreground">{t.cart.total}</span>
                  <span className="font-serif text-3xl font-bold text-primary">{cart.total} EGP</span>
                </div>

                <Button type="submit" className="w-full h-12 text-base" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t.checkout.processing}
                    </>
                  ) : (
                    t.checkout.placeOrder
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">{t.contact.locationText}</p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
