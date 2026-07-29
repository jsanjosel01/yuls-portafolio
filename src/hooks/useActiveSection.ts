import { useEffect, useState } from 'react'

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const callback = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id)
        }
      })
    }

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(callback(id), {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      })

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds])

  return activeSection
}

export default useActiveSection
