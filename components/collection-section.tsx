import Image from "next/image"
import { Button } from "@/components/ui/button"

export function CollectionSection() {
  const collections = [
    {
      title: "Bukhoor Collection",
      description: "Traditional incense crafted from premium natural ingredients",
      image: "/images/img-20251223-165149-753.jpg",
    },
    {
      title: "Perfume Oils",
      description: "Concentrated fragrances that captivate and endure",
      image: "/images/img-20251223-165212-119.jpg",
    },
    {
      title: "Premium Incense",
      description: "Exclusive blends for connoisseurs of fine fragrances",
      image: "/images/img-20251223-165157-540.jpg",
    },
  ]

  return (
    <section id="collections" className="py-32 bg-secondary/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary text-sm tracking-[0.3em] uppercase">Our Collections</p>
          <h2 className="font-serif text-4xl lg:text-6xl font-light text-balance">
            Curated for <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our meticulously selected range of authentic Arabian fragrances, each representing the pinnacle of
            traditional perfumery
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-serif text-2xl text-card-foreground mb-2">{collection.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{collection.description}</p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto">
                  Discover More →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
