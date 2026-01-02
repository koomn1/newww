"use client"

import type React from "react"

import { useEffect } from "react"
import { useTranslation } from "@/lib/i18n"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { locale, dir, isRTL } = useTranslation()

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale)
    document.documentElement.setAttribute("dir", dir)

    if (isRTL) {
      document.body.classList.add("font-arabic")
      document.body.classList.remove("font-sans")
    } else {
      document.body.classList.add("font-sans")
      document.body.classList.remove("font-arabic")
    }
  }, [locale, dir, isRTL])

  return <>{children}</>
}
