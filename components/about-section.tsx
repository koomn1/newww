import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image
                src="/images/khaled-20zoghdan-201002324488-40s.jpg"
                alt="Zoghdan Heritage"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative Border */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-primary/30 rounded-sm -z-10" />
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">Our Story</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light leading-tight text-balance">
                Crafting Excellence Since <span className="text-primary">Generations</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Zoghdan represents the culmination of centuries-old Arabian perfumery traditions, brought to life
                through modern craftsmanship and an unwavering commitment to authenticity.
              </p>
              <p>
                Our master perfumers source only the finest natural ingredients from across the Arabian Peninsula,
                ensuring each product embodies the rich heritage and sophistication that defines true luxury.
              </p>
              <p>
                Every fragrance in our collection tells a unique story—of ancient trade routes, sacred rituals, and the
                timeless art of scent creation that has captivated hearts for millennia.
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl">✦</span>
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Premium Ingredients</h3>
                  <p className="text-sm text-muted-foreground">
                    Sourced from the finest suppliers across the Middle East
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl">✦</span>
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Artisan Craftsmanship</h3>
                  <p className="text-sm text-muted-foreground">
                    Each product handcrafted by experienced master perfumers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
