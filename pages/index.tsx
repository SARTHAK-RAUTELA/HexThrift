import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

type Product = {
  id: string;
  title: string;
  category?: string;
  variants?: { price: number; images?: string[] }[];
};

// Static placeholder products shown when no DB is connected
const STATIC_PRODUCTS = [
  { id: 's1', title: 'Vintage Wrangler Denim Jacket', category: 'Outerwear', size: 'M', price: 149900, originalPrice: 249900, bg: 'linear-gradient(180deg,#e9d2a8,#d4856a)' },
  { id: 's2', title: 'Crimson Boxy Knit Sweater', category: 'Knitwear', size: 'L', price: 89900, bg: 'linear-gradient(180deg,#f0e3c8,#c9b89a)', tag: 'NEW' },
  { id: 's3', title: "Champion Hoodie — Black", category: 'Hoodies', size: 'XL', price: 129900, bg: 'linear-gradient(180deg,#bcd4dc,#7e9ba8)', tag: "VINTAGE '90s" },
  { id: 's4', title: 'Brown Corduroy Overshirt', category: 'Shirts', size: 'M', price: 99900, originalPrice: 129900, bg: 'linear-gradient(180deg,#f5d4be,#a85a3a)' },
];

const CATS = [
  { href: '/shop?cat=black',  bg: 'linear-gradient(160deg,#3a3a3a 0%,#0d0d0d 100%)', badge: 'Streetwear', name: 'THE BLACK COLLECTION', count: '142 pieces' },
  { href: '/shop?cat=winter', bg: 'linear-gradient(160deg,#0E7B8C 0%,#063a44 100%)', badge: 'New ❄️',   name: 'WINTER ARMOUR',        count: '68 pieces' },
  { href: '/shop?cat=retro',  bg: 'linear-gradient(160deg,#d97a5a 0%,#5b1f10 100%)', badge: 'Vintage',   name: 'RETRO & FUNK',         count: '96 pieces' },
];

const RACK_COLORS = ['#d97a5a', '#fff', '#F5C518', '#1a1a1a', '#7B9AAB', '#cf3b2c', '#e9d2a8'];
const RACK_HEIGHTS = [60, 75, 55, 80, 65, 72, 58];

