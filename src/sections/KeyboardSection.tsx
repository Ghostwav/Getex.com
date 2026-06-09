import { useState } from 'react'
import { Keyboard, Copy, Check, Shuffle } from 'lucide-react'

const keyboardStyles: Record<string, { name: string; example: (text: string) => string }[]> = {
  Curvy: [
    { name: 'Script', example: (t) => [...t].map(c => { const map: Record<string,string> = {a:'𝒶',b:'𝒷',c:'𝒸',d:'𝒹',e:'𝑒',f:'𝒻',g:'𝑔',h:'𝒽',i:'𝒾',j:'𝒿',k:'𝓀',l:'𝓁',m:'𝓂',n:'𝓃',o:'𝑜',p:'𝓅',q:'𝓆',r:'𝓇',s:'𝓈',t:'𝓉',u:'𝓊',v:'𝓋',w:'𝓌',x:'𝓍',y:'𝓎',z:'𝓏',A:'𝒜',B:'ℬ',C:'𝒞',D:'𝒟',E:'ℰ',F:'ℱ',G:'𝒢',H:'ℋ',I:'ℐ',J:'𝒥',K:'𝒦',L:'ℒ',M:'ℳ',N:'𝒩',O:'𝒪',P:'𝒫',Q:'𝒬',R:'ℛ',S:'𝒮',T:'𝒯',U:'𝒰',V:'𝒱',W:'𝒲',X:'𝒳',Y:'𝒴',Z:'𝒵'}; return map[c] || c }).join('') },
    { name: 'Handwriting', example: (t) => [...t].map(c => { const map: Record<string,string> = {a:'α',b:'в',c:'¢',d:'∂',e:'є',f:'ƒ',g:'g',h:'н',i:'ι',j:'נ',k:'к',l:'ℓ',m:'м',n:'η',o:'σ',p:'ρ',q:'q',r:'я',s:'ѕ',t:'т',u:'υ',v:'ν',w:'ω',x:'χ',y:'у',z:'ž'}; return map[c.toLowerCase()] || c }).join('') },
    { name: 'Curly', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'ɑ',b:'ƅ',c:'ɕ',d:'ɖ',e:'ɛ',f:'ʄ',g:'ɠ',h:'ɦ',i:'ɩ',j:'ʝ',k:'ƙ',l:'ƚ',m:'ɱ',n:'ɲ',o:'ɵ',p:'ƥ',q:'ʠ',r:'ɾ',s:'ʂ',t:'ƭ',u:'ʉ',v:'ʋ',w:'ɯ',x:'ɸ',y:'ɏ',z:'ʐ'}; return map[c.toLowerCase()] || c }).join('') },
  ],
  Bold: [
    { name: 'Bold Serif', example: (t) => [...t].map(c => { const s='abcdefghijklmnopqrstuvwxyz', b=[...'𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'], u=[...'𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙']; const li=s.indexOf(c); if(li>=0) return b[li]; const ui='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c); if(ui>=0) return u[ui]; return c }).join('') },
    { name: 'Bold Italic', example: (t) => [...t].map(c => { const s='abcdefghijklmnopqrstuvwxyz', b=[...'𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'], u=[...'𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁']; const li=s.indexOf(c); if(li>=0) return b[li]; const ui='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c); if(ui>=0) return u[ui]; return c }).join('') },
    { name: 'Bold Sans', example: (t) => [...t].map(c => { const s='abcdefghijklmnopqrstuvwxyz', b=[...'𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'], u=[...'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭']; const li=s.indexOf(c); if(li>=0) return b[li]; const ui='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c); if(ui>=0) return u[ui]; return c }).join('') },
    { name: 'Bold Fraktur', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'𝖆',b:'𝖇',c:'𝖈',d:'𝖉',e:'𝖊',f:'𝖋',g:'𝖌',h:'𝖍',i:'𝖎',j:'𝖏',k:'𝖐',l:'𝖑',m:'𝖒',n:'𝖓',o:'𝖔',p:'𝖕',q:'𝖖',r:'𝖗',s:'𝖘',t:'𝖙',u:'𝖚',v:'𝖛',w:'𝖜',x:'𝖝',y:'𝖞',z:'𝖟',A:'𝕬',B:'𝕭',C:'𝕮',D:'𝕯',E:'𝕰',F:'𝕱',G:'𝕲',H:'𝕳',I:'𝕴',J:'𝕵',K:'𝕶',L:'𝕷',M:'𝕸',N:'𝕹',O:'𝕺',P:'𝕻',Q:'𝕼',R:'𝕽',S:'𝕾',T:'𝕿',U:'𝖀',V:'𝖁',W:'𝖂',X:'𝖃',Y:'𝖄',Z:'𝖅'}; return map[c] || c }).join('') },
  ],
  Caps: [
    { name: 'Small Caps', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'}; return map[c.toLowerCase()] || c }).join('') },
    { name: 'Fullwidth', example: (t) => [...t].map(c => { const code=c.charCodeAt(0); if(code>=33&&code<=126) return String.fromCodePoint(code+65248); return c }).join('') },
    { name: 'Upside Down', example: (t) => [...t.split('').reverse()].map(c => { const map: Record<string,string>={a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z'}; return map[c.toLowerCase()] || c }).join('') },
    { name: 'Mirror Text', example: (t) => t.split('').reverse().join('') },
  ],
  Fancy: [
    { name: 'Double Struck', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'𝕒',b:'𝕓',c:'𝕔',d:'𝕕',e:'𝕖',f:'𝕗',g:'𝕘',h:'𝕙',i:'𝕚',j:'𝕛',k:'𝕜',l:'𝕝',m:'𝕞',n:'𝕟',o:'𝕠',p:'𝕡',q:'𝕢',r:'𝕣',s:'𝕤',t:'𝕥',u:'𝕦',v:'𝕧',w:'𝕨',x:'𝕩',y:'𝕪',z:'𝕫',A:'𝔸',B:'𝔹',C:'ℂ',D:'𝔻',E:'𝔼',F:'𝔽',G:'𝔾',H:'ℍ',I:'𝕀',J:'𝕁',K:'𝕂',L:'𝕃',M:'𝕄',N:'ℕ',O:'𝕆',P:'ℙ',Q:'ℚ',R:'ℝ',S:'𝕊',T:'𝕋',U:'𝕌',V:'𝕍',W:'𝕎',X:'𝕏',Y:'𝕐',Z:'ℤ'}; return map[c] || c }).join('') },
    { name: 'Gothic / Fraktur', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'𝔞',b:'𝔟',c:'𝔠',d:'𝔡',e:'𝔢',f:'𝔣',g:'𝔤',h:'𝔥',i:'𝔦',j:'𝔧',k:'𝔨',l:'𝔩',m:'𝔪',n:'𝔫',o:'𝔬',p:'𝔭',q:'𝔮',r:'𝔯',s:'𝔰',t:'𝔱',u:'𝔲',v:'𝔳',w:'𝔴',x:'𝔵',y:'𝔶',z:'𝔷',A:'𝔄',B:'𝔅',C:'ℭ',D:'𝔇',E:'𝔈',F:'𝔉',G:'𝔊',H:'ℌ',I:'ℑ',J:'𝔍',K:'𝔎',L:'𝔏',M:'𝔐',N:'𝔑',O:'𝔒',P:'𝔓',Q:'𝔔',R:'ℜ',S:'𝔖',T:'𝔗',U:'𝔘',V:'𝔙',W:'𝔚',X:'𝔛',Y:'𝔜',Z:'ℨ'}; return map[c] || c }).join('') },
    { name: 'Monospace', example: (t) => [...t].map(c => { const s='abcdefghijklmnopqrstuvwxyz', m=[...'𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'], u=[...'𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉']; const li=s.indexOf(c); if(li>=0) return m[li]; const ui='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c); if(ui>=0) return u[ui]; return c }).join('') },
    { name: 'Italic Sans', example: (t) => [...t].map(c => { const s='abcdefghijklmnopqrstuvwxyz', m=[...'𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'], u=[...'𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡']; const li=s.indexOf(c); if(li>=0) return m[li]; const ui='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c); if(ui>=0) return u[ui]; return c }).join('') },
  ],
  Special: [
    { name: '★ Star Borders ★', example: (t) => `✦ ${t} ✦` },
    { name: '« Arrow Quotes »', example: (t) => `« ${t} »` },
    { name: '꧁ Crown Style ꧂', example: (t) => `꧁${t}꧂` },
    { name: '🔥 Fire Text 🔥', example: (t) => `🔥 ${t} 🔥` },
    { name: '【 Box Style 】', example: (t) => `【 ${t} 】` },
    { name: '⚡ Thunder ⚡', example: (t) => `⚡ ${t} ⚡` },
    { name: '✿ Flower ✿', example: (t) => `✿ ${t} ✿` },
    { name: '彡 Japanese ミ', example: (t) => `彡 ${t} ミ` },
    { name: '•͡˘㇁•͡˘ Cute', example: (t) => `•͡˘ ${t} ˘͡•` },
    { name: '⌨ Keyboard ⌨', example: (t) => `⌨ ${t} ⌨` },
  ],
  Strikethrough: [
    { name: 'Strikethrough', example: (t) => [...t].map(c => c + '̶').join('') },
    { name: 'Underline', example: (t) => [...t].map(c => c + '̲').join('') },
    { name: 'Dotted Under', example: (t) => [...t].map(c => c + '̤').join('') },
    { name: 'Overline', example: (t) => [...t].map(c => c + '̄').join('') },
    { name: 'Double Underline', example: (t) => [...t].map(c => c + '͇').join('') },
    { name: 'Wave Under', example: (t) => [...t].map(c => c + '̰').join('') },
  ],
  Unicode: [
    { name: 'Bubble Letters', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ',A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'Ⓗ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ'}; return map[c] || c }).join('') },
    { name: 'Squared Letters', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'🄰',b:'🄱',c:'🄲',d:'🄳',e:'🄴',f:'🄵',g:'🄶',h:'🄷',i:'🄸',j:'🄹',k:'🄺',l:'🄻',m:'🄼',n:'🄽',o:'🄾',p:'🄿',q:'🅀',r:'🅁',s:'🅂',t:'🅃',u:'🅄',v:'🅅',w:'🅆',x:'🅇',y:'🅈',z:'🅉'}; return map[c.toLowerCase()] || c }).join('') },
    { name: 'Negative Squared', example: (t) => [...t].map(c => { const map: Record<string,string>={a:'🅰',b:'🅱',c:'🅲',d:'🅳',e:'🅴',f:'🅵',g:'🅶',h:'🅷',i:'🅸',j:'🅹',k:'🅺',l:'🅻',m:'🅼',n:'🅽',o:'🅾',p:'🅿'}; return map[c.toLowerCase()] || c }).join('') },
    { name: 'Parenthesized', example: (t) => [...t].map(c => { const a=c.toLowerCase().charCodeAt(0); if(a>=97&&a<=122) return String.fromCodePoint(0x249C+a-97); return c }).join('') },
  ],
}

const SAMPLE = 'Hello World'

export default function KeyboardSection() {
  const [input, setInput] = useState('Hello World')
  const [activeCategory, setActiveCategory] = useState('Curvy')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch { /* fallback */ }
  }

  const pickRandom = () => {
    const cats = Object.keys(keyboardStyles)
    setActiveCategory(cats[Math.floor(Math.random() * cats.length)])
  }

  const displayText = input.trim() || SAMPLE
  const totalStyles = Object.values(keyboardStyles).reduce((s, a) => s + a.length, 0)

  return (
    <section id="keyboard" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
            <Keyboard className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-semibold">Keyboard Styles</span>
          </div>
          <h2 className="section-heading font-anime gradient-text mb-4" style={{ letterSpacing: '1px' }}>
            KEYBOARD STYLES
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            {totalStyles} styles available. Type your text, pick a style, copy and paste anywhere.
          </p>
        </div>

        {/* Text input */}
        <div className="max-w-2xl mx-auto mb-10">
          <label className="block text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Type your text below:</label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type something..."
            className="w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:border-primary transition-colors"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
        </div>

        {/* Category tabs + random button */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 items-center">
          {Object.keys(keyboardStyles).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'hover:border-primary/40'}`}
              style={activeCategory !== cat ? { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-card)' } : {}}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={pickRandom}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border border-secondary/40 text-secondary hover:bg-secondary/10 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" /> Random
          </button>
        </div>

        {/* Style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyboardStyles[activeCategory].map(style => {
            const converted = style.example(displayText)
            const key = `${style.name}`
            return (
              <div
                key={style.name}
                className="rounded-2xl p-5 card-hover glow-border group border"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">{style.name}</span>
                  <button
                    onClick={() => handleCopy(converted, key)}
                    className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 border transition-all hover:border-primary/40"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                  >
                    {copied === key ? (
                      <><Check className="w-3 h-3 text-green-500" /><span className="text-green-500">Copied!</span></>
                    ) : (
                      <><Copy className="w-3 h-3" />Copy</>
                    )}
                  </button>
                </div>
                <div
                  className="rounded-xl px-4 py-3 text-base leading-relaxed min-h-[48px] break-all"
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {converted}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
