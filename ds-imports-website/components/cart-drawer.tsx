"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border/50 bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Carrinho
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                aria-label="Fechar carrinho"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">Seu carrinho esta vazio</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <h4 className="text-sm font-semibold text-foreground leading-tight">
                          {item.product.name}
                        </h4>
                        <span className="text-sm text-primary font-medium">
                          R$ {item.product.price.toFixed(2).replace(".", ",")}
                        </span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-foreground transition-all hover:bg-muted/80"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-foreground transition-all hover:bg-muted/80"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-foreground">
                              R${" "}
                              {(item.product.price * item.quantity)
                                .toFixed(2)
                                .replace(".", ",")}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-destructive transition-all hover:bg-destructive/10"
                              aria-label="Remover produto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border/50 px-6 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-all hover:shadow-[var(--neon-glow)] active:scale-[0.98]"
                >
                  Finalizar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
