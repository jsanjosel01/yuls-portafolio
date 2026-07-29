import React from "react"
import { useTranslation } from 'react-i18next'
import { Mail, ExternalLink, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

const GithubSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

interface ContactCardProps {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  color: string
}

function ContactCard({ href, icon, label, value, color }: ContactCardProps) {
  const isStatic = href === "#"

  const content = (
    <div
      className={cn(
        "group relative flex items-center gap-4 p-5 rounded-2xl border border-lilac-600/20 transition-all duration-300",
        !isStatic && "hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      )}
      style={{ backgroundColor: 'var(--surface)' }}
      onMouseEnter={e => {
        if (isStatic) return
        const el = e.currentTarget
        el.style.borderColor = color + '60'
        el.style.boxShadow = `0 8px 24px ${color}20`
      }}
      onMouseLeave={e => {
        if (isStatic) return
        const el = e.currentTarget
        el.style.borderColor = ''
        el.style.boxShadow = ''
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--fg-muted)' }}>
          {label}
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
          {value}
        </p>
      </div>

      {!isStatic && (
        <div className="text-lilac-500/50 group-hover:text-lilac-400 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </div>
      )}

      {!isStatic && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${color}10 50%, ${color}05 55%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )

  if (isStatic) return content

  return (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="block">
      {content}
    </a>
  )
}

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contacto" className="relative overflow-hidden px-6 py-28 shadow-[0_0_60px_rgba(139,92,246,0.05)_inset]" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilac-700/[0.06] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start">
          
          {/* Textos a la izquierda */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: 'var(--fg)' }}>
            {t('contact.title')} <br />
            <span className="text-gradient-lilac">{t('contact.titleHighlight')}</span>
          </h2>
          <div className="space-y-4 md:space-y-6 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-lg mx-auto md:mx-0 text-justify" style={{ color: 'var(--fg-muted)' }}>
            <p>
              {t('contact.p1')}
            </p>
            <p>
              {t('contact.p2')}
            </p>
          </div>
          
          <a
            href="https://buymeacoffee.com/jsanjosel"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105"
          >
            {/* Destello de luz */}
            <div className="shimmer-sweep pointer-events-none absolute inset-0 rounded-full" style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 55%, rgba(255,255,255,0.4) 60%, transparent 70%)' }} />
            
            <span className="relative z-10 flex items-center gap-2">
              <Coffee className="w-5 h-5 animate-[glow-pulse_3s_ease-in-out_infinite]" />
              {t('contact.coffee')}
            </span>
          </a>

        </div>

        {/* Tarjetas a la derecha */}
        <div className="flex-1 w-full max-w-md flex flex-col gap-4">
          <ContactCard
            href="mailto:juliasjl30@gmail.com"
            icon={<Mail className="w-6 h-6" />}
            label={t('contact.email')}
            value="juliasjl30@gmail.com"
            color="#00F5FF"
          />
          <ContactCard
            href="https://www.linkedin.com/in/jsanjosel/"
            icon={<LinkedinSvg className="w-6 h-6" />}
            label={t('contact.linkedin')}
            value="/in/jsanjosel"
            color="#0A66C2"
          />
          <ContactCard
            href="https://github.com/jsanjosel01"
            icon={<GithubSvg className="w-6 h-6" />}
            label={t('contact.github')}
            value="github.com/jsanjosel01"
            color="#a78bfa"
          />
        </div>
      </div>
    </section>
  )
}
