"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/img-20251223-165157-423.jpg"
              alt="Zoghdan"
              width={100}
              height={100}
              className="object-contain"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
            <div className="space-y-2 pt-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{t.footer.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">+201002324488</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-medium mb-4 tracking-wider">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link href="/factory" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.factory}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-foreground font-medium mb-4 tracking-wider">{t.shop.allProducts}</h3>
            <ul className="space-y-3">
              {[t.shop.incense, t.shop.perfumes, t.shop.accessories].map((link) => (
                <li key={link}>
                  <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-medium mb-4 tracking-wider">{t.nav.contact}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.contact.title}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.cart}
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/201002324488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp {t.nav.contact}
                </a>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.cart.shipping}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 {t.hero.title}. {t.footer.allRightsReserved}.
          </p>
          <div className="flex gap-6">
            <a
              href="https://wa.me/201002324488"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
