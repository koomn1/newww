export function HeritageSection() {
  const features = [
    {
      title: "Authentic Recipes",
      description: "Traditional formulations passed down through generations",
      icon: "◈",
    },
    {
      title: "Natural Ingredients",
      description: "Pure botanicals and precious resins from nature",
      icon: "✧",
    },
    {
      title: "Artisan Quality",
      description: "Meticulously crafted by skilled master perfumers",
      icon: "❖",
    },
    {
      title: "Timeless Elegance",
      description: "Fragrances that transcend fleeting trends",
      icon: "✦",
    },
  ]

  return (
    <section id="heritage" className="py-32 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary text-sm tracking-[0.3em] uppercase">The Zoghdan Difference</p>
          <h2 className="font-serif text-4xl lg:text-6xl font-light text-balance">
            Where Tradition Meets <span className="text-primary">Luxury</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-8 bg-background/50 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="text-5xl text-primary group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="font-serif text-xl text-card-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <p className="font-serif text-2xl lg:text-3xl text-foreground leading-relaxed text-balance italic">
              "Fragrance is the unseen, unforgettable, ultimate accessory of fashion that heralds your arrival and
              prolongs your departure"
            </p>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
            <p className="text-sm text-muted-foreground tracking-wider">TRADITIONAL ARABIAN WISDOM</p>
          </div>
        </div>
      </div>
    </section>
  )
}
