import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { Coffee, Heart, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LegalModal, { type LegalType } from "@/components/LegalModal"

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

const InstagramSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const CodepenSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
    <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
    <line x1="12" y1="2" x2="12" y2="8.5"></line>
  </svg>
)

export default function Footer() {
  const { t } = useTranslation()
  const [legalOpen, setLegalOpen] = useState<LegalType | null>(null)

  const legalLinks = [
    { key: 'privacy' as LegalType, label: t('footer.privacy') },
    { key: 'legal' as LegalType,   label: t('footer.legal') },
    { key: 'cookies' as LegalType, label: t('footer.cookies') },
  ]

  return (
    <>
    <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />
    <footer className="border-t border-lilac-600/10 px-6 py-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
        
        {/* Fila única: copyright | legales | iconos */}
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-2" style={{ color: 'var(--fg-muted)' }}>

          {/* Izquierda: copyright */}
          <span className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap">
            © {new Date().getFullYear()} Yuls · {t('footer.copyright')}{" "}
            <Heart className="w-3 h-3 text-lilac-400 fill-lilac-400 animate-pulse" />{" "}
            
          </span>


          {/* Centro: enlaces legales */}
          <span className="flex items-center gap-2 text-sm">
            {legalLinks.map(({ key, label }, i, arr) => (
              <span key={key} className="flex items-center gap-2">
                <button
                  onClick={() => setLegalOpen(key)}
                  className="hover:text-lilac-400 transition-colors duration-200 cursor-pointer"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {label}
                </button>
                {i < arr.length - 1 && (
                  <span className="text-lilac-600/30">·</span>
                )}
              </span>
            ))}
          </span>

          {/* Derecha: iconos sociales pequeños */}
          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/jsanjosel/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-lilac-600/25 text-lilac-400/60 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:shadow-[0_0_12px_rgba(10,102,194,0.2)] transition-all duration-300">
              <LinkedinSvg className="w-3.5 h-3.5" />
            </a>
            <a href="https://github.com/jsanjosel01" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-lilac-600/25 text-lilac-400/60 hover:text-[#a78bfa] hover:border-[#a78bfa]/50 hover:shadow-[0_0_12px_rgba(167,139,250,0.2)] transition-all duration-300">
              <GithubSvg className="w-3.5 h-3.5" />
            </a>
            <a href="https://buymeacoffee.com/jsanjosel" target="_blank" rel="noopener noreferrer" aria-label="Café"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-lilac-600/25 text-lilac-400/60 hover:text-orange-400 hover:border-orange-400/50 hover:shadow-[0_0_12px_rgba(251,146,60,0.2)] transition-all duration-300">
              <Coffee className="w-3.5 h-3.5" />
            </a>
            {/* Separador — solo móvil */}
            <span className="w-px h-4 bg-lilac-600/20 mx-1 sm:hidden" />
            {/* Botón volver arriba — solo móvil */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={t('footer.scrollTop')}
              className="sm:hidden w-7 h-7 flex items-center justify-center rounded-full border border-lilac-500/40 text-lilac-400 hover:text-lilac-300 hover:border-lilac-400/60 hover:bg-lilac-500/15 hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
    </>
  )
}
