"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Zap, ArrowRight, ArrowLeft } from "lucide-react"

interface SwipePopupProps {
  open: boolean
  onClose: () => void
}

export function SwipePopup({ open, onClose }: SwipePopupProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-full max-w-sm rounded-2xl border border-primary/40 bg-card p-6 text-center neon-border"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-7 w-7 text-primary" />
              </div>
            </div>

            <h2 className="mb-2 text-xl font-bold text-foreground">
              Tecnologia que flui com voce
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Este site e movido por gestos:
            </p>

            <div className="mb-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  Deslize da direita para a esquerda para avancar
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <ArrowLeft className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  Deslize da esquerda para a direita para voltar
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-[var(--neon-glow)] active:scale-95"
            >
              Entendi
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
