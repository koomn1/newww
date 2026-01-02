import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CollectionSection } from "@/components/collection-section"
import { AboutSection } from "@/components/about-section"
import { HeritageSection } from "@/components/heritage-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CollectionSection />
      <AboutSection />
      <HeritageSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