export default function Home({ products }: { products: Product[] }) {
  const displayProducts = products.length > 0 ? products : [];

  return (
    <div style={{ background: '#F6F1E4', color: '#111', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-section hero-grid" style={{ padding: '48px 48px 56px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, alignItems: 'end' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0E7B8C', display: 'inline-block' }} />
            Drop 12 · Spring &apos;26
          </span>
          <h1 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 'clamp(56px,9vw,148px)', lineHeight: 0.86, letterSpacing: '-0.02em', color: '#111', margin: '20px 0 0', position: 'relative' }}>
            SECOND-HAND<br />
            NEVER LOOKED<br />
            <span style={{ position: 'relative', display: 'inline', color: '#0E7B8C' }}>
              SO FIRST
              <span style={{ position: 'absolute', left: '-2%', right: '-2%', bottom: '6%', height: '18%', background: '#F5C518', zIndex: -1, borderRadius: 6, display: 'block' }} />
            </span>RATE.
          </h1>
          <p style={{ maxWidth: 520, marginTop: 24, color: '#5b524a', lineHeight: 1.6, fontSize: 16 }}>
            Curated thrift from across India. We sort, steam, and ship — you wear it like it was made for you. Every piece keeps something out of a landfill.
          </p>
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 20, fontSize: 13, flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 999, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, background: '#111', color: '#fff' }}>
              Shop the drop →
            </Link>
            <span style={{ color: '#5b524a' }}><strong style={{ color: '#111' }}>4,200+</strong> pieces saved this season</span>
          </div>
        </div>

        {/* Hero right – photo collage */}
        <div style={{ position: 'relative', height: 520 }}>
          {/* Sticker */}
          <div style={{ position: 'absolute', top: -18, right: -12, width: 120, height: 120, background: '#F5C518', color: '#111', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: "'Paytone One', sans-serif", fontSize: 13, lineHeight: 1.1, transform: 'rotate(-12deg)', boxShadow: '0 10px 24px rgba(0,0,0,0.15)', zIndex: 5, padding: 8 }}>
            FRESH<br />WEEKLY
            <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 9, letterSpacing: '0.15em', marginTop: 4 }}>NEW IN MON 9AM</span>
          </div>
          {/* Photo 1 */}
          <div style={{ position: 'absolute', top: 0, bottom: 60, left: 0, right: 40, borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.25)', background: 'linear-gradient(160deg,#d97a5a 0%, #8a3920 100%)' }}>
            <svg viewBox="0 0 400 500" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMax slice">
              <ellipse cx="200" cy="120" rx="55" ry="62" fill="#e8c5a8" />
              <path d="M120 200 Q200 170 280 200 L300 500 L100 500 Z" fill="#0E7B8C" />
              <path d="M120 200 Q200 170 280 200 L290 280 Q200 260 110 280 Z" fill="#F5C518" opacity="0.85" />
            </svg>
            <div style={{ position: 'absolute', left: 14, bottom: 14, fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: '0.2em', color: '#fff', background: 'rgba(0,0,0,0.45)', padding: '4px 10px', borderRadius: 999 }}>EDITORIAL · 01</div>
          </div>
          {/* Photo 2 */}
          <div style={{ position: 'absolute', top: 80, bottom: 0, left: '50%', right: 0, borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.25)', background: 'linear-gradient(160deg,#0E7B8C 0%, #07424d 100%)' }}>
            <svg viewBox="0 0 300 400" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMax slice">
              <ellipse cx="150" cy="100" rx="50" ry="55" fill="#3a1a10" />
              <path d="M80 170 Q150 145 220 170 L240 400 L60 400 Z" fill="#f0e3c8" />
              <path d="M100 200 L200 200 L195 300 L105 300 Z" fill="#1a1a1a" />
            </svg>
            <div style={{ position: 'absolute', left: 14, bottom: 14, fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: '0.2em', color: '#fff', background: 'rgba(0,0,0,0.45)', padding: '4px 10px', borderRadius: 999 }}>DENIM · 02</div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div style={{ background: '#F5C518', color: '#111', padding: '14px 0', overflow: 'hidden', borderTop: '2px solid #111', borderBottom: '2px solid #111' }}>
        <div className="marquee-track" style={{ gap: 48, fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.08em' }}>
          {[0, 1].map(n => (
            <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 40, paddingRight: 48 }}>
              WORN ONCE <span style={{ color: '#0E7B8C' }}>·</span> LOVED TWICE <span style={{ color: '#0E7B8C' }}>·</span> CURATED THRICE <span style={{ color: '#0E7B8C' }}>·</span>
              WORN ONCE <span style={{ color: '#0E7B8C' }}>·</span> LOVED TWICE <span style={{ color: '#0E7B8C' }}>·</span> CURATED THRICE <span style={{ color: '#0E7B8C' }}>·</span>
              WORN ONCE <span style={{ color: '#0E7B8C' }}>·</span> LOVED TWICE <span style={{ color: '#0E7B8C' }}>·</span> CURATED THRICE <span style={{ color: '#0E7B8C' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="section-pad" style={{ padding: '80px 48px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
          <div>
            <Pill>Shop by mood</Pill>
            <h2 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 'clamp(38px,5vw,68px)', lineHeight: 0.95, letterSpacing: '-0.01em', marginTop: 12 }}>
              PICK YOUR<br />UNIVERSE.
            </h2>
          </div>
          <div style={{ fontSize: 14, color: '#5b524a', maxWidth: 380, lineHeight: 1.55 }}>
            Three worlds, one closet. Every category has its own vibe — and its own collection page tuned to match.
          </div>
          <SeeAllLink href="/shop">All categories →</SeeAllLink>
        </div>

        <div className="cats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {CATS.map(cat => (
            <Link key={cat.name} href={cat.href} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', height: 520, background: cat.bg, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24, textDecoration: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 30%, rgba(0,0,0,0.65) 100%)' }} />
              <div style={{ position: 'absolute', top: 18, left: 18, background: '#fff', color: '#111', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 999, fontWeight: 600 }}>{cat.badge}</div>
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: '0.05em' }}>{cat.name}</div>
                  <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85 }}>{cat.count}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F5C518', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Promo strip ── */}
      <section className="promo-strip promo-grid" style={{ margin: '0 48px', background: '#0E7B8C', color: '#fff', borderRadius: 24, padding: 48, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 280, height: 280, borderRadius: '50%', background: '#F5C518', opacity: 0.15 }} />
        <div>
          <h3 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 'clamp(36px,4vw,54px)', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            SELL US YOUR<br />OLD{' '}
            <em style={{ fontStyle: 'normal', color: '#F5C518' }}>TREASURES.</em>
          </h3>
          <p style={{ marginTop: 14, fontSize: 15, opacity: 0.85, maxWidth: 440, lineHeight: 1.6 }}>
            Got pieces you don&apos;t wear anymore? Mail them to us with our pre-paid label. We pay you in cash or 1.5× store credit. India only.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 22px', borderRadius: 999, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, background: '#F5C518', color: '#111' }}>Get a label</a>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 22px', borderRadius: 999, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)' }}>How it works</a>
          </div>
        </div>
        <div style={{ position: 'relative', height: 240 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 30, height: 6, background: '#999', borderRadius: 3 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.08)', borderRadius: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 18, gap: 6 }}>
            {RACK_HEIGHTS.map((h, i) => (
              <div key={i} style={{ width: 36, height: `${h}%`, borderRadius: '6px 6px 14px 14px', background: RACK_COLORS[i] }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Fresh Finds ── */}
      <section className="section-pad" style={{ padding: '80px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
          <div>
            <Pill>Just dropped</Pill>
            <h2 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 'clamp(38px,5vw,68px)', lineHeight: 0.95, letterSpacing: '-0.01em', marginTop: 12 }}>
              THIS WEEK&apos;S<br />FRESH FINDS.
            </h2>
          </div>
          <div style={{ fontSize: 14, color: '#5b524a', maxWidth: 380, lineHeight: 1.55 }}>
            42 new pieces sorted, steamed, photographed and listed every Monday at 9am IST. Once they&apos;re gone, they&apos;re gone.
          </div>
          <SeeAllLink href="/shop">View all →</SeeAllLink>
        </div>

        <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {displayProducts.length > 0
            ? displayProducts.slice(0, 8).map(p => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.variants?.[0]?.price ?? 0}
                  category={p.category}
                  image={p.variants?.[0]?.images?.[0]}
                />
              ))
            : STATIC_PRODUCTS.map(p => (
                <StaticCard key={p.id} {...p} />
              ))
          }
        </div>
      </section>

      {/* ── Editorial ── */}
      <section id="editorial" className="ed-section ed-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: '0 48px 80px' }}>
        {[
          { bg: 'linear-gradient(135deg,#1a1a1a 0%, #3a2820 100%)', kicker: 'Journal · Sustainability', title: "WHY ONE MAN'S CAST-OFF IS ANOTHER'S DAILY DRIVER.", cta: 'Read the piece →' },
          { bg: 'linear-gradient(135deg,#0E7B8C 0%, #051f25 100%)', kicker: "Lookbook · Spring '26", title: "THE UNIFORM — STYLED BY KOLKATA'S YOUNGEST CURATOR.", cta: 'See the lookbook →' },
        ].map(ed => (
          <a key={ed.title} href="#" style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', height: 380, color: '#fff', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: ed.bg, textDecoration: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%, rgba(0,0,0,0.7))' }} />
            <span style={{ position: 'relative', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.8, fontWeight: 600 }}>{ed.kicker}</span>
            <h4 style={{ position: 'relative', fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, letterSpacing: '0.02em', marginTop: 8, maxWidth: 380 }}>{ed.title}</h4>
            <span style={{ position: 'relative', marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>{ed.cta}</span>
          </a>
        ))}
      </section>

      <Footer />
    </div>
  );
}

// ── Small shared sub-components ──────────────────────────────────────────────

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0E7B8C', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function SeeAllLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '2px solid #111', paddingBottom: 4, color: '#111' }}>
      {children}
    </Link>
  );
}

function StaticCard({ title, category, size, price, originalPrice, bg, tag }: (typeof STATIC_PRODUCTS)[0]) {
  const priceInr = price / 100;
  const origInr = originalPrice ? originalPrice / 100 : null;
  const discount = origInr ? Math.round((1 - priceInr / origInr) * 100) : null;
  return (
    <Link href="/shop" className="prod-card" style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div style={{ height: 280, background: bg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {discount
          ? <span style={{ position: 'absolute', top: 12, left: 12, background: '#F5C518', color: '#111', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 9px', borderRadius: 4, fontWeight: 700 }}>−{discount}%</span>
          : tag && <span style={{ position: 'absolute', top: 12, left: 12, background: '#111', color: '#fff', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 9px', borderRadius: 4, fontWeight: 700 }}>{tag}</span>
        }
        <span style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>♡</span>
        <svg viewBox="0 0 200 280" width="100" height="140">
          <ellipse cx="100" cy="58" rx="22" ry="20" fill="rgba(255,255,255,0.3)" />
          <rect x="62" y="72" width="76" height="130" fill="rgba(255,255,255,0.2)" rx="4" />
          <rect x="42" y="82" width="22" height="88" fill="rgba(255,255,255,0.2)" />
          <rect x="136" y="82" width="22" height="88" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>
      <div style={{ padding: '14px 16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{category} · Size {size}</div>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, textAlign: 'right', flexShrink: 0 }}>
          ₹{priceInr.toLocaleString('en-IN')}
          {origInr && <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#aaa', textDecoration: 'line-through', fontWeight: 500, marginTop: 3, display: 'block' }}>₹{origInr.toLocaleString('en-IN')}</span>}
        </div>
      </div>
    </Link>
  );
}

// ── Data fetching ────────────────────────────────────────────────────────────

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await supabase
      .from('products')
      .select('id, title, category, variants(price, images)')
      .limit(8);
    return { props: { products: data || [] } };
  } catch {
    return { props: { products: [] } };
  }
};
