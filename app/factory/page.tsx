import Image from "next/image"
import { Building2, MapPin, Award, Users, Sparkles, Package } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function FactoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(218,165,32,0.1),transparent_50%)]" />

        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Zoghdan Factory
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Where tradition meets excellence in Egyptian craftsmanship
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20">
        {/* Location Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                <MapPin className="w-4 h-4" />
                <span>Our Location</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
                Crafted in the Heart of Egypt
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Located in Motubas Center, Kafr El-Sheikh, our factory combines traditional Egyptian perfume-making
                heritage with modern production techniques. We take pride in creating authentic Arabic fragrances and
                premium Bukhoor that represent the essence of Middle Eastern luxury.
              </p>
              <Card className="p-6 bg-muted/30 border-primary/20">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Factory Address</p>
                      <p className="text-muted-foreground">Motubas Center, Kafr El-Sheikh</p>
                      <p className="text-muted-foreground">Egypt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">Contact:</p>
                    <p className="font-semibold text-primary">+201002324488</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/img-20251223-165149-753.jpg"
                  alt="Zoghdan Factory Products"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Zoghdan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Excellence in every aspect of production and service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                We source the finest ingredients and use traditional methods to ensure authentic, long-lasting
                fragrances.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Authentic Recipes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our formulations are based on centuries-old Arabic perfume traditions passed down through generations.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Expert Craftsmen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our team of skilled artisans brings decades of experience in creating exceptional fragrances.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Luxury Packaging</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every product is beautifully packaged to reflect the premium quality of our fragrances.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Modern Facility</h3>
              <p className="text-muted-foreground leading-relaxed">
                State-of-the-art equipment combined with traditional techniques for consistent excellence.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Egyptian Heritage</h3>
              <p className="text-muted-foreground leading-relaxed">
                Proudly rooted in Egyptian tradition with a reputation for excellence across the Middle East.
              </p>
            </Card>
          </div>
        </section>

        {/* Product Gallery */}
        <section>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Craftsmanship</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A glimpse into our premium collection</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <Image
                src="/images/img-20251223-165212-119.jpg"
                alt="Golden Perfume Scent"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">Premium Perfumes</h3>
                <p className="text-white/80">Luxurious scents that last</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <Image
                src="/images/img-20251223-165202-862.jpg"
                alt="Bukhoor Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">Authentic Bukhoor</h3>
                <p className="text-white/80">Traditional Arabic incense</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
