"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { useTranslation } from "@/hooks/use-translation"
import { formatNumber } from "@/lib/i18n/format-number"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [mounted, setMounted] = useState(false)
  const { t, locale } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">{t.cart.shoppingCart}</h1>
          <p className="text-muted-foreground">
            {formatNumber(cart.itemCount, locale)} {cart.itemCount === 1 ? t.cart.item : t.cart.items}{" "}
            {t.cart.inYourCart}
          </p>
        </div>

        {cart.items.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <ShoppingBag className="w-24 h-24 text-muted-foreground/30" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{t.cart.emptyCart}</h2>
                <p className="text-muted-foreground">{t.cart.emptyMessage}</p>
              </div>
              <Button asChild size="lg" className="mt-4">
                <Link href="/shop">{t.cart.browseProducts}</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {locale === "ar" ? item.nameArabic : item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {locale === "ar" ? item.name : item.nameArabic}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 border border-border rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-base font-medium w-12 text-center">
                            {formatNumber(item.quantity, locale)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(item.price, locale)} × {formatNumber(item.quantity, locale)}
                          </p>
                          <p className="font-serif text-2xl font-bold text-primary">
                            {formatNumber(item.price * item.quantity, locale)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 space-y-6 sticky top-24">
                <h2 className="font-serif text-2xl font-bold text-foreground">{t.cart.orderSummary}</h2>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      {t.cart.subtotal} ({formatNumber(cart.itemCount, locale)}{" "}
                      {cart.itemCount === 1 ? t.cart.item : t.cart.items})
                    </span>
                    <span className="font-medium">{formatNumber(cart.total, locale)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.cart.shipping}</span>
                    <span className="font-medium">{t.cart.shippingCalculated}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl">
                  <span className="font-semibold text-foreground">{t.cart.total}</span>
                  <span className="font-serif text-3xl font-bold text-primary">{formatNumber(cart.total, locale)}</span>
                </div>

                <Button asChild className="w-full h-12 text-base" size="lg">
                  <Link href="/checkout">
                    {t.cart.proceedToCheckout}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/shop">{t.cart.continueShopping}</Link>
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
