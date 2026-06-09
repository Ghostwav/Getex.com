import { ArrowDown, Play, TrendingUp, Keyboard, Tv } from 'lucide-react'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'var(--color-hero-blob)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(236,72,153,0.15)', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(124,58,237,0.05)' }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-sm font-semibold">All-in-One Platform</span>
        </div>

        {/* Headline */}
        <h1 className="section-heading font-anime text-center mb-6 animate-slide-up" style={{ letterSpacing: '2px' }}>
          <span className="block" style={{ color: 'var(--color-text)' }}>WELCOME TO</span>
          <span className="gradient-text block">GETEX</span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ color: 'var(--color-text-muted)', animationDelay: '0.1s' }}>
          Watch your favourite anime, boost your social media presence, and create stunning keyboard styles — all in one place.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button onClick={() => scrollTo('anime')} className="btn-primary">
            <Play className="w-4 h-4" /> Watch Anime
          </button>
          <button onClick={() => scrollTo('boost')} className="btn-outline">
            <TrendingUp className="w-4 h-4" /> Boost Socials
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: <Tv className="w-4 h-4 text-primary" />, label: '50+ Anime — Watch Free' },
            { icon: <TrendingUp className="w-4 h-4 text-secondary" />, label: 'Social Media Boost' },
            { icon: <Keyboard className="w-4 h-4 text-purple-400" />, label: '50+ Keyboard Styles' },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm border"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-subtle)' }}>Scroll to explore</span>
          <button onClick={() => scrollTo('anime')}>
            <ArrowDown className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}
