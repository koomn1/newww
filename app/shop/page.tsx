"use client"

import { useState } from "react"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"

export default function ShopPage() {
  const [filter, setFilter] = useState<"all" | "bukhoor" | "perfume" | "incense">("all")
  const { t } = useTranslation()

  const filteredProducts = filter === "all" ? products : products.filter((p) => p.category === filter)

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t.shop.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.shop.subtitle}</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} className="px-6">
            {t.shop.allProducts}
          </Button>
          <Button
            variant={filter === "bukhoor" ? "default" : "outline"}
            onClick={() => setFilter("bukhoor")}
            className="px-6"
          >
            {t.shop.bukhoor}
          </Button>
          <Button
            variant={filter === "perfume" ? "default" : "outline"}
            onClick={() => setFilter("perfume")}
            className="px-6"
          >
            {t.shop.perfumes}
          </Button>
          <Button
            variant={filter === "incense" ? "default" : "outline"}
            onClick={() => setFilter("incense")}
            className="px-6"
          >
            {t.shop.accessories}
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
