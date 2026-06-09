import { useState, useMemo } from 'react'
import { Play, Star, Clock, Search, X, SlidersHorizontal, Tv } from 'lucide-react'
import AnimePlayer from '../components/AnimePlayer'

interface AnimeItem {
  title: string
  genre: string
  tag: string
  rating: string
  episodes: number[]
  totalSeasons: number
  status: 'Completed' | 'Ongoing'
  color: string
  description: string
  tmdbId: number
  year: string
}

const animeList: AnimeItem[] = [
  { title: 'Attack on Titan', genre: 'Drama', tag: 'Action / Drama', rating: '9.8', episodes: [25, 12, 22, 28], totalSeasons: 4, status: 'Completed', color: 'from-slate-600 to-gray-900', description: 'Humanity fights for survival inside enormous walled cities against giant humanoid Titans.', tmdbId: 1429, year: '2013' },
  { title: 'Death Note', genre: 'Thriller', tag: 'Thriller / Mystery', rating: '9.7', episodes: [37], totalSeasons: 1, status: 'Completed', color: 'from-gray-900 to-black', description: 'A high school student discovers a supernatural notebook that kills anyone whose name is written in it.', tmdbId: 13916, year: '2006' },
  { title: 'Fullmetal Alchemist: Brotherhood', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '9.7', episodes: [64], totalSeasons: 1, status: 'Completed', color: 'from-amber-500 to-red-700', description: 'Two brothers use alchemy in a quest to find the Philosopher\'s Stone to restore their bodies.', tmdbId: 31911, year: '2009' },
  { title: 'Jujutsu Kaisen', genre: 'Action', tag: 'Action / Horror', rating: '9.5', episodes: [24, 23], totalSeasons: 2, status: 'Ongoing', color: 'from-purple-800 to-black', description: 'A boy swallows a cursed relic and joins a secret organization to fight evil curses.', tmdbId: 95479, year: '2020' },
  { title: 'Demon Slayer', genre: 'Action', tag: 'Action / Supernatural', rating: '9.6', episodes: [26, 18, 11, 13], totalSeasons: 4, status: 'Ongoing', color: 'from-pink-500 to-purple-700', description: 'Tanjiro becomes a demon slayer after his family is slaughtered and his sister turned into a demon.', tmdbId: 85937, year: '2019' },
  { title: 'One Piece', genre: 'Adventure', tag: 'Adventure / Comedy', rating: '9.5', episodes: [130, 130, 130, 130, 130, 130, 130, 130], totalSeasons: 8, status: 'Ongoing', color: 'from-blue-500 to-teal-500', description: "Monkey D. Luffy and his crew sail the seas in search of the ultimate treasure, the One Piece.", tmdbId: 37854, year: '1999' },
  { title: 'Naruto Shippuden', genre: 'Action', tag: 'Action / Adventure', rating: '9.3', episodes: [32, 21, 26, 26, 24, 21, 26, 24], totalSeasons: 8, status: 'Completed', color: 'from-orange-500 to-red-600', description: "Naruto Uzumaki's journey to become Hokage and save his friend Sasuke from darkness.", tmdbId: 46260, year: '2007' },
  { title: 'Hunter x Hunter', genre: 'Adventure', tag: 'Adventure / Action', rating: '9.4', episodes: [26, 27, 23, 12, 12, 13], totalSeasons: 6, status: 'Completed', color: 'from-sky-500 to-blue-700', description: 'Gon Freecss searches for his missing father by training to become a licensed Hunter.', tmdbId: 46298, year: '2011' },
  { title: 'My Hero Academia', genre: 'Action', tag: 'Action / School', rating: '9.0', episodes: [13, 25, 25, 25, 25, 25, 25], totalSeasons: 7, status: 'Completed', color: 'from-green-500 to-teal-600', description: 'A boy born without superpowers in a world full of heroes trains to become the greatest hero.', tmdbId: 65930, year: '2016' },
  { title: 'Dragon Ball Z', genre: 'Action', tag: 'Action / Fantasy', rating: '9.1', episodes: [39, 33, 14, 30, 28, 26, 26, 25], totalSeasons: 8, status: 'Completed', color: 'from-yellow-500 to-orange-500', description: 'Goku and his friends defend Earth against increasingly powerful enemies from across the universe.', tmdbId: 12971, year: '1989' },
  { title: 'Bleach', genre: 'Action', tag: 'Action / Supernatural', rating: '8.9', episodes: [20, 28, 27, 27, 27, 27, 24, 23], totalSeasons: 8, status: 'Completed', color: 'from-gray-500 to-gray-900', description: 'Ichigo Kurosaki gains the powers of a Soul Reaper and must defend against evil spirits called Hollows.', tmdbId: 30984, year: '2004' },
  { title: 'One Punch Man', genre: 'Action', tag: 'Action / Comedy', rating: '9.2', episodes: [12, 12], totalSeasons: 2, status: 'Completed', color: 'from-yellow-400 to-red-600', description: 'A superhero who can defeat any opponent with a single punch struggles with the boredom of invincibility.', tmdbId: 63057, year: '2015' },
  { title: 'Sword Art Online', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '8.5', episodes: [25, 24, 24], totalSeasons: 3, status: 'Completed', color: 'from-indigo-500 to-blue-800', description: 'Players are trapped inside a virtual reality MMORPG where death in the game means death in real life.', tmdbId: 45782, year: '2012' },
  { title: 'Tokyo Ghoul', genre: 'Horror', tag: 'Horror / Action', rating: '8.7', episodes: [12, 12, 12, 12], totalSeasons: 4, status: 'Completed', color: 'from-red-800 to-gray-900', description: 'A college student becomes half-ghoul and must hide his true nature while navigating both worlds.', tmdbId: 61375, year: '2014' },
  { title: 'Chainsaw Man', genre: 'Action', tag: 'Action / Horror', rating: '9.3', episodes: [12], totalSeasons: 1, status: 'Ongoing', color: 'from-red-600 to-gray-900', description: 'A boy merges with his devil dog and becomes a devil hunter to pay off his deceased father\'s debt.', tmdbId: 114410, year: '2022' },
  { title: 'Spy x Family', genre: 'Comedy', tag: 'Comedy / Action', rating: '9.1', episodes: [12, 12, 12], totalSeasons: 3, status: 'Ongoing', color: 'from-rose-400 to-pink-700', description: 'A spy assembles a fake family for a mission, not knowing his daughter is a telepath and wife is an assassin.', tmdbId: 120089, year: '2022' },
  { title: 'Tokyo Revengers', genre: 'Action', tag: 'Action / Thriller', rating: '8.8', episodes: [24, 13, 13], totalSeasons: 3, status: 'Completed', color: 'from-orange-600 to-red-800', description: 'A man travels back in time to high school to prevent a gang war that killed his girlfriend.', tmdbId: 119495, year: '2021' },
  { title: 'Black Clover', genre: 'Action', tag: 'Action / Fantasy', rating: '8.6', episodes: [170], totalSeasons: 1, status: 'Completed', color: 'from-emerald-600 to-black', description: 'A boy born without magic in a magical world dreams of becoming the Wizard King through sheer determination.', tmdbId: 70881, year: '2017' },
  { title: 'Re:Zero', genre: 'Fantasy', tag: 'Fantasy / Drama', rating: '9.0', episodes: [25, 13, 12], totalSeasons: 3, status: 'Ongoing', color: 'from-blue-400 to-indigo-800', description: 'A boy is transported to a fantasy world and discovers he can return from death after being killed.', tmdbId: 64196, year: '2016' },
  { title: 'Haikyuu!!', genre: 'Sports', tag: 'Sports / Drama', rating: '9.2', episodes: [25, 25, 10, 25], totalSeasons: 4, status: 'Completed', color: 'from-orange-400 to-gray-800', description: 'A short high school volleyball player aims to become the best despite his height disadvantage.', tmdbId: 45796, year: '2014' },
  { title: 'Overlord', genre: 'Fantasy', tag: 'Fantasy / Action', rating: '8.7', episodes: [13, 13, 13, 13], totalSeasons: 4, status: 'Completed', color: 'from-gray-800 to-black', description: 'A player is trapped in an RPG world as his powerful undead character and builds an empire.', tmdbId: 63926, year: '2015' },
  { title: 'Vinland Saga', genre: 'Drama', tag: 'Drama / Action', rating: '9.3', episodes: [24, 24], totalSeasons: 2, status: 'Completed', color: 'from-stone-600 to-slate-900', description: 'A young Viking warrior seeks revenge for his father\'s murder while questioning the meaning of true battles.', tmdbId: 81797, year: '2019' },
  { title: 'Dr. Stone', genre: 'Adventure', tag: 'Adventure / Sci-Fi', rating: '9.0', episodes: [24, 11, 22], totalSeasons: 3, status: 'Completed', color: 'from-green-600 to-teal-900', description: 'After all humans are petrified, a science genius revives them and rebuilds civilization using science.', tmdbId: 83492, year: '2019' },
  { title: 'Steins;Gate', genre: 'Thriller', tag: 'Sci-Fi / Thriller', rating: '9.5', episodes: [24, 23], totalSeasons: 2, status: 'Completed', color: 'from-amber-700 to-gray-900', description: 'A self-proclaimed mad scientist accidentally discovers time travel and faces catastrophic consequences.', tmdbId: 42934, year: '2011' },
  { title: 'Mob Psycho 100', genre: 'Action', tag: 'Action / Comedy', rating: '9.2', episodes: [12, 13, 12], totalSeasons: 3, status: 'Completed', color: 'from-purple-500 to-indigo-900', description: 'An overpowered psychic middle-schooler tries to live a normal life while suppressing his incredible powers.', tmdbId: 65806, year: '2016' },
  { title: 'Seven Deadly Sins', genre: 'Action', tag: 'Action / Fantasy', rating: '8.6', episodes: [24, 24, 24, 24, 24], totalSeasons: 5, status: 'Completed', color: 'from-red-500 to-purple-800', description: 'A princess recruits a disbanded group of legendary knights to save her kingdom from a corrupt Holy Knights order.', tmdbId: 62740, year: '2014' },
  { title: 'Konosuba', genre: 'Comedy', tag: 'Comedy / Fantasy', rating: '8.9', episodes: [10, 10, 10], totalSeasons: 3, status: 'Completed', color: 'from-cyan-500 to-blue-700', description: 'A gamer is reincarnated in a fantasy world with a useless goddess and forms a dysfunctional adventuring party.', tmdbId: 67178, year: '2016' },
  { title: 'No Game No Life', genre: 'Fantasy', tag: 'Fantasy / Comedy', rating: '8.7', episodes: [12], totalSeasons: 1, status: 'Completed', color: 'from-pink-400 to-fuchsia-700', description: 'Genius gamer siblings are transported to a fantasy world where all conflicts are resolved through games.', tmdbId: 58041, year: '2014' },
  { title: 'Your Lie in April', genre: 'Drama', tag: 'Drama / Romance', rating: '9.3', episodes: [22], totalSeasons: 1, status: 'Completed', color: 'from-yellow-300 to-pink-500', description: 'A piano prodigy who lost his ability to hear the piano is inspired to play again by a free-spirited violinist.', tmdbId: 60625, year: '2014' },
  { title: 'Violet Evergarden', genre: 'Drama', tag: 'Drama / Fantasy', rating: '9.2', episodes: [13, 13], totalSeasons: 2, status: 'Completed', color: 'from-blue-300 to-indigo-700', description: 'A former war soldier becomes a letter writer and slowly rediscovers her humanity and what love means.', tmdbId: 77857, year: '2018' },
  { title: 'Neon Genesis Evangelion', genre: 'Sci-Fi', tag: 'Sci-Fi / Mecha', rating: '9.0', episodes: [26], totalSeasons: 1, status: 'Completed', color: 'from-purple-700 to-slate-900', description: 'Teenagers pilot giant robots called Evangelions to fight monstrous beings known as Angels threatening humanity.', tmdbId: 890, year: '1995' },
  { title: 'Code Geass', genre: 'Sci-Fi', tag: 'Sci-Fi / Mecha', rating: '9.2', episodes: [25, 25], totalSeasons: 2, status: 'Completed', color: 'from-red-700 to-gray-900', description: 'An exiled prince gains a power to control others and leads a rebellion against a tyrannical empire.', tmdbId: 1409, year: '2006' },
  { title: 'Toradora!', genre: 'Romance', tag: 'Romance / Comedy', rating: '9.0', episodes: [25], totalSeasons: 1, status: 'Completed', color: 'from-orange-400 to-pink-600', description: 'A misunderstood boy and the school\'s fiercest girl team up to help each other win their crushes.', tmdbId: 30995, year: '2008' },
  { title: 'Parasyte', genre: 'Horror', tag: 'Horror / Sci-Fi', rating: '9.0', episodes: [24], totalSeasons: 1, status: 'Completed', color: 'from-green-700 to-gray-900', description: 'A teenager\'s right hand is taken over by a parasitic alien and they must coexist to fight other parasites.', tmdbId: 61456, year: '2014' },
  { title: 'Gurren Lagann', genre: 'Sci-Fi', tag: 'Sci-Fi / Mecha', rating: '9.1', episodes: [27], totalSeasons: 1, status: 'Completed', color: 'from-red-500 to-orange-700', description: 'Two brothers escape an underground village and pilot a giant robot to fight the oppressive Spiral King.', tmdbId: 16, year: '2007' },
  { title: 'Fairy Tail', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '8.5', episodes: [48, 50, 52, 50], totalSeasons: 4, status: 'Completed', color: 'from-sky-500 to-rose-600', description: 'A celestial spirit mage joins the rowdy Fairy Tail wizard guild and goes on adventures with her guildmates.', tmdbId: 46957, year: '2009' },
  { title: 'The Rising of the Shield Hero', genre: 'Fantasy', tag: 'Fantasy / Action', rating: '8.7', episodes: [25, 13, 13], totalSeasons: 3, status: 'Completed', color: 'from-green-800 to-black', description: 'A hero is betrayed on arrival in a fantasy world and must prove his worth as the disgraced Shield Hero.', tmdbId: 86541, year: '2019' },
  { title: 'Soul Eater', genre: 'Action', tag: 'Action / Supernatural', rating: '8.5', episodes: [51], totalSeasons: 1, status: 'Completed', color: 'from-gray-600 to-red-900', description: 'Students at a Death God school train their weapon-partners to collect evil souls and prevent chaos.', tmdbId: 2583, year: '2008' },
  { title: 'Blue Exorcist', genre: 'Action', tag: 'Action / Supernatural', rating: '8.5', episodes: [25, 12], totalSeasons: 2, status: 'Completed', color: 'from-blue-600 to-slate-900', description: "The son of Satan is raised by a priest and joins an exorcist academy to fight demons, including his own nature.", tmdbId: 40705, year: '2011' },
  { title: 'Noragami', genre: 'Action', tag: 'Action / Supernatural', rating: '8.8', episodes: [12, 13], totalSeasons: 2, status: 'Completed', color: 'from-blue-500 to-purple-800', description: 'A minor deity without a shrine does odd jobs for 5 yen while fighting vengeful spirits with his human weapon.', tmdbId: 60864, year: '2014' },
  { title: 'That Time I Got Reincarnated as a Slime', genre: 'Fantasy', tag: 'Fantasy / Adventure', rating: '8.9', episodes: [24, 24, 24], totalSeasons: 3, status: 'Ongoing', color: 'from-sky-400 to-blue-600', description: 'A man is reincarnated as a slime in a fantasy world and builds a monster nation through friendship.', tmdbId: 84958, year: '2018' },
  { title: 'Danmachi', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '8.6', episodes: [13, 13, 24, 23], totalSeasons: 4, status: 'Ongoing', color: 'from-amber-400 to-orange-700', description: 'A rookie adventurer aspires to grow stronger in a dungeon city where gods live alongside humans.', tmdbId: 62745, year: '2015' },
  { title: 'Madoka Magica', genre: 'Drama', tag: 'Drama / Fantasy', rating: '9.1', episodes: [12], totalSeasons: 1, status: 'Completed', color: 'from-pink-400 to-purple-700', description: 'Middle school girls are offered wishes in exchange for becoming magical girls who fight witches — with a dark twist.', tmdbId: 40175, year: '2011' },
  { title: 'Kill la Kill', genre: 'Action', tag: 'Action / Comedy', rating: '8.7', episodes: [24], totalSeasons: 1, status: 'Completed', color: 'from-red-600 to-orange-900', description: 'A girl transfers to a school ruled by a tyrannical student council and uncovers a global conspiracy.', tmdbId: 58978, year: '2013' },
  { title: 'Fruits Basket', genre: 'Romance', tag: 'Romance / Drama', rating: '9.0', episodes: [25, 25, 13], totalSeasons: 3, status: 'Completed', color: 'from-orange-300 to-rose-600', description: 'A girl discovers her classmates are possessed by the Chinese zodiac and transforms when hugged.', tmdbId: 94954, year: '2019' },
  { title: 'Erased', genre: 'Thriller', tag: 'Thriller / Mystery', rating: '9.2', episodes: [12], totalSeasons: 1, status: 'Completed', color: 'from-blue-700 to-slate-900', description: 'A man travels back to his childhood to prevent a serial killer from targeting his classmate.', tmdbId: 63058, year: '2016' },
  { title: 'Psycho-Pass', genre: 'Sci-Fi', tag: 'Sci-Fi / Thriller', rating: '9.0', episodes: [22, 11, 8], totalSeasons: 3, status: 'Completed', color: 'from-cyan-700 to-gray-900', description: 'In a dystopian future, police use a device to measure criminal intent and prevent crimes before they happen.', tmdbId: 44217, year: '2012' },
  { title: 'Sword Art Online: Alicization', genre: 'Adventure', tag: 'Adventure / Fantasy', rating: '8.6', episodes: [24, 23], totalSeasons: 2, status: 'Completed', color: 'from-teal-500 to-blue-900', description: 'Kirito wakes inside a vast virtual world called Underworld with no memory of how he got there.', tmdbId: 86831, year: '2018' },
  { title: 'Ao Ashi', genre: 'Sports', tag: 'Sports / Drama', rating: '8.7', episodes: [24], totalSeasons: 1, status: 'Completed', color: 'from-green-500 to-emerald-800', description: 'A rough-around-the-edges teen is scouted for a prestigious youth soccer team in Tokyo.', tmdbId: 132743, year: '2022' },
]

