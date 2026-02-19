"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Check } from "lucide-react"
import { useCart, type Product } from "@/lib/cart-context"
import { products } from "@/lib/products"

const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category)))]

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section className="flex min-h-screen flex-col px-4 pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Nosso <span className="text-primary neon-text">Catalogo</span>
          </h2>
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-primary" />
          <p className="text-muted-foreground">
            Escolha os melhores acessorios para seu dispositivo
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[var(--neon-glow)]"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[var(--neon-glow)]"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-primary/70">
          {product.category}
        </span>
        <h3 className="font-semibold text-foreground leading-tight">{product.name}</h3>
        <p className="flex-1 text-xs text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            onClick={handleAdd}
            disabled={added}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              added
                ? "bg-green-500/20 text-green-400"
                : "bg-primary text-primary-foreground hover:shadow-[var(--neon-glow)]"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Adicionado
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
