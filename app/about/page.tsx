import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Globe, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/img-20251223-165149-753.jpg" alt="Zoghdan Products" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-6">
            <Image
              src="/images/img-20251223-165157-423.jpg"
              alt="Zoghdan Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            About Zoghdan
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed text-balance">
            Crafting timeless fragrances that celebrate Arabic heritage
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20">
        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Zoghdan for Incense was founded with a passion for preserving the rich traditions of Arabic perfumery.
                Based in Motubas Center, Kafr El-Sheikh, Egypt, we have dedicated ourselves to creating authentic
                fragrances that capture the essence of Middle Eastern luxury.
              </p>
              <p>
                Our name, Zoghdan, reflects our commitment to excellence and authenticity. Every product we create is a
                testament to centuries-old perfume-making traditions, combined with modern techniques to ensure the
                highest quality and consistency.
              </p>
              <p>
                From premium Bukhoor to exquisite perfume oils, each item in our collection is carefully crafted using
                the finest natural ingredients. We believe that fragrance is not just a scent—it's an experience, a
                memory, and a celebration of cultural heritage.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Authenticity</h3>
              <p className="text-muted-foreground leading-relaxed">
                We honor traditional Arabic perfume-making methods while ensuring every product meets modern quality
                standards.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every product is crafted with meticulous attention to detail, from ingredient selection to final
                packaging.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Heritage</h3>
              <p className="text-muted-foreground leading-relaxed">
                We take pride in our Egyptian roots and our role in preserving and sharing Middle Eastern fragrance
                traditions.
              </p>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="p-12 bg-gradient-to-br from-primary/5 via-background to-background border-primary/20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
                <p className="text-lg text-muted-foreground">
                  We'd love to hear from you. Contact us for inquiries, orders, or just to learn more about our
                  fragrances.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Phone</p>
                    <p className="text-sm text-primary">+201002324488</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <p className="text-sm text-muted-foreground">info@zoghdan.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">Motubas Center</p>
                    <p className="text-sm text-muted-foreground">Kafr El-Sheikh, Egypt</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="mt-6">
                <Link href="/shop">Explore Our Collection</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