const GENRES = ['All', 'Action', 'Adventure', 'Drama', 'Thriller', 'Horror', 'Fantasy', 'Sci-Fi', 'Comedy', 'Romance', 'Sports']
const STATUSES = ['All', 'Ongoing', 'Completed']

export default function AnimeSection() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [status, setStatus] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [watching, setWatching] = useState<AnimeItem | null>(null)

  const filtered = useMemo(() => {
    return animeList.filter(a => {
      const matchesQuery = query === '' || a.title.toLowerCase().includes(query.toLowerCase()) || a.tag.toLowerCase().includes(query.toLowerCase())
      const matchesGenre = genre === 'All' || a.genre === genre
      const matchesStatus = status === 'All' || a.status === status
      return matchesQuery && matchesGenre && matchesStatus
    })
  }, [query, genre, status])

  const clearFilters = () => { setQuery(''); setGenre('All'); setStatus('All') }
  const hasActiveFilters = query !== '' || genre !== 'All' || status !== 'All'
  const totalEps = (a: AnimeItem) => a.episodes.reduce((s, e) => s + e, 0)

  return (
    <section id="anime" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {watching && (
        <AnimePlayer
          anime={{ title: watching.title, tmdbId: watching.tmdbId, totalSeasons: watching.totalSeasons, episodes: watching.episodes }}
          onClose={() => setWatching(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
            <Tv className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Anime Section</span>
          </div>
          <h2 className="section-heading font-anime gradient-text mb-4" style={{ letterSpacing: '1px' }}>
            WATCH ANIME
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            {animeList.length}+ popular anime series — watch episodes directly on Getex for free.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-3xl mx-auto mb-6 space-y-3">
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
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${showFilters ? 'bg-primary text-white border-primary' : ''}`}
              style={!showFilters ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-card)' } : {}}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-secondary" />}
            </button>
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
              <button onClick={clearFilters} className="text-xs underline" style={{ color: 'var(--color-text-subtle)' }}>Clear all</button>
            )}
          </div>

          {showFilters && (
            <div className="rounded-2xl border p-5 space-y-4 animate-fade-in" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-subtle)' }}>Genre</p>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map(g => (
                    <button key={g} onClick={() => setGenre(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${genre === g ? 'bg-primary text-white border-primary' : ''}`}
                      style={genre !== g ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'transparent' } : {}}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-subtle)' }}>Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button key={s} onClick={() => setStatus(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${status === s ? 'bg-secondary text-white border-secondary' : ''}`}
                      style={status !== s ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'transparent' } : {}}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Count */}
        <div className="text-center mb-6">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            {filtered.length === animeList.length ? `${animeList.length} anime available` : `${filtered.length} of ${animeList.length} anime`}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🎌</p>
            <p className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>No anime found</p>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Try a different search or clear your filters</p>
            <button onClick={clearFilters} className="btn-primary text-sm py-2 px-6">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(anime => (
              <div
                key={anime.title}
                className="rounded-2xl overflow-hidden card-hover border group cursor-pointer"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                onClick={() => setWatching(anime)}
              >
                {/* Poster */}
                <div className={`h-36 bg-gradient-to-br ${anime.color} relative flex items-center justify-center`}>
                  <span className="font-anime text-white text-xl opacity-40 tracking-wider text-center px-2 leading-tight">
                    {anime.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                  <div className="absolute inset-0 bg-black/20" />
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${anime.status === 'Ongoing' ? 'bg-green-500/90 text-white' : 'bg-gray-600/90 text-white'}`}>
                      {anime.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold">{anime.rating}</span>
                  </div>
                  <div className="absolute bottom-2 right-2 text-white text-xs opacity-70">{anime.year}</div>
                </div>

                <div className="p-3">
                  <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-1" style={{ color: 'var(--color-text)' }}>{anime.title}</h3>
                  <p className="text-primary text-xs font-semibold mb-1">{anime.tag}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1" style={{ color: 'var(--color-text-subtle)' }}>
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{totalEps(anime)} eps</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>• S{anime.totalSeasons}</span>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                  >
                    <Play className="w-3 h-3" /> Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
