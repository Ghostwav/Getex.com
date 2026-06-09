import { TrendingUp, Users, Heart, Eye, MessageCircle, Send, ChevronRight, Zap } from 'lucide-react'

const platforms = [
  { name: 'Instagram', color: 'from-pink-500 via-red-500 to-yellow-500', icon: '📸', services: ['Followers', 'Likes', 'Views', 'Comments'] },
  { name: 'TikTok', color: 'from-gray-900 to-pink-600', icon: '🎵', services: ['Followers', 'Likes', 'Views', 'Shares'] },
  { name: 'YouTube', color: 'from-red-600 to-red-800', icon: '▶️', services: ['Subscribers', 'Views', 'Likes', 'Watch Time'] },
  { name: 'Twitter / X', color: 'from-gray-700 to-black', icon: '𝕏', services: ['Followers', 'Likes', 'Retweets', 'Impressions'] },
  { name: 'Facebook', color: 'from-blue-600 to-blue-800', icon: '📘', services: ['Page Likes', 'Followers', 'Post Likes', 'Shares'] },
  { name: 'Telegram', color: 'from-sky-400 to-blue-600', icon: '✈️', services: ['Channel Members', 'Views', 'Reactions', 'Subscribers'] },
]

const stats = [
  { icon: <Users className="w-5 h-5" />, value: '50K+', label: 'Users Boosted' },
  { icon: <TrendingUp className="w-5 h-5" />, value: '99%', label: 'Success Rate' },
  { icon: <Heart className="w-5 h-5" />, value: '1M+', label: 'Engagements Delivered' },
  { icon: <Eye className="w-5 h-5" />, value: '10M+', label: 'Views Generated' },
]

export default function SocialBoostSection() {
  return (
    <section id="boost" className="py-24 relative" style={{ backgroundColor: 'var(--color-section-alt)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 mb-6">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-secondary text-sm font-semibold">Social Media Boost</span>
          </div>
          <h2 className="section-heading font-anime gradient-text mb-4" style={{ letterSpacing: '1px' }}>
            BOOST YOUR SOCIALS
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Grow your social media presence instantly. Get followers, likes, views & more — powered by our Telegram bot.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3 text-secondary">
                {s.icon}
              </div>
              <div className="text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {platforms.map(platform => (
            <div key={platform.name} className="rounded-2xl overflow-hidden card-hover glow-border group border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{platform.icon}</span>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{platform.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {platform.services.map(s => (
                    <span key={s} className="text-xs rounded-full px-3 py-1 border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href="https://t.me/GhostwavTech_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full rounded-xl px-4 py-3 text-sm transition-all group border hover:border-primary/40 hover:bg-primary/5"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Boost via Telegram
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <h3 className="font-extrabold text-xl mb-2" style={{ color: 'var(--color-text)' }}>How It Works</h3>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>Three simple steps to grow your account</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <Send className="w-6 h-6 text-secondary" />, title: 'Open the Bot', desc: 'Visit our Telegram bot @GhostwavTech_bot' },
              { step: '02', icon: <Zap className="w-6 h-6 text-primary" />, title: 'Choose Service', desc: 'Select the platform and service you want' },
              { step: '03', icon: <TrendingUp className="w-6 h-6 text-green-500" />, title: 'Watch It Grow', desc: 'See your numbers increase in real time' },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="font-black text-4xl mb-3" style={{ color: 'var(--color-border)' }}>{item.step}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  {item.icon}
                </div>
                <h4 className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>{item.title}</h4>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
