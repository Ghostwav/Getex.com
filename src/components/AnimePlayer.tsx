import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Tv, AlertTriangle } from 'lucide-react'

interface Anime {
  title: string
  tmdbId: number
  totalSeasons: number
  episodes: number[]
}

interface AnimePlayerProps {
  anime: Anime
  onClose: () => void
}

export default function AnimePlayer({ anime, onClose }: AnimePlayerProps) {
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const embedUrl = `https://vidsrc.to/embed/tv/${anime.tmdbId}/${season}/${episode}`
  const episodeCount = anime.episodes[season - 1] || 12

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    setLoaded(false)
    const t = setTimeout(() => setLoaded(true), 500)
    return () => clearTimeout(t)
  }, [season, episode])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{ backgroundColor: 'var(--color-card)', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <Tv className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--color-text)' }}>{anime.title}</h3>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Season {season} · Episode {episode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-500/20"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player */}
        <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading player...</p>
            </div>
          )}
          <iframe
            key={`${season}-${episode}`}
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen"
            style={{ border: 'none' }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Disclaimer */}
        <div className="px-5 py-2 flex items-start gap-2 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(234,179,8,0.05)' }}>
          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Content is embedded from third-party sources. If a stream doesn't load, try a different episode or check back later.
          </p>
        </div>

        {/* Controls */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: '220px' }}>
          {/* Season selector */}
          {anime.totalSeasons > 1 && (
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-subtle)' }}>Season</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: anime.totalSeasons }, (_, i) => i + 1).map(s => (
                  <button
                    key={s}
                    onClick={() => { setSeason(s); setEpisode(1) }}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all border ${season === s ? 'bg-primary text-white border-primary' : 'hover:border-primary/50'}`}
                    style={season !== s ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-bg)' } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Episode selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-subtle)' }}>
                Episodes ({episodeCount})
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEpisode(e => Math.max(1, e - 1))}
                  disabled={episode === 1}
                  className="w-7 h-7 rounded-lg flex items-center justify-center border disabled:opacity-30 hover:border-primary/50 transition-all"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-bg)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs px-2" style={{ color: 'var(--color-text-muted)' }}>Ep {episode}</span>
                <button
                  onClick={() => setEpisode(e => Math.min(episodeCount, e + 1))}
                  disabled={episode === episodeCount}
                  className="w-7 h-7 rounded-lg flex items-center justify-center border disabled:opacity-30 hover:border-primary/50 transition-all"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-bg)' }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: Math.min(episodeCount, 50) }, (_, i) => i + 1).map(ep => (
                <button
                  key={ep}
                  onClick={() => setEpisode(ep)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all border ${episode === ep ? 'bg-primary text-white border-primary' : 'hover:border-primary/40'}`}
                  style={episode !== ep ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-bg)' } : {}}
                >
                  {ep}
                </button>
              ))}
              {episodeCount > 50 && (
                <span className="text-xs flex items-center px-2" style={{ color: 'var(--color-text-subtle)' }}>+{episodeCount - 50} more</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
