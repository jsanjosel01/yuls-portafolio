import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollToTop from '@/components/ScrollToTop'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Esperamos a que la ventana y todos los recursos estén listos
    const handleLoad = () => {
      // Pequeño delay extra para que los dots se vean al menos un momento
      setTimeout(() => setIsLoading(false), 600)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (isLoading) return <LoadingScreen />

  return (
    <div className="noise-overlay relative min-h-screen bg-midnight-950">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
