import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';

type Variant = { id: string; price: number; images?: string[]; size?: string; color?: string; };
type Product = { id: string; title: string; description?: string; category?: string; };

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const FEATURES = [
  { title: '3X Breathable', desc: 'Triple-layer reclaimed membrane lets the piece breathe even at full output. No condensation, no swamp.' },
  { title: 'Sourced Locally', desc: 'Picked from verified sellers across India. We inspect, steam and deep-clean every item before listing.' },
  { title: 'Condition Rated', desc: 'Each item gets a condition score out of 10. What you see is what you get — no surprises at the door.' },
  { title: 'Secure Payment', desc: 'Razorpay-secured checkout. UPI, cards, net banking. Pan-India delivery in 4–6 business days.' },
];

const PLACEHOLDER_COLORS = [
  { label: 'Bone', bg: '#e8dcc4', circle: '#a89d8c' },
  { label: 'Red',  bg: '#cf3b2c', circle: '#7a1c14' },
  { label: 'Black',bg: '#1a1a1a', circle: '#3a3a3a' },
  { label: 'Slate',bg: '#3a4a5a', circle: '#1a2a3a' },
];

export default function ProductPage({ product, variants }: { product: Product | null; variants: Variant[] }) {
  const router = useRouter();
  const { addItem, count } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [added, setAdded] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  if (!product) {
    return (
      <div style={{ background: '#1A1A1A', color: '#e8e4dc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: '#E8593C' }}>404</div>
          <p style={{ marginTop: 12, color: '#aaa' }}>Product not found</p>
          <Link href="/shop" style={{ marginTop: 20, display: 'inline-flex', padding: '12px 24px', background: '#E8593C', color: '#fff', borderRadius: 999, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
            Back to shop →
          </Link>
        </div>
      </div>
    );
  }

  const activeVariant = variants[0];
  const price = activeVariant?.price ?? 0;
  const priceInr = price / 100;
  const image = activeVariant?.images?.[0];

  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      variantId: activeVariant?.id ?? product.id,
      title: product.title,
      price,
      quantity: 1,
      size: selectedSize,
      color: PLACEHOLDER_COLORS[selectedColor].label,
      image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    handleAddToBag();
    router.push('/cart');
  };

  return (
    <div style={{ background: '#1A1A1A', color: '#e8e4dc', fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(232,89,60,0.05), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.03), transparent 50%)' }}>

      {/* Announcement */}
      <div style={{ background: '#000', color: '#999', textAlign: 'center', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: 9 }}>
        FREE EXPRESS SHIPPING ABOVE ₹4,999 · USE <b style={{ color: '#E8593C' }}>ASTRO15</b> FOR 15% OFF
      </div>

      {/* Header */}
      <header style={{ padding: '18px 36px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 32, borderBottom: '1px solid #2a2a2a', background: 'rgba(15,15,15,0.7)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.06em', color: '#fff', textDecoration: 'none' }}>
          HEXTHRIFT<span style={{ color: '#E8593C' }}>·</span>
        </Link>
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#aaa', fontWeight: 500 }}>
          <Link href="/" style={{ color: '#aaa' }}>Home</Link>
          <Link href="/shop" style={{ color: '#aaa' }}>Shop</Link>
          <Link href="/shop" style={{ color: '#aaa' }}>Collections</Link>
        </nav>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <Link href="/cart" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#aaa', position: 'relative' }}>
            Bag{count > 0 && <span style={{ position: 'absolute', top: -8, right: -12, background: '#E8593C', color: '#fff', fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 999 }}>{count}</span>}
          </Link>
        </div>
      </header>

      {/* Main product */}
      <div style={{ margin: 24, background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 16, overflow: 'hidden' }}>
        <section className="pdp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 32, padding: 48, position: 'relative' }}>

          {/* Left – meta */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8593C', fontWeight: 600, marginBottom: 14 }}>★ NEW · {product.category || 'DROP'}</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px,6vw,84px)', lineHeight: 0.88, letterSpacing: '0.02em', color: '#fff', textTransform: 'uppercase' }}>
              {product.title}
            </h1>
            <div style={{ marginTop: 18, fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: '#fff', letterSpacing: '0.02em' }}>
              ₹{priceInr.toLocaleString('en-IN')}
            </div>

            <div style={{ marginTop: 32, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8593C', fontWeight: 600, borderBottom: '1px solid #2a2a2a', paddingBottom: 8 }}>Description</div>
            <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.65, color: '#aaa', maxWidth: 300 }}>
              {product.description || 'Hand-selected, deep-steamed, and ready to wear. One previous owner, condition rated before listing. Every piece passes our quality check before shipping.'}
            </p>

            <div style={{ marginTop: 24, borderTop: '1px solid #2a2a2a' }}>
              {['Sizing & fit', 'Provenance & condition', 'Care instructions'].map(item => (
                <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #2a2a2a', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8593C', fontWeight: 600, cursor: 'pointer' }}>
                  {item} <span style={{ color: '#666', fontSize: 12 }}>+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center – image */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 560 }}>
            <div style={{ position: 'absolute', width: '90%', height: '90%', background: 'radial-gradient(circle, rgba(232,89,60,0.12) 0%, transparent 60%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            {/* Corner brackets */}
            {[{ top: 0, left: 0, borderRight: 0, borderBottom: 0 }, { top: 0, right: 0, borderLeft: 0, borderBottom: 0 }, { bottom: 0, left: 0, borderRight: 0, borderTop: 0 }, { bottom: 0, right: 0, borderLeft: 0, borderTop: 0 }].map((s, i) => (
              <span key={i} style={{ position: 'absolute', width: 20, height: 20, border: '1px solid #444', ...s }} />
            ))}
            <div style={{ position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#666' }}>
              <span>SKU</span><b style={{ color: '#fff' }}>HEX-{product.id.slice(0, 6).toUpperCase()}</b>
              <span style={{ marginTop: 8 }}>CONDITION</span><b style={{ color: '#fff' }}>9.2 / 10</b>
            </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 480, aspectRatio: '1' }}>
              {image
                ? <img src={image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))' }} />
                : (
                  <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))' }} preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="jck" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f5ede0" /><stop offset="1" stopColor="#a89d8c" /></linearGradient>
                      <linearGradient id="hood" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3a2a1a" /><stop offset="1" stopColor="#E8593C" /></linearGradient>
                    </defs>
                    <ellipse cx="250" cy="120" rx="90" ry="90" fill="url(#jck)" />
                    <ellipse cx="250" cy="125" rx="65" ry="60" fill="url(#hood)" />
                    <path d="M120 200 Q250 170 380 200 L400 460 L100 460 Z" fill="url(#jck)" />
                    <path d="M70 220 L120 200 L130 380 L80 400 Z" fill="url(#jck)" />
                    <path d="M430 220 L380 200 L370 380 L420 400 Z" fill="url(#jck)" />
                    <path d="M150 240 L350 240 M150 280 L350 280 M150 320 L350 320 M150 360 L350 360 M150 400 L350 400" stroke="#a89d8c" strokeWidth="1.5" opacity="0.5" fill="none" />
                    <line x1="250" y1="200" x2="250" y2="460" stroke="#5a4a3a" strokeWidth="2" />
                    <rect x="290" y="280" width="60" height="50" fill="#E8593C" rx="4" />
                    <circle cx="320" cy="305" r="10" fill="#fff" opacity="0.4" />
                    <circle cx="320" cy="230" r="14" fill="#E8593C" />
                    <circle cx="320" cy="230" r="6" fill="#fff" opacity="0.7" />
                  </svg>
                )
              }
            </div>
          </div>

          {/* Right – options */}
          <div>
            {/* Size */}
            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8593C', marginBottom: 14, fontWeight: 600 }}>Size</h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 42, height: 42, borderRadius: '50%', border: `1px solid ${selectedSize === s ? '#E8593C' : '#2a2a2a'}`, background: selectedSize === s ? '#E8593C' : 'transparent', color: selectedSize === s ? '#fff' : '#aaa', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                ))}
              </div>
              <a href="#" style={{ marginTop: 14, display: 'inline-block', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', borderBottom: '1px solid #444', paddingBottom: 2, fontWeight: 600 }}>Size guide →</a>
            </div>

            {/* Colour */}
            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8593C', marginBottom: 14, fontWeight: 600 }}>Colour</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {PLACEHOLDER_COLORS.map((c, i) => (
                  <button key={c.label} onClick={() => setSelectedColor(i)} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden', border: `1px solid ${selectedColor === i ? '#E8593C' : '#2a2a2a'}`, cursor: 'pointer', background: c.bg, padding: 0 }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}><circle cx="50" cy="50" r="20" fill={c.circle} /></svg>
                    <span style={{ position: 'absolute', left: 6, bottom: 5, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 3 }}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              <button
                onClick={handleAddToBag}
                style={{ padding: '14px 24px', borderRadius: 999, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, border: '1px solid #fff', background: 'transparent', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
              >
                {added ? '✓ Added to bag!' : '♡  Favourite / Save'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={checkoutLoading}
                style={{ padding: '14px 24px', borderRadius: 999, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, border: '1px solid #E8593C', background: '#E8593C', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {checkoutLoading ? 'Loading...' : `Add to bag — ₹${priceInr.toLocaleString('en-IN')}`}
              </button>
            </div>

            <div style={{ marginTop: 14, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', lineHeight: 1.7 }}>
              ✓ Razorpay secure · UPI · Cards<br />
              ✓ Pan-India shipping in 4–6 days<br />
              ✓ 7-day fit-check returns
            </div>
          </div>
        </section>

        {/* 4-col features */}
        <div style={{ borderTop: '1px solid #2a2a2a', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{ padding: '32px 28px', borderRight: i < 3 ? '1px solid #2a2a2a' : undefined }}>
              <h5 style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8593C', marginBottom: 12, fontWeight: 700 }}>{f.title}</h5>
              <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related strip */}
      {variants.length > 0 || true ? (
        <div style={{ margin: 24, background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 16, padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: '0.04em', color: '#fff' }}>YOU MIGHT ALSO LIKE.</h3>
            <Link href="/shop" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8593C', fontWeight: 600, borderBottom: '1px solid #E8593C', paddingBottom: 2 }}>All products →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {RELATED_ITEMS.map(item => (
              <Link key={item.name} href="/shop" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ aspectRatio: '1', background: item.bg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 200 200" style={{ width: '60%', height: '60%' }}>
                    <ellipse cx="100" cy="60" rx="32" ry="36" fill="rgba(255,255,255,0.15)" />
                    <path d="M50 110 Q100 90 150 110 L155 200 L45 200 Z" fill="rgba(255,255,255,0.15)" />
                  </svg>
                </div>
                <div style={{ padding: '14px 16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', fontWeight: 500, lineHeight: 1.3 }}>{item.name}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#666', marginTop: 4 }}>{item.cat}</div>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: '#E8593C', flexShrink: 0 }}>₹{item.price.toLocaleString('en-IN')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <footer style={{ margin: '0 24px 24px', background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '32px 36px', fontSize: 12, color: '#666', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        <span>© 2026 <b style={{ color: '#fff' }}>HEXTHRIFT</b> · ALL RIGHTS RESERVED</span>
        <span>INR · RAZORPAY · UPI · CARDS · NET BANKING</span>
      </footer>
    </div>
  );
}

const RELATED_ITEMS = [
  { name: 'Stealth Black Heavy Puffer', cat: 'Puffer · M', price: 6499, bg: 'linear-gradient(160deg,#1a1a1a,#0a0a0a)' },
  { name: 'Glacier White Puffer', cat: 'Puffer · L', price: 5999, bg: 'linear-gradient(160deg,#dbe8ed,#9cbfcc)' },
  { name: 'Crimson Liner Vest', cat: 'Vest · M', price: 3299, bg: 'linear-gradient(160deg,#3a2820,#1a0a04)' },
  { name: 'Heavyweight Hoodie', cat: 'Hoodie · XL', price: 1499, bg: 'linear-gradient(160deg,#2a2a2a,#0a0a0a)' },
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;
  try {
    const [{ data: product }, { data: variants }] = await Promise.all([
      supabase.from('products').select('*').eq('id', id).single(),
      supabase.from('variants').select('*').eq('product_id', id),
    ]);
    return { props: { product: product || null, variants: variants || [] } };
  } catch {
    return { props: { product: null, variants: [] } };
  }
};
