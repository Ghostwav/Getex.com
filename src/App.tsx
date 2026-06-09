import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import AnimeSection from './sections/AnimeSection'
import SocialBoostSection from './sections/SocialBoostSection'
import KeyboardSection from './sections/KeyboardSection'
import Footer from './components/Footer'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'anime', 'boost', 'keyboard']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark noise-bg">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <AnimeSection />
        <SocialBoostSection />
        <KeyboardSection />
      </main>
      <Footer />
    </div>
  )
}
