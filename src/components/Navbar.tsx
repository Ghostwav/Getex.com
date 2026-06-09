import { useState, useEffect } from 'react'
import { Menu, X, Zap, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'anime', label: 'Anime' },
  { id: 'boost', label: 'Social Boost' },
  { id: 'keyboard', label: 'Keyboard Styles' },
]

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme, isDark } = useTheme()

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b border-themed shadow-lg'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' } : {}}
    >
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
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeSection === l.id
                    ? 'bg-primary/20 border border-primary/40'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  color: activeSection === l.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right side: theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* ── THEME TOGGLE ── */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {/* icons behind the knob */}
              <span className="theme-toggle-icons">
                <Moon className="w-3 h-3 text-purple-300" />
                <Sun className="w-3 h-3 text-yellow-400" />
              </span>
              <span className={`theme-toggle-knob ${!isDark ? 'light-active' : ''}`}>
                {isDark
                  ? <Moon className="w-3 h-3 text-white" />
                  : <Sun className="w-3 h-3 text-white" />
                }
              </span>
            </button>

            <a
              href="https://t.me/GhostwavTech_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-5"
            >
              <Zap className="w-4 h-4" /> Get Started
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-icons">
                <Moon className="w-3 h-3 text-purple-300" />
                <Sun className="w-3 h-3 text-yellow-400" />
              </span>
              <span className={`theme-toggle-knob ${!isDark ? 'light-active' : ''}`}>
                {isDark
                  ? <Moon className="w-3 h-3 text-white" />
                  : <Sun className="w-3 h-3 text-white" />
                }
              </span>
            </button>
            <button onClick={() => setOpen(!open)} className="p-2" style={{ color: 'var(--color-text)' }}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-2"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeSection === l.id ? 'bg-primary/20' : ''
              }`}
              style={{ color: activeSection === l.id ? 'var(--color-text)' : 'var(--color-text-muted)' }}
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
