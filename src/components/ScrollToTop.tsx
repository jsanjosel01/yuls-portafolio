import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-50 hidden sm:flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-lilac-500/40 bg-midnight-900/80 text-lilac-400 shadow-lg shadow-lilac-500/10 backdrop-blur-md transition-all duration-300 hover:border-lilac-400/70 hover:bg-lilac-500/20 hover:text-lilac-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
