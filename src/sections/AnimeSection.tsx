import { Play, Star, Clock, ChevronRight, ExternalLink } from 'lucide-react'

const animeList = [
  {
    title: 'Naruto Shippuden',
    genre: 'Action / Adventure',
    rating: '9.3',
    episodes: '500',
    status: 'Completed',
    color: 'from-orange-500 to-red-600',
    description: 'Naruto Uzumaki's journey to become the strongest ninja and protect his village.',
  },
  {
    title: 'Dragon Ball Z',
    genre: 'Action / Fantasy',
    rating: '9.1',
    episodes: '291',
    status: 'Completed',
    color: 'from-yellow-500 to-orange-500',
    description: 'Goku and friends defend Earth against powerful enemies from across the universe.',
  },
  {
    title: 'Attack on Titan',
    genre: 'Action / Drama',
    rating: '9.8',
    episodes: '94',
    status: 'Completed',
    color: 'from-slate-600 to-slate-900',
    description: 'Humanity fights for survival against giant humanoid creatures called Titans.',
  },
  {
    title: 'One Piece',
    genre: 'Adventure / Comedy',
    rating: '9.5',
    episodes: '1000+',
    status: 'Ongoing',
    color: 'from-blue-500 to-teal-500',
    description: "Monkey D. Luffy sails the seas in search of the world's ultimate treasure.",
  },
  {
    title: 'Demon Slayer',
    genre: 'Action / Supernatural',
    rating: '9.6',
    episodes: '44',
    status: 'Ongoing',
    color: 'from-pink-500 to-purple-600',
    description: 'Tanjiro fights demons to avenge his family and cure his sister.',
  },
  {
    title: 'My Hero Academia',
    genre: 'Action / School',
    rating: '9.0',
    episodes: '138',
    status: 'Ongoing',
    color: 'from-green-500 to-teal-600',
    description: 'A boy born without powers in a world full of superheroes aims to be the greatest hero.',
  },
]

export default function AnimeSection() {
  return (
    <section id="anime" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-600">Anime Section</span>
          </div>
          <h2 className="section-heading font-anime gradient-text mb-4" style={{ letterSpacing: '1px' }}>
            WATCH ANIME
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Stream the most popular anime series. Access thousands of episodes via our Telegram bot.
          </p>
        </div>

        {/* Anime grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {animeList.map((anime) => (
            <div
              key={anime.title}
              className="bg-card border border-border rounded-2xl overflow-hidden card-hover glow-border group"
            >
              {/* Poster placeholder with gradient */}
              <div className={`h-36 bg-gradient-to-br ${anime.color} relative flex items-center justify-center`}>
                <span className="font-anime text-white text-2xl opacity-60 tracking-wider">{anime.title.split(' ')[0]}</span>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-600 ${anime.status === 'Ongoing' ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-white'}`}>
                    {anime.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-700">{anime.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-700 text-base leading-tight">{anime.title}</h3>
                </div>
                <p className="text-primary text-xs font-500 mb-2">{anime.genre}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{anime.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{anime.episodes} eps</span>
                  </div>
                  <a
                    href="https://t.me/GhostwavTech_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary text-xs font-600 hover:text-secondary transition-colors"
                  >
                    Watch Now <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://t.me/GhostwavTech_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <ExternalLink className="w-4 h-4" /> Browse All Anime on Telegram
          </a>
        </div>
      </div>
    </section>
  )
}
