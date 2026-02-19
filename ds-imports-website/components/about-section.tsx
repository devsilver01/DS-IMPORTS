"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, MessageCircle } from "lucide-react"

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Sobre a <span className="text-primary neon-text">DS Imports</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            A DS Imports nasceu com o proposito de oferecer acessorios tecnologicos com qualidade, estilo e confianca. 
            Acreditamos que cada detalhe conta quando se trata de proteger e potencializar seus dispositivos. 
            Trabalhamos com produtos selecionados que unem design moderno, durabilidade e preco justo, 
            garantindo a melhor experiencia para nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div variants={itemVariants}>
            <ValueCard
              icon={<Target className="h-7 w-7 text-primary" />}
              title="Missao"
              description="Oferecer acessorios tecnologicos de alta qualidade com atendimento personalizado, tornando a tecnologia acessivel e confiavel para todos."
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ValueCard
              icon={<Eye className="h-7 w-7 text-primary" />}
              title="Visao"
              description="Ser referencia em acessorios tecnologicos, reconhecida pela qualidade dos produtos, inovacao constante e satisfacao dos clientes."
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ValueCard
              icon={<Heart className="h-7 w-7 text-primary" />}
              title="Valores"
              description="Qualidade, transparencia, compromisso com o cliente, inovacao e responsabilidade em cada produto que entregamos."
            />
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-card/50 p-8 text-center backdrop-blur-sm"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Fale Conosco</h3>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Precisa de ajuda ou tem alguma duvida? Nossa equipe esta pronta para atender voce pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5571988395268"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-[var(--neon-glow)] active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Chamar no WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[var(--neon-glow)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
