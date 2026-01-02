"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import { formatPrice } from "@/lib/i18n/format-number"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)
  const { t, locale } = useTranslation()

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
    }, 800)
  }

  const handleBuyNow = () => {
    addToCart(product)
    router.push("/cart")
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={locale === "ar" ? product.nameArabic : product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {product.inStock && (
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
            {t.shop.inStock}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Name & Arabic Name */}
        <div className="space-y-1">
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {locale === "ar" ? product.nameArabic : product.name}
          </h3>
          <p className="text-sm text-muted-foreground font-arabic">
            {locale === "ar" ? product.name : product.nameArabic}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {locale === "ar" ? product.descriptionArabic : product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold text-primary">{formatPrice(product.price, locale)}</span>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className={cn(
              "flex-1 group/btn transition-all duration-300",
              isAdding && "bg-primary text-primary-foreground border-primary",
            )}
            disabled={!product.inStock}
          >
            <ShoppingCart
              className={cn(
                "w-4 h-4 mr-2 transition-transform duration-300",
                isAdding ? "scale-125" : "group-hover/btn:scale-110",
              )}
            />
            {isAdding ? t.cart.added : t.shop.addToCart}
          </Button>

          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-primary hover:bg-primary/90 group/btn transition-all duration-300"
            disabled={!product.inStock}
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
            {t.shop.buyNow}
          </Button>
        </div>
      </div>
    </Card>
  )
}
