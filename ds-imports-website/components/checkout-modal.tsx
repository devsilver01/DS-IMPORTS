"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Smartphone, Banknote, Send } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

type PaymentMethod = "PIX" | "Debito" | "Credito"

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [name, setName] = useState("")
  const [payment, setPayment] = useState<PaymentMethod>("PIX")
  const [installments, setInstallments] = useState(1)

  const handleSubmit = () => {
    if (!name.trim()) return

    const productLines = items
      .map(
        (item) =>
          `${item.product.name} (${item.quantity}x) - R$ ${(
            item.product.price * item.quantity
          )
            .toFixed(2)
            .replace(".", ",")}`
      )
      .join("\n")

    let paymentText = payment
    if (payment === "Credito") {
      paymentText = `Credito ${installments}x`
    }

    const message = `Ola, gostaria de fazer um pedido na DS Imports:

🛍️ Pedido:
${productLines}

💰 Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}

💳 Forma de pagamento: ${paymentText}

👤 Nome: ${name}`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/5571988395268?text=${encoded}`, "_blank")
    clearCart()
    onClose()
    setName("")
    setPayment("PIX")
    setInstallments(1)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl neon-border"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Finalizar Pedido</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Name input */}
            <div className="mb-5">
              <label
                htmlFor="customer-name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Seu Nome
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Payment method */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Forma de Pagamento
              </label>
              <div className="grid grid-cols-3 gap-2">
                <PaymentOption
                  icon={<Smartphone className="h-5 w-5" />}
                  label="PIX"
                  selected={payment === "PIX"}
                  onClick={() => setPayment("PIX")}
                />
                <PaymentOption
                  icon={<Banknote className="h-5 w-5" />}
                  label="Debito"
                  selected={payment === "Debito"}
                  onClick={() => setPayment("Debito")}
                />
                <PaymentOption
                  icon={<CreditCard className="h-5 w-5" />}
                  label="Credito"
                  selected={payment === "Credito"}
                  onClick={() => setPayment("Credito")}
                />
              </div>
            </div>

            {/* Installments */}
            <AnimatePresence>
              {payment === "Credito" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 overflow-hidden"
                >
                  <label
                    htmlFor="installments"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Parcelas
                  </label>
                  <select
                    id="installments"
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}x de R${" "}
                        {(totalPrice / n).toFixed(2).replace(".", ",")}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary */}
            <div className="mb-5 rounded-xl bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total do pedido:</span>
                <span className="text-xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-all hover:shadow-[var(--neon-glow)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              Enviar Pedido via WhatsApp
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PaymentOption({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary/10 text-primary shadow-[var(--neon-glow)]"
          : "border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
