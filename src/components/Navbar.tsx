import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'anime', label: 'Anime' },
  { id: 'boost', label: 'Social Boost' },
  { id: 'keyboard', label: 'Keyboard Styles' },
]

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">GETEX</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 ${
                  activeSection === l.id
                    ? 'bg-primary/20 text-white border border-primary/40'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://t.me/GhostwavTech_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-primary text-sm py-2 px-5"
          >
            <Zap className="w-4 h-4" /> Get Started
          </a>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-2">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-600 transition-all ${
                activeSection === l.id ? 'bg-primary/20 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://t.me/GhostwavTech_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center mt-2"
          >
            <Zap className="w-4 h-4" /> Open Telegram Bot
          </a>
        </div>
      )}
    </nav>
  )
}
