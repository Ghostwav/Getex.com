import { Zap, Send, ExternalLink } from 'lucide-react'

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black gradient-text">GETEX</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Your all-in-one platform for anime streaming, social media growth, and custom keyboard styles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: 'var(--color-text)' }}>Navigation</h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'anime', label: 'Anime' },
                { id: 'boost', label: 'Social Boost' },
                { id: 'keyboard', label: 'Keyboard Styles' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Telegram */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: 'var(--color-text)' }}>Connect With Us</h4>
            <a
              href="https://t.me/GhostwavTech_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-4 border transition-colors hover:border-primary/50 group"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#229ED9]/20 flex items-center justify-center flex-shrink-0">
                <Send className="w-5 h-5 text-[#229ED9]" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>@GhostwavTech_bot</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Telegram Bot</p>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto group-hover:text-primary transition-colors" style={{ color: 'var(--color-text-subtle)' }} />
            </a>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>© {new Date().getFullYear()} Getex. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>Built with ❤️ by Ghostwav</p>
        </div>
      </div>
    </footer>
  )
}
