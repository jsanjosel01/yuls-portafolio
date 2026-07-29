import { useCallback, useEffect, useMemo, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import useActiveSection from '@/hooks/useActiveSection'
import { useTranslation } from 'react-i18next'

const SECTION_IDS = ['sobre-mi', 'proyectos', 'habilidades', 'contacto']

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isLight, setIsLight] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  const NAV_LINKS = useMemo(() => [
    { label: t('navbar.about'),    href: '#sobre-mi',   sectionId: 'sobre-mi'   },
    { label: t('navbar.projects'), href: '#proyectos',   sectionId: 'proyectos'  },
    { label: t('navbar.skills'),   href: '#habilidades', sectionId: 'habilidades'},
    { label: t('navbar.contact'),  href: '#contacto',    sectionId: 'contacto'   },
  ], [t])

  const toggleLang = useCallback(() => {
    const next = i18n.language.startsWith('es') ? 'en' : 'es'
    i18n.changeLanguage(next)
  }, [i18n])

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const toggleTheme = useCallback(() => {
    setIsLight((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('light', next)
      return next
    })
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault()
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    },
    []
  )

  const isEs = i18n.language.startsWith('es')

  const LangToggle = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Cambiar idioma"
      className="flex items-center gap-0.5 text-xs font-bold tracking-wider transition-colors duration-200 cursor-pointer"
    >
      <span className={isEs ? 'text-lilac-400' : 'text-[var(--fg-muted)] hover:text-lilac-400'}>ES</span>
      <span className="text-lilac-600/40 mx-0.5">·</span>
      <span className={!isEs ? 'text-lilac-400' : 'text-[var(--fg-muted)] hover:text-lilac-400'}>EN</span>
    </button>
  )

  const desktopLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => {
        const isActive = activeSection === link.sectionId
        return (
          <a
            key={link.sectionId}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.sectionId)}
            className={cn(
              'relative px-1 py-2 text-sm font-medium tracking-wide transition-all duration-300',
              'hover:text-lilac-400',
              isActive ? 'text-lilac-400' : 'text-[var(--fg-muted)]'
            )}
          >
            {link.label}
            <span
              className={cn(
                'absolute bottom-0 left-0 h-0.5 bg-lilac-500 transition-all duration-300 ease-out',
                isActive ? 'w-full' : 'w-0'
              )}
            />
          </a>
        )
      }),
    [NAV_LINKS, activeSection, handleNavClick]
  )

  const mobileLinks = useMemo(
    () =>
      NAV_LINKS.map((link, index) => {
        const isActive = activeSection === link.sectionId
        return (
          <a
            key={link.sectionId}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.sectionId)}
            className={cn(
              'block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300',
              'hover:bg-lilac-600/10 hover:text-lilac-400',
              isActive
                ? 'bg-lilac-600/10 text-lilac-400 border-l-2 border-lilac-500'
                : 'text-[var(--fg-muted)]'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {link.label}
          </a>
        )
      }),
    [NAV_LINKS, activeSection, handleNavClick]
  )

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full backdrop-blur-xl border-b border-lilac-600/10 transition-shadow duration-300',
        hasScrolled && 'shadow-lg shadow-black/20'
      )}
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="group transition-transform duration-300 hover:scale-105"
          aria-label="Inicio"
        >
          <span className="text-xl sm:text-2xl font-extrabold tracking-widest text-lilac-400 group-hover:text-lilac-300 transition-colors duration-300">
            Yuls
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {desktopLinks}

          {/* Separador */}
          <span className="w-px h-4 bg-lilac-600/20" />

          {/* Toggle idioma */}
          {LangToggle}

          {/* Botón Dark / Light */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            className="rounded-full p-2 transition-all duration-300 text-[var(--fg-muted)] hover:bg-lilac-600/10 hover:text-lilac-400"
          >
            {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile: lang + theme + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {LangToggle}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            className="rounded-full p-2 transition-all duration-300 text-[var(--fg-muted)] hover:bg-lilac-600/10 hover:text-lilac-400"
          >
            {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={cn(
              'relative z-50 rounded-lg p-2 transition-all duration-300',
              'text-[var(--fg-muted)] hover:bg-lilac-600/10 hover:text-lilac-400',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac-500/50'
            )}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative h-5 w-5">
              <Menu className={cn('absolute inset-0 h-5 w-5 transition-all duration-300', isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
              <X className={cn('absolute inset-0 h-5 w-5 transition-all duration-300', isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-400 ease-in-out md:hidden border-t border-lilac-600/10',
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 border-t-transparent'
        )}
      >
        <div
          className="space-y-1 px-6 pb-6 pt-4 backdrop-blur-xl"
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)' }}
        >
          {mobileLinks}
        </div>
      </div>
    </header>
  )
}

export default Navbar
