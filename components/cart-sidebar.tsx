"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { formatPrice, formatNumber } from "@/lib/i18n/format-number"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [mounted, setMounted] = useState(false)
  const { t, locale } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[480px] bg-background border-l border-border z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">{t.cart.shoppingCart}</h2>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(cart.itemCount, locale)} {cart.itemCount === 1 ? t.cart.item : t.cart.items}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                <div>
                  <p className="font-serif text-xl font-semibold text-foreground mb-2">{t.cart.emptyCart}</p>
                  <p className="text-sm text-muted-foreground">{t.cart.emptyMessage}</p>
                </div>
                <Button onClick={onClose} asChild className="mt-4">
                  <Link href="/shop">{t.cart.continueShopping}</Link>
                </Button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <h3 className="font-semibold text-foreground truncate">
                        {locale === "ar" ? item.nameArabic : item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{locale === "ar" ? item.name : item.nameArabic}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-muted"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {formatNumber(item.quantity, locale)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-muted"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-serif font-bold text-primary">
                          {formatPrice(item.price * item.quantity, locale)}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-destructive h-auto py-1 px-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      {t.cart.remove}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4 bg-muted/30">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-foreground">{t.cart.subtotal}</span>
                <span className="font-serif text-2xl font-bold text-primary">{formatPrice(cart.total, locale)}</span>
              </div>

              <Button asChild className="w-full h-12 text-base" size="lg">
                <Link href="/checkout" onClick={onClose}>
                  {t.cart.proceedToCheckout}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full bg-transparent" onClick={onClose}>
                <Link href="/shop">{t.cart.continueShopping}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
