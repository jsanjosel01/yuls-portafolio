import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import { Briefcase, Palette, Terminal, Users, Heart, Lightbulb } from "lucide-react"
import CloudsSeparator from "@/components/CloudsSeparator"

interface BentoCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
  className?: string
  glowColor?: string
}

function BentoCard({ icon, title, subtitle, children, className = "", glowColor = "from-lilac-500/20" }: BentoCardProps) {
  return (
    <div
      className={`group relative border border-lilac-600/20 rounded-3xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-lilac-500/15 hover:border-lilac-400/50 overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--bento-card-bg)' }}
    >
      {/* Glow de esquina */}
      <div className={`pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${glowColor} to-transparent blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-lilac-600/15 border border-lilac-500/30 text-lilac-400 group-hover:bg-lilac-600/25 transition-colors duration-300">
              {icon}
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-lilac-400/80 bg-lilac-500/10 px-3 py-1 rounded-full border border-lilac-500/20">
              {subtitle}
            </span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-lilac-200 transition-colors" style={{ color: 'var(--fg)' }}>
            {title}
          </h3>
        </div>
        <div className="text-sm sm:text-base leading-relaxed font-normal flex-1 mt-1.5" style={{ color: 'var(--fg)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const [isLineVisible, setIsLineVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsLineVisible(true)
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="relative py-28 overflow-hidden border-y border-lilac-500/25"
      style={{ backgroundColor: 'var(--surface-alt)' }}
    >
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-10 h-[500px] w-[500px] rounded-full bg-lilac-700/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-amethyst-600/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Cabecera alineada a la izquierda con la imagen */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight" style={{ color: 'var(--fg)' }}>
            {t('about.title')} <span className="text-gradient-lilac">{t('about.titleHighlight')}</span>
          </h2>
          <div
            className={`mt-4 h-1.5 bg-gradient-to-r from-lilac-500 via-amethyst-500 to-transparent rounded-full transition-all duration-1000 ease-out ${
              isLineVisible ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>

        {/* Imagen izquierda — Texto derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">

          {/* Imagen izquierda */}
          <div className="lg:col-span-5 flex justify-center items-center relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-amethyst-500/30 via-lilac-600/20 to-transparent rounded-full blur-3xl scale-95 -z-10 animate-pulse" />

            <div className="relative group max-w-[270px] sm:max-w-[340px] lg:max-w-[390px] w-full">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-lilac-600 via-amethyst-500 to-lavender-400 -rotate-3 scale-[1.03] opacity-40 group-hover:-rotate-6 group-hover:opacity-70 transition duration-500 -z-10 blur-[2px]" />

              <div
                className="relative rounded-[2.3rem] overflow-hidden border-2 border-lilac-400/50 shadow-2xl aspect-[4/5]"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <img
                  src="/about-profile.jpg"
                  alt="Yuls - Sobre mí"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Tarjeta flotante con efecto shimmer */}
                <div
                  className="floating-card absolute bottom-6 left-6 right-6 backdrop-blur-md border border-lilac-500/50 rounded-2xl p-4 shadow-2xl overflow-hidden"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--bento-card-bg) 95%, transparent)' }}
                >
                  {/* Destello de luz que cruza la tarjeta */}
                  <div className="shimmer-sweep pointer-events-none absolute inset-0 rounded-2xl" />

                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lilac-500/25 border border-lilac-500/40 flex items-center justify-center shrink-0">
                      <Palette className="w-5 h-5 text-lilac-300 animate-[glow-pulse_3s_ease-in-out_infinite]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{t('about.floatingCard.title')}</h4>
                      <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{t('about.floatingCard.subtitle')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Texto derecha */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
                <span className="text-gradient-lilac">Julia San José</span>
              </h3>
              <p className="text-base sm:text-lg font-semibold" style={{ color: 'var(--fg)' }}>
                {t('about.role')}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed font-normal text-justify" style={{ color: 'var(--fg)' }}>
              <p>
                {t('about.p1').split('<highlight>')[0]}
                <span className="text-lilac-600 dark:text-lilac-300 font-medium">{t('about.p1').split('<highlight>')[1]?.split('</highlight>')[0]}</span>
                {t('about.p1').split('</highlight>')[1]}
              </p>
              <p className={`sm:block ${isExpanded ? "block" : "hidden"}`}>
                {t('about.p2')}
              </p>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm font-semibold text-lilac-500 hover:text-lilac-400 sm:hidden transition-colors flex items-center justify-start w-full -mt-2 cursor-pointer"
              >
                {isExpanded ? t('about.readLess') : t('about.readMore')}
              </button>
            </div>

            {/* 3 Highlights visuales rápidos para escaneo de reclutadores */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2 items-center">
              {[
                { icon: <Users className="w-4 h-4 text-lilac-300 shrink-0" />, label: t('about.highlights.teamwork') },
                { icon: <Lightbulb className="w-4 h-4 text-lilac-300 shrink-0" />, label: t('about.highlights.proactive') },
                { icon: <Heart className="w-4 h-4 text-lilac-300 shrink-0" />, label: t('about.highlights.communication') },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex w-full sm:flex-1 items-center justify-center gap-2 p-2.5 rounded-xl border border-lilac-500/25 shadow-sm hover:border-lilac-400/50 hover:-translate-y-0.5 transition-all group/item"
                  style={{ backgroundColor: 'var(--surface)' }}
                >
                  <div className="w-6 h-6 rounded-lg bg-lilac-500/15 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    {icon}
                  </div>
                  <span className="text-xs font-semibold leading-tight" style={{ color: 'var(--fg)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjetas Bento alineadas simétricamente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-12 border-t border-lilac-500/25 items-stretch">
          <BentoCard icon={<Terminal className="w-6 h-6" />} subtitle={t('about.bento.fullstack.subtitle')} title={t('about.bento.fullstack.title')} glowColor="from-lilac-500/30">
            {t('about.bento.fullstack.description')}
          </BentoCard>
          <BentoCard icon={<Palette className="w-6 h-6" />} subtitle={t('about.bento.visual.subtitle')} title={t('about.bento.visual.title')} glowColor="from-amethyst-500/30">
            {t('about.bento.visual.description')}
          </BentoCard>
          <BentoCard icon={<Briefcase className="w-6 h-6" />} subtitle={t('about.bento.learning.subtitle')} title={t('about.bento.learning.title')} glowColor="from-green-500/20">
            {t('about.bento.learning.description')}
          </BentoCard>
        </div>
      </div>

      {/* Marquesina infinita de habilidades (como puente hacia la sección Habilidades) */}
      <div className="relative mt-20 mb-8 border-y border-lilac-500/10 bg-lilac-500/5 py-3 overflow-hidden flex items-center z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--surface-alt)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--surface-alt)] to-transparent z-10 pointer-events-none" />
        
        <div className="marquee-track flex gap-10 px-4">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Bootstrap", "Java", "Python", "PHP", "MySQL", "Oracle", "Supabase", "Firebird", "Git", "GitHub", "Vercel", "Docker", "Ubuntu"].map((skill, j) => (
                <div key={j} className="flex items-center gap-10 whitespace-nowrap">
                  <span className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px var(--fg-muted)' }}>
                    {skill}
                  </span>
                  <span className="text-[10px] text-lilac-400/20">•</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Nubes separadoras */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <CloudsSeparator fillColor="var(--cloud-fill-next)" accentColor="rgba(168, 85, 247, 0.15)" />
      </div>
    </section>
  )
}
