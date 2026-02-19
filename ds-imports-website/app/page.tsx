"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { SwipePopup } from "@/components/swipe-popup"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CatalogSection } from "@/components/catalog-section"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutModal } from "@/components/checkout-modal"
import { FloatingButtons } from "@/components/floating-buttons"
import { Footer } from "@/components/footer"

const pages = [
  { key: "home", component: HeroSection },
  { key: "about", component: AboutSection },
  { key: "catalog", component: CatalogSection },
]

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showPopup, setShowPopup] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const isSwipingRef = useRef(false)

  const navigateTo = useCallback(
    (page: number) => {
      if (page === currentPage || page < 0 || page >= pages.length) return
      setDirection(page > currentPage ? 1 : -1)
      setCurrentPage(page)
    },
    [currentPage]
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    isSwipingRef.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    // Only count as horizontal swipe if horizontal movement dominates
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      isSwipingRef.current = true
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || !isSwipingRef.current) {
        touchStartRef.current = null
        return
      }

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x

      if (Math.abs(deltaX) > 60) {
        if (deltaX < 0) {
          // Swipe left -> next page
          navigateTo(Math.min(currentPage + 1, pages.length - 1))
        } else {
          // Swipe right -> previous page
          navigateTo(Math.max(currentPage - 1, 0))
        }
      }

      touchStartRef.current = null
      isSwipingRef.current = false
    },
    [currentPage, navigateTo]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        navigateTo(Math.min(currentPage + 1, pages.length - 1))
      } else if (e.key === "ArrowLeft") {
        navigateTo(Math.max(currentPage - 1, 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, navigateTo])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SwipePopup open={showPopup} onClose={() => setShowPopup(false)} />

      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenCart={() => setCartOpen(true)}
      />

      <main
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-screen"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {currentPage === 0 && (
              <div>
                <HeroSection onNavigateToCatalog={() => navigateTo(2)} />
                <Footer />
              </div>
            )}
            {currentPage === 1 && (
              <div>
                <AboutSection />
                <Footer />
              </div>
            )}
            {currentPage === 2 && (
              <div>
                <CatalogSection />
                <Footer />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Page indicators */}
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentPage
                ? "w-8 bg-primary shadow-[var(--neon-glow)]"
                : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Pagina ${i + 1}`}
          />
        ))}
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      <FloatingButtons />
    </div>
  )
}

export default function Page() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
