import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import { Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import CloudsSeparator from "@/components/CloudsSeparator"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const GithubSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
}

export default function Projects() {
  const { t } = useTranslation()
  const [isLineVisible, setIsLineVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const projects: Project[] = [
    {
      title: t('projects.items.vanlife.title'),
      description: t('projects.items.vanlife.description'),
      tags: ['React', 'Supabase', 'Leaflet', 'Tailwind'],
      github: 'https://github.com/jsanjosel01/VanLife',
      demo: 'https://van-life-rho.vercel.app/',
      image: '/vanlife.png'
    },
    {
      title: t('projects.items.app.title'),
      description: t('projects.items.app.description'),
      tags: ['React', 'Supabase', 'Tailwind', 'i18next'],
      github: 'https://github.com/Aherreras98/EntrenaTU',
      demo: 'https://entrena-tu.vercel.app/',
      image: '/entrenatu.png'
    },
    {
      title: t('projects.items.landing.title'),
      description: t('projects.items.landing.description'),
      tags: ['React', 'Three.js', 'Tailwind', 'Vite'],
      github: 'https://github.com/jsanjosel01/Landing',
      demo: 'https://landing-zeta-opal.vercel.app/',
      image: '/landing.png'
    },
    {
      title: t('projects.items.animations.title'),
      description: t('projects.items.animations.description'),
      tags: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/jsanjosel01/animaciones',
      demo: 'https://jsanjosel01.github.io/animaciones/',
      image: '/animaciones.png'
    },
    {
      title: t('projects.items.gasolineras.title'),
      description: t('projects.items.gasolineras.description'),
      tags: ['JavaScript', 'HTML5', 'CSS3'],
      github: 'https://github.com/jsanjosel01/gasolineraApi',
      demo: 'https://jsanjosel01.github.io/gasolineraApi/',
      image: '/gasolineras.png'
    },
    {
      title: t('projects.items.kanban.title'),
      description: t('projects.items.kanban.description'),
      tags: ['JavaScript', 'Drag & Drop', 'CSS3'],
      github: 'https://github.com/jsanjosel01/tableroKanban',
      demo: 'https://jsanjosel01.github.io/tableroKanban/',
      image: '/kanban.png'
    }
  ]

  // Paginación: 3 proyectos por página
  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  
  const currentProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

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
      id="proyectos"
      className="relative py-28 px-6 pb-36 overflow-hidden border-y border-lilac-500/25 shadow-[0_0_60px_rgba(139,92,246,0.07)_inset]"
      style={{ backgroundColor: 'var(--surface-alt)' }}
    >
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lilac-700/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Cabecera alineada a la izquierda */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight" style={{ color: 'var(--fg)' }}>
            {t('projects.title')}
          </h2>
          <div
            className={`mt-4 h-1.5 bg-gradient-to-r from-lilac-500 via-amethyst-500 to-transparent rounded-full transition-all duration-1000 ease-out ${
              isLineVisible ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>

        {/* Contenedor del Grid Original */}
        <div ref={scrollRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {currentProjects.map((project) => (
            <Card
              key={project.title}
              className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-lilac-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              {/* Imagen o placeholder */}
              {project.image ? (
                <a href={project.demo || "#"} target={project.demo ? "_blank" : undefined} rel={project.demo ? "noopener noreferrer" : undefined} className="relative flex h-48 items-center justify-center overflow-hidden block">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
              ) : (
                <a href={project.demo || "#"} target={project.demo ? "_blank" : undefined} rel={project.demo ? "noopener noreferrer" : undefined} className="relative flex h-48 items-center justify-center bg-gradient-to-br from-lilac-800/40 via-lilac-700/25 to-amethyst-600/30 block">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,109,255,0.12),transparent_70%)]" />
                  <Code className="relative h-12 w-12 text-lilac-400/60 transition-colors duration-300 group-hover:text-lilac-300" />
                </a>
              )}

              <CardHeader className="pb-1 pt-3 px-4">
                <CardTitle className="text-base font-bold" style={{ color: 'var(--fg)' }}>{project.title}</CardTitle>
                <CardDescription className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pt-3 px-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="gap-2 pt-3 px-4 border-t border-lilac-600/10">
                <a
                  href={project.demo || "#"}
                  target={project.demo ? "_blank" : undefined}
                  rel={project.demo ? "noopener noreferrer" : undefined}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <ExternalLink className="mr-1 h-3.5 w-3.5" />
                  {t('projects.liveDemo')}
                </a>
                <a
                  href={project.github || "#"}
                  target={project.github ? "_blank" : undefined}
                  rel={project.github ? "noopener noreferrer" : undefined}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  <GithubSvg className="mr-1 h-3.5 w-3.5" />
                  {t('projects.github')}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Paginación con flechas */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button 
              onClick={prevPage}
              className="p-3 rounded-full bg-white/5 hover:bg-lilac-500/20 text-lilac-600 dark:text-lilac-400 border border-lilac-500/20 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-110"
              aria-label="Ver anteriores"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-sm font-medium text-lilac-600/70 dark:text-lilac-300/70">
              {currentPage + 1} / {totalPages}
            </div>
            <button 
              onClick={nextPage}
              className="p-3 rounded-full bg-white/5 hover:bg-lilac-500/20 text-lilac-600 dark:text-lilac-400 border border-lilac-500/20 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-110"
              aria-label="Ver siguientes"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Nubes de transición hacia Contacto */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <CloudsSeparator fillColor="var(--cloud-fill-next)" accentColor="rgba(168, 85, 247, 0.15)" />
      </div>
    </section>
  )
}
