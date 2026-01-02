"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">{t.hero.subtitle}</p>
              <h1 className="font-serif text-5xl lg:text-7xl font-light leading-[1.1] text-balance">
                {t.hero.title} <span className="text-primary font-normal">{t.factory.tradition}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">{t.hero.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-base tracking-wider group"
              >
                <Link href="/shop">
                  {t.hero.shopNow}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 h-14 text-base tracking-wider bg-transparent"
              >
                <Link href="/factory">{t.hero.exploreFactory}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-serif text-primary">20+</p>
                <p className="text-sm text-muted-foreground mt-1">{t.factory.quality}</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-1">{t.about.authenticity}</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-primary">50K+</p>
                <p className="text-sm text-muted-foreground mt-1">{t.about.excellence}</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/images/img-20251223-165202-862.jpg"
                alt="Zoghdan Luxury Bukhoor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-sm shadow-2xl max-w-xs">
              <p className="text-primary text-sm mb-2 tracking-wider">{t.hero.subtitle}</p>
              <p className="font-serif text-xl text-card-foreground">{t.hero.title}</p>
              <p className="text-muted-foreground text-sm mt-2">{t.hero.description.slice(0, 40)}...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
