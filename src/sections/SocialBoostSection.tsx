import { TrendingUp, Users, Heart, Eye, MessageCircle, Send, ChevronRight, Zap } from 'lucide-react'

const platforms = [
  {
    name: 'Instagram',
    color: 'from-pink-500 via-red-500 to-yellow-500',
    icon: '📸',
    services: ['Followers', 'Likes', 'Views', 'Comments'],
  },
  {
    name: 'TikTok',
    color: 'from-black via-gray-900 to-pink-600',
    icon: '🎵',
    services: ['Followers', 'Likes', 'Views', 'Shares'],
  },
  {
    name: 'YouTube',
    color: 'from-red-600 to-red-800',
    icon: '▶️',
    services: ['Subscribers', 'Views', 'Likes', 'Watch Time'],
  },
  {
    name: 'Twitter / X',
    color: 'from-gray-800 to-black',
    icon: '𝕏',
    services: ['Followers', 'Likes', 'Retweets', 'Impressions'],
  },
  {
    name: 'Facebook',
    color: 'from-blue-600 to-blue-800',
    icon: '📘',
    services: ['Page Likes', 'Followers', 'Post Likes', 'Shares'],
  },
  {
    name: 'Telegram',
    color: 'from-sky-400 to-blue-600',
    icon: '✈️',
    services: ['Channel Members', 'Views', 'Reactions', 'Subscribers'],
  },
]

const stats = [
  { icon: <Users className="w-5 h-5" />, value: '50K+', label: 'Users Boosted' },
  { icon: <TrendingUp className="w-5 h-5" />, value: '99%', label: 'Success Rate' },
  { icon: <Heart className="w-5 h-5" />, value: '1M+', label: 'Engagements Delivered' },
  { icon: <Eye className="w-5 h-5" />, value: '10M+', label: 'Views Generated' },
]

export default function SocialBoostSection() {
  return (
    <section id="boost" className="py-24 relative bg-card/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 mb-6">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-secondary text-sm font-600">Social Media Boost</span>
          </div>
          <h2 className="section-heading font-anime gradient-text mb-4" style={{ letterSpacing: '1px' }}>
            BOOST YOUR SOCIALS
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Grow your social media presence instantly. Get followers, likes, views & more — powered by our Telegram bot.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3 text-secondary">
                {s.icon}
              </div>
              <div className="text-2xl font-900 gradient-text">{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {platforms.map(platform => (
            <div key={platform.name} className="bg-card border border-border rounded-2xl overflow-hidden card-hover glow-border group">
              {/* Header bar */}
              <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{platform.icon}</span>
                  <h3 className="text-white font-700 text-lg">{platform.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {platform.services.map(s => (
                    <span key={s} className="text-xs bg-dark border border-border rounded-full px-3 py-1 text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href="https://t.me/GhostwavTech_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-dark hover:bg-primary/10 border border-border hover:border-primary/40 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white transition-all group"
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
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h3 className="text-white font-800 text-xl mb-2">How It Works</h3>
          <p className="text-gray-400 mb-8 text-sm">Three simple steps to grow your account</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <Send className="w-6 h-6 text-secondary" />, title: 'Open the Bot', desc: 'Visit our Telegram bot @GhostwavTech_bot' },
              { step: '02', icon: <Zap className="w-6 h-6 text-primary" />, title: 'Choose Service', desc: 'Select the platform and service you want' },
              { step: '03', icon: <TrendingUp className="w-6 h-6 text-green-400" />, title: 'Watch It Grow', desc: 'See your numbers increase in real time' },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="text-gray-700 font-900 text-4xl mb-3">{item.step}</div>
                <div className="w-12 h-12 rounded-xl bg-dark border border-border flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h4 className="text-white font-700 mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
