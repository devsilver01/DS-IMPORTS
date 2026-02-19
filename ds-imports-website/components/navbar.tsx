"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, Home, Info, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface NavbarProps {
  currentPage: number
  onNavigate: (page: number) => void
  onOpenCart: () => void
}

const navItems = [
  { label: "Inicio", icon: Home, page: 0 },
  { label: "Sobre", icon: Info, page: 1 },
  { label: "Catalogo", icon: ShoppingBag, page: 2 },
]

export function Navbar({ currentPage, onNavigate, onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button
          onClick={() => onNavigate(0)}
          className="flex items-center gap-2"
          aria-label="DS Imports Home"
        >
          <Image
            src="/images/logos/favicon.png"
            alt="DS Imports Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-lg font-bold text-foreground">
            DS <span className="text-primary neon-text">IMPORTS</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                currentPage === item.page
                  ? "bg-primary/10 text-primary neon-text"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="relative rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page)
                    setMobileOpen(false)
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    currentPage === item.page
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
