import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import CloudsSeparator from "@/components/CloudsSeparator"

interface Skill {
  name: string
  color: string
  icon: string // Simple Icons slug para CDN
}

const CATEGORIES: { label: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML5",        color: "#E34F26", icon: "html5"       },
      { name: "CSS3",         color: "#1572B6", icon: "css3"        },
      { name: "JavaScript",   color: "#F7DF1E", icon: "javascript"  },
      { name: "React",        color: "#61DAFB", icon: "react"       },
      { name: "TypeScript",   color: "#3178C6", icon: "typescript"  },
      { name: "Tailwind CSS", color: "#06B6D4", icon: "tailwindcss" },
      { name: "Bootstrap",    color: "#7952B3", icon: "bootstrap"   },
    ],
  },
  {
    label: "Backend & DB",
    skills: [
      { name: "Java",     color: "#ED8B00", icon: "openjdk"   },
      { name: "Python",   color: "#3776AB", icon: "python"    },
      { name: "PHP",      color: "#9B6DBE", icon: "php"       },
      { name: "MySQL",    color: "#4479A1", icon: "mysql"     },
      { name: "Oracle",   color: "#F80000", icon: "oracle"    },
      { name: "Supabase", color: "#3ECF8E", icon: "supabase"  },
      { name: "Firebird", color: "#FF6600", icon: "firefoxbrowser" }, // icono aproximado
    ],
  },
  {
    label: "Herramientas",
    skills: [
      { name: "Git",    color: "#F05032", icon: "git"    },
      { name: "GitHub", color: "#a78bfa", icon: "github" },
      { name: "Vercel", color: "#c4b5fd", icon: "vercel" },
      { name: "Docker", color: "#2496ED", icon: "docker" },
      { name: "Ubuntu", color: "#E95420", icon: "ubuntu" },
    ],
  },
  {
    label: "Diseño e Imagen",
    skills: [
      { name: "Figma",      color: "#F24E1E", icon: "figma"          },
      { name: "Excalidraw", color: "#6965DB", icon: "excalidraw"     },
      { name: "Draw.io",    color: "#F08705", icon: "diagramsdotnet" },
      { name: "Photoshop",  color: "#31A8FF", icon: "adobephotoshop" },
    ],
  },
]

function SkillCard({ skill, index, visible }: { skill: Skill; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)
  const iconUrl = `https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace("#", "")}`

  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-default select-none"
      style={{
        backgroundColor: hovered
          ? `color-mix(in srgb, var(--surface) 85%, ${skill.color})`
          : 'var(--surface)',
        borderColor: hovered ? `${skill.color}70` : undefined,
        boxShadow: hovered ? `0 8px 28px ${skill.color}25, 0 0 0 1px ${skill.color}30` : undefined,
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? 'translateY(-4px)' : 'translateY(0)')
          : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 55}ms, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow de fondo al hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${skill.color}18 0%, transparent 70%)`,
        }}
      />

      {/* Icono */}
      <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <img
          src={iconUrl}
          alt={skill.name}
          className="w-9 h-9 object-contain"
          loading="lazy"
          onError={(e) => {
            // Fallback: letra inicial con color de marca
            const target = e.currentTarget
            target.style.display = 'none'
            const parent = target.parentElement!
            parent.innerHTML = `<span style="font-size:1.4rem;font-weight:900;color:${skill.color};font-family:monospace">${skill.name.slice(0,2).toUpperCase()}</span>`
          }}
        />
      </div>

      {/* Nombre */}
      <span
        className="text-xs font-semibold text-center leading-tight transition-colors duration-300"
        style={{ color: hovered ? skill.color : 'var(--fg-muted)' }}
      >
        {skill.name}
      </span>
    </div>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [lineVisible, setLineVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setLineVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  let globalIndex = 0

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      className="relative py-28 pb-36 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Glow decorativo de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-10 h-[400px] w-[400px] rounded-full bg-lilac-700/8 blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[300px] w-[300px] rounded-full bg-amethyst-600/8 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Cabecera */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight" style={{ color: 'var(--fg)' }}>
            {t('skills.title')}
          </h2>
          <div
            className={`mt-4 h-1.5 bg-gradient-to-r from-lilac-500 via-amethyst-500 to-transparent rounded-full transition-all duration-1000 ease-out ${
              lineVisible ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>

        {/* Categorías */}
        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              {/* Etiqueta de categoría */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-lilac-400 bg-lilac-500/10 border border-lilac-500/25 px-3 py-1.5 rounded-full">
                  {cat.label === 'Frontend' ? t('skills.categories.frontend') : 
                   cat.label === 'Backend & DB' ? t('skills.categories.backend') : 
                   cat.label === 'Diseño e Imagen' ? t('skills.categories.design') :
                   t('skills.categories.tools')}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-lilac-500/30 to-transparent" />
              </div>

              {/* Grid de tarjetas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 max-w-xs mx-auto sm:max-w-none">
                {cat.skills.map((skill) => {
                  const idx = globalIndex++
                  return (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={idx}
                      visible={visible}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nubes de transición hacia Proyectos */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <CloudsSeparator fillColor="var(--cloud-fill-about)" accentColor="rgba(168, 85, 247, 0.15)" />
      </div>
    </section>
  )
}
