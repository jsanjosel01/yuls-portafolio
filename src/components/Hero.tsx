import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { Download, Mail, ArrowDown, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CloudsSeparator from "@/components/CloudsSeparator"

// Efecto de escritura (typewriter)
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      // Escribiendo
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      // Pausa antes de borrar
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      // Borrando (más rápido)
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2.5)
    } else if (deleting && charIndex === 0) {
      // Pasa a la siguiente palabra
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return displayed
}


export default function Hero() {
  const { t } = useTranslation()
  const ROLES = [t('hero.role')]
  const typedText = useTypewriter(ROLES)
  // Añadimos este estado para el móvil:
  const [isExpanded, setIsExpanded] = useState(false) 
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)

  // Escucha el evento del navbar (logo Yuls) para cerrar el modal
  useEffect(() => {
    const handler = () => setIsCvModalOpen(false)
    window.addEventListener('close-cv-modal', handler)
    return () => window.removeEventListener('close-cv-modal', handler)
  }, [])

  const handleCvClick = () => {
    // En móvil los iframes no renderizan PDFs — abrimos en nueva pestaña directamente
    if (window.innerWidth < 1024) {
      window.open('/cv.pdf', '_blank')
    } else {
      setIsCvModalOpen(true)
    }
  }

  return (

    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20"
      style={{ backgroundColor: "var(--bg)" }}
    >

      {/* Esferas de luz decorativas */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] animate-float rounded-full bg-gradient-to-br from-lilac-600/20 via-amethyst-500/15 to-lilac-400/10 blur-[120px]"/>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] animate-float rounded-full bg-gradient-to-tr from-amethyst-600/15 via-lilac-500/10 to-lavender-400/5 blur-[100px]"
        style={{ animationDelay: "3s" }}
      />

      {/* Contenedor principal a 2 columnas */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* COLUMNA IZQUIERDA: Textos y botones */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start">

          {/* Bloque saludo + nombre + rol */}
          <div className="space-y-1">
            <p className="opacity-0 text-sm sm:text-base font-medium tracking-widest uppercase transition-opacity duration-700"
              style={{
                animationDelay: "0.1s",
                animation: "fade-in-up 0.7s ease-out 0.1s forwards",
                color: "var(--fg)",
              }}
            >
              {t('hero.greeting')}
            </p>
            <h1
              className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-gradient-lilac">Julia San José</span>
            </h1>
            <h2
              className="animate-fade-in-up text-sm sm:text-base md:text-lg font-semibold opacity-0 tracking-widest min-h-[2rem] flex items-center justify-center lg:justify-start gap-1"
              style={{ animationDelay: "0.3s", color: "var(--fg)" }}
            >
              <span>{typedText}</span>
              <span
                className="inline-block w-0.5 h-5 bg-lilac-400 rounded-full"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </h2>
          </div>

          {/* IMAGEN EN MÓVIL (Oculta en escritorio) */}
          <div
            className="lg:hidden flex justify-center items-center relative animate-fade-in-up opacity-0 w-full mt-4 mb-12"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-lilac-600/30 via-amethyst-500/20 to-transparent rounded-full blur-3xl scale-90 -z-10 animate-pulse" />
            <div className="relative group max-w-[260px] sm:max-w-[330px] w-full">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-lilac-500 via-amethyst-500 to-lavender-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-500" />
              <div
                className="relative rounded-[2.3rem] overflow-hidden border border-lilac-500/30 shadow-2xl aspect-square flex items-center justify-center"
                style={{ backgroundColor: "var(--surface)" }}
              >
                <img
                  src="/profile.jpg"
                  alt={t('hero.imgAlt')}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Badge flotante */}
              <div className="absolute -bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lilac-500/40 bg-black/60 backdrop-blur-md text-lilac-300 text-xs font-bold tracking-wide shadow-[0_4px_20px_rgba(139,92,246,0.25)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lilac-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lilac-400" />
                  </span>
                  {t('hero.openToWork')}
                </span>
              </div>
            </div> 
          </div>


          {/* Descripción con botón Leer más en móvil */}
          <div className="animate-fade-in-up w-full max-w-xl opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards", color: "var(--fg-muted)" }}
          >
            <div 
              className="space-y-4 text-base sm:text-lg leading-relaxed font-normal max-w-2xl text-justify mx-auto lg:mx-0" 
              style={{ color: 'var(--fg)' }}
            >
              <p>
                {t('hero.p1')}
              </p>
              <p className={`sm:block ${isExpanded ? "block" : "hidden"}`}>
                {t('hero.p2')}
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm font-semibold text-lilac-400 hover:text-lilac-300 sm:hidden transition-colors flex items-center justify-start w-full cursor-pointer"
            >
              {isExpanded ? t('hero.readLess') : t('hero.readMore')}
            </button>
          </div>

          {/* Botones CTA */}
          <div className="animate-fade-in-up pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <button
              onClick={handleCvClick}
              className={cn(
                buttonVariants({ size: "default" }),
                "group h-10 w-40 sm:h-12 sm:w-48 text-sm sm:text-base rounded-full font-semibold shadow-md shadow-lilac-600/10 hover:shadow-lg hover:shadow-lilac-600/20 hover:scale-105 transition-all duration-300 border-2 border-transparent flex items-center justify-center"
              )}
            >
              <Download className="mr-2 size-4 sm:size-5 transition-transform group-hover:-translate-y-0.5" />
              {t('hero.downloadCV')}
            </button>

            <a
              href="#contacto"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "h-10 w-40 sm:h-12 sm:w-48 text-sm sm:text-base rounded-full font-semibold border-2 border-lilac-600 dark:border-lilac-500/50 text-lilac-600 dark:text-lilac-300 hover:bg-lilac-500/15 hover:border-lilac-700 dark:hover:border-lilac-400 hover:scale-105 transition-all duration-300 flex items-center justify-center"
              )}
            >
              <Mail className="mr-2 size-4 sm:size-5 text-lilac-600 dark:text-lilac-300" />
              {t('hero.contactBtn')}
            </a>
          </div>

          {/* Enlace a proyectos */}
          <div className="animate-fade-in-up pt-1 opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <a
              href="#proyectos"
              className="inline-flex items-center gap-1.5 text-base font-medium text-lilac-600 dark:text-lilac-300 hover:text-lilac-700 dark:hover:text-lilac-200 no-underline transition-colors"
            >
              <span>{t('hero.viewProjects')}</span>
              <ArrowDown className="h-4.5 w-4.5 animate-bounce text-lilac-600 dark:text-lilac-300" />
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA: IMAGEN EN ESCRITORIO (Oculta en móvil) */}
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center relative animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-lilac-600/30 via-amethyst-500/20 to-transparent rounded-full blur-3xl scale-90 -z-10 animate-pulse" />
          <div className="relative group lg:max-w-[380px] w-full">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-lilac-500 via-amethyst-500 to-lavender-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-500" />
            <div
              className="relative rounded-[2.3rem] overflow-hidden border border-lilac-500/30 shadow-2xl aspect-square flex items-center justify-center"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <img
                src="/profile.jpg"
                alt={t('hero.imgAlt')}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            
            {/* Badge flotante */}
            <div className="absolute -bottom-5 left-0 right-0 flex justify-center z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-lilac-500/40 bg-black/60 backdrop-blur-md text-lilac-300 text-sm font-bold tracking-wide shadow-[0_4px_24px_rgba(139,92,246,0.25)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lilac-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lilac-400" />
                </span>
                {t('hero.openToWork')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nubes separadoras */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <CloudsSeparator fillColor="var(--cloud-fill-about)" />
      </div>

      {/* Cursor parpadeante keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Modal del CV */}
      {isCvModalOpen && (
        /* Fondo oscuro — clic fuera cierra */
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 pb-4 sm:px-8 sm:pb-8 animate-fade-in"
          onClick={() => setIsCvModalOpen(false)}
        >
          {/* Ventana del modal */}
          <div
            className="relative w-full max-w-3xl h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Barra superior con título y botones */}
            <div className="shrink-0 bg-zinc-900 border-b border-zinc-700 px-5 py-3 flex items-center justify-between">
              <span className="text-white text-sm font-semibold opacity-70 tracking-wide">Curriculum Vitae</span>
              <div className="flex items-center gap-2">
                <a
                  href="/cv.pdf"
                  download="Julia_Yuls_CV.pdf"
                  className="flex items-center gap-2 px-4 py-1.5 bg-lilac-600 hover:bg-lilac-500 text-white text-sm font-semibold rounded-full transition-colors"
                >
                  <Download className="h-4 w-4" />
                  {t('hero.cvDownload')}
                </a>
                <button
                  onClick={() => setIsCvModalOpen(false)}
                  className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-200 text-gray-900 rounded-full transition-colors cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Visor PDF */}
            <div className="flex-1 bg-white overflow-hidden">
              <iframe
                src="/cv.pdf#toolbar=0&scrollbar=1"
                className="w-full h-full border-none"
                title="CV PDF"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
