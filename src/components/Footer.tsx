import { Zap, Send, ExternalLink } from 'lucide-react'

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-card border-t border-border">
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
            <p className="text-gray-400 text-sm leading-relaxed">
              Your all-in-one platform for anime streaming, social media growth, and custom keyboard styles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-700 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['home', 'anime', 'boost', 'keyboard'].map(id => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-gray-400 hover:text-white capitalize text-sm transition-colors"
                  >
                    {id === 'boost' ? 'Social Boost' : id === 'keyboard' ? 'Keyboard Styles' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Telegram */}
          <div>
            <h4 className="text-white font-700 mb-4">Connect With Us</h4>
            <a
              href="https://t.me/GhostwavTech_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-dark border border-border rounded-xl p-4 hover:border-primary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#229ED9]/20 flex items-center justify-center">
                <Send className="w-5 h-5 text-[#229ED9]" />
              </div>
              <div>
                <p className="text-white text-sm font-600">@GhostwavTech_bot</p>
                <p className="text-gray-400 text-xs">Telegram Bot</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 ml-auto group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Getex. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with ❤️ by Ghostwav</p>
        </div>
      </div>
    </footer>
  )
}
