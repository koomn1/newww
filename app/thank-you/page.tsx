"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, Package, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OrderDetails {
  orderNumber: string
  name: string
  phone: string
  address: string
  city: string
  items: Array<{
    id: string
    name: string
    nameArabic: string
    quantity: number
    price: number
  }>
  total: number
  date: string
}

export default function ThankYouPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("lastOrder")
    if (stored) {
      setOrderDetails(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Thank You for Your Order!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We've received your order and will contact you shortly via WhatsApp to confirm the details and arrange
            delivery.
          </p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <Card className="p-8 space-y-8 mb-8">
            {/* Order Number */}
            <div className="text-center pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="font-serif text-3xl font-bold text-primary">{orderDetails.orderNumber}</p>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Customer Information</p>
                    <p className="text-sm text-muted-foreground">{orderDetails.name}</p>
                    <p className="text-sm text-muted-foreground">{orderDetails.phone}</p>
                    <p className="text-sm text-muted-foreground">{orderDetails.city}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Shipping Address</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{orderDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 pt-6 border-t border-border">
              <p className="font-semibold text-foreground">Order Items</p>
              {orderDetails.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.nameArabic}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-primary">{item.price * item.quantity} EGP</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-6 border-t border-border">
              <span className="text-xl font-semibold text-foreground">Total</span>
              <span className="font-serif text-3xl font-bold text-primary">{orderDetails.total} EGP</span>
            </div>
          </Card>
        )}

        {/* Contact Info */}
        <Card className="p-8 bg-muted/30 mb-8">
          <div className="text-center space-y-4">
            <Phone className="w-12 h-12 text-primary mx-auto" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">We'll Contact You Soon</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our team will reach out via WhatsApp to confirm your order and coordinate delivery.
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  <span className="text-primary">+201002324488</span>
                </p>
                <p className="text-sm text-muted-foreground">Egypt, Kafr El-Sheikh, Motubas Center</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
