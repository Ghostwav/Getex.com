import { useState, useMemo } from 'react'
import { Play, Star, Clock, ChevronRight, ExternalLink, Search, X, SlidersHorizontal } from 'lucide-react'

const animeList = [
  { title: 'Naruto Shippuden', genre: 'Action', tag: 'Action / Adventure', rating: '9.3', episodes: '500', status: 'Completed', color: 'from-orange-500 to-red-600', description: "Naruto Uzumaki's journey to become the strongest ninja and protect his village." },
  { title: 'Dragon Ball Z', genre: 'Action', tag: 'Action / Fantasy', rating: '9.1', episodes: '291', status: 'Completed', color: 'from-yellow-500 to-orange-500', description: 'Goku and friends defend Earth against powerful enemies from across the universe.' },
  { title: 'Attack on Titan', genre: 'Drama', tag: 'Action / Drama', rating: '9.8', episodes: '94', status: 'Completed', color: 'from-slate-600 to-slate-900', description: 'Humanity fights for survival against giant humanoid creatures called Titans.' },
  { title: 'One Piece', genre: 'Adventure', tag: 'Adventure / Comedy', rating: '9.5', episodes: '1000+', status: 'Ongoing', color: 'from-blue-500 to-teal-500', description: "Monkey D. Luffy sails the seas in search of the world's ultimate treasure." },
  { title: 'Demon Slayer', genre: 'Action', tag: 'Action / Supernatural', rating: '9.6', episodes: '44', status: 'Ongoing', color: 'from-pink-500 to-purple-600', description: 'Tanjiro fights demons to avenge his family and cure his sister.' },
  { title: 'My Hero Academia', genre: 'Action', tag: 'Action / School', rating: '9.0', episodes: '138', status: 'Ongoing', color: 'from-green-500 to-teal-600', description: 'A boy born without powers in a world full of superheroes aims to be the greatest hero.' },
  { title: 'Bleach', genre: 'Action', tag: 'Action / Supernatural', rating: '8.9', episodes: '366', status: 'Completed', color: 'from-gray-600 to-gray-900', description: 'A teenager gains the powers of a Soul Reaper and must defend against evil spirits.' },
  { title: 'Fullmetal Alchemist', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '9.7', episodes: '64', status: 'Completed', color: 'from-amber-500 to-red-700', description: 'Two brothers use alchemy to search for the Philosopher\'s Stone to restore their bodies.' },
  { title: 'Tokyo Ghoul', genre: 'Horror', tag: 'Horror / Action', rating: '8.7', episodes: '48', status: 'Completed', color: 'from-red-800 to-gray-900', description: 'A college student becomes half-ghoul after a deadly encounter and must hide his true nature.' },
  { title: 'Hunter x Hunter', genre: 'Adventure', tag: 'Adventure / Action', rating: '9.4', episodes: '148', status: 'Completed', color: 'from-sky-500 to-blue-700', description: 'A young boy searches for his missing father by becoming a licensed Hunter.' },
  { title: 'Sword Art Online', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '8.5', episodes: '96', status: 'Completed', color: 'from-indigo-500 to-purple-700', description: 'Players are trapped in a virtual reality game where death in the game means death in real life.' },
  { title: 'Black Clover', genre: 'Action', tag: 'Action / Fantasy', rating: '8.6', episodes: '170', status: 'Ongoing', color: 'from-emerald-600 to-black', description: 'A boy born without magic power dreams of becoming the Wizard King in a world full of magic.' },
]

const GENRES = ['All', 'Action', 'Adventure', 'Drama', 'Horror']
const STATUSES = ['All', 'Ongoing', 'Completed']

export default function AnimeSection() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [status, setStatus] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return animeList.filter(a => {
      const matchesQuery =
        query === '' ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.tag.toLowerCase().includes(query.toLowerCase())
      const matchesGenre = genre === 'All' || a.genre === genre
      const matchesStatus = status === 'All' || a.status === status
      return matchesQuery && matchesGenre && matchesStatus
    })
  }, [query, genre, status])

  const clearFilters = () => {
    setQuery('')
    setGenre('All')
    setStatus('All')
  }

  const hasActiveFilters = query !== '' || genre !== 'All' || status !== 'All'

  return (
    <section id="anime" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Anime Section</span>
          </div>
          <h2 className="section-heading font-anime gradient-text mb-4" style={{ letterSpacing: '1px' }}>
            WATCH ANIME
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Stream the most popular anime series. Access thousands of episodes via our Telegram bot.
          </p>
        </div>

        {/* ── SEARCH & FILTER BAR ── */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search anime by name or genre..."
              className="w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm focus:outline-none focus:border-primary transition-colors"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle + chips row */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${showFilters ? 'bg-primary text-white border-primary' : 'border-themed'}`}
              style={!showFilters ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-card)' } : {}}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-secondary" />}
            </button>

            {/* Active filter chips */}
            {genre !== 'All' && (
              <button onClick={() => setGenre('All')} className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full px-3 py-1.5 text-xs font-semibold">
                {genre} <X className="w-3 h-3" />
              </button>
            )}
            {status !== 'All' && (
              <button onClick={() => setStatus('All')} className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/30 text-secondary rounded-full px-3 py-1.5 text-xs font-semibold">
                {status} <X className="w-3 h-3" />
              </button>
            )}
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs underline" style={{ color: 'var(--color-text-subtle)' }}>
                Clear all
              </button>
            )}
          </div>

          {/* Expandable filter panel */}
          {showFilters && (
            <div className="rounded-2xl border p-5 space-y-4 animate-fade-in" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              {/* Genre */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-subtle)' }}>Genre</p>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map(g => (
                    <button
                      key={g}
                      onClick={() => setGenre(g)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${genre === g ? 'bg-primary text-white border-primary' : 'border-themed'}`}
                      style={genre !== g ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'transparent' } : {}}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              {/* Status */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-subtle)' }}>Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${status === s ? 'bg-secondary text-white border-secondary' : 'border-themed'}`}
                      style={status !== s ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'transparent' } : {}}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            {filtered.length === animeList.length
              ? `Showing all ${animeList.length} anime`
              : `Showing ${filtered.length} of ${animeList.length} anime`}
          </p>
        </div>

        {/* Anime grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🎌</p>
            <p className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>No anime found</p>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Try a different search or clear your filters</p>
            <button onClick={clearFilters} className="btn-primary text-sm py-2 px-6">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
            {filtered.map(anime => (
              <div
                key={anime.title}
                className="rounded-2xl overflow-hidden card-hover glow-border group border"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                {/* Poster */}
                <div className={`h-32 bg-gradient-to-br ${anime.color} relative flex items-center justify-center`}>
                  <span className="font-anime text-white text-2xl opacity-50 tracking-wider">{anime.title.split(' ')[0]}</span>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${anime.status === 'Ongoing' ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-white'}`}>
                      {anime.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold">{anime.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm leading-tight mb-1" style={{ color: 'var(--color-text)' }}>{anime.title}</h3>
                  <p className="text-primary text-xs font-semibold mb-2">{anime.tag}</p>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{anime.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                      <Clock className="w-3 h-3" />
                      <span>{anime.episodes} eps</span>
                    </div>
                    <a
                      href="https://t.me/GhostwavTech_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary text-xs font-semibold hover:text-secondary transition-colors"
                    >
                      Watch <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <a href="https://t.me/GhostwavTech_bot" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
            <ExternalLink className="w-4 h-4" /> Browse All Anime on Telegram
          </a>
        </div>
      </div>
    </section>
  )
}
