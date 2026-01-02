"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const message = formData.get("message")

    const whatsappMessage = `
🔔 *NEW INQUIRY FROM WEBSITE*

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}

💬 Message:
${message}
    `.trim()

    const whatsappUrl = `https://wa.me/201002324488?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")

    // Reset form
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">Get In Touch</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light leading-tight text-balance">
                Experience <span className="text-primary">Zoghdan</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Visit our factory to discover the full range of our exclusive fragrances, or reach out to our expert
                team for personalized recommendations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">
                    Motubas Center
                    <br />
                    Kafr El-Sheikh, Egypt
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Call or WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">
                    +201002324488
                    <br />
                    Available daily
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">
                    info@zoghdan.com
                    <br />
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card border border-border p-8 lg:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-muted-foreground tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted-foreground tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-muted-foreground tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="+20 XXX XXX XXXX"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-muted-foreground tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your fragrance preferences..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 tracking-wider"
              >
                Send Inquiry via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
