"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Truck, ShieldCheck, MessageCircle } from "lucide-react"

interface HeroSectionProps {
  onNavigateToCatalog: () => void
}

export function HeroSection({ onNavigateToCatalog }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Image
            src="/images/logos/favicon.png"
            alt="DS Imports Logo"
            width={160}
            height={160}
            className="rounded-full border-2 border-primary/30 shadow-[var(--neon-glow)]"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-6xl"
        >
          DS <span className="text-primary neon-text">IMPORTS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mb-4 font-mono text-sm tracking-[0.3em] uppercase text-primary/80"
        >
          Flow in Tech
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mb-8 max-w-md text-base text-muted-foreground md:text-lg"
        >
          Acessorios tecnologicos premium com qualidade, estilo e confianca para voce.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNavigateToCatalog}
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[var(--neon-glow)] transition-all hover:shadow-[var(--neon-glow-strong)]"
        >
          Ver Catalogo
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </motion.div>

      {/* Benefits section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="relative z-10 mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 px-4 pb-8 md:grid-cols-3"
      >
        <BenefitCard
          icon={<Truck className="h-6 w-6 text-primary" />}
          title="Entrega Rapida"
          description="Receba seus produtos com agilidade e seguranca."
        />
        <BenefitCard
          icon={<ShieldCheck className="h-6 w-6 text-primary" />}
          title="Pagamento Seguro"
          description="Compre com tranquilidade e protecao total."
        />
        <BenefitCard
          icon={<MessageCircle className="h-6 w-6 text-primary" />}
          title="Atendimento via WhatsApp"
          description="Tire suas duvidas diretamente pelo WhatsApp."
        />
      </motion.div>
    </section>
  )
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[var(--neon-glow)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
