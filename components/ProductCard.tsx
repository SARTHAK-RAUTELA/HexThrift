import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  price: number; // paise
  category?: string;
  size?: string;
  image?: string;
  tag?: string;
  originalPrice?: number;
};

export default function ProductCard({ id, title, price, category, size, image, tag, originalPrice }: Props) {
  const priceInr = price / 100;
  const origInr = originalPrice ? originalPrice / 100 : null;
  const discount = origInr && origInr > priceInr ? Math.round((1 - priceInr / origInr) * 100) : null;

  return (
    <Link href={`/product/${id}`} className="prod-card" style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)', display: 'block',
      textDecoration: 'none', color: 'inherit',
    }}>
      {/* Image area */}
      <div style={{ height: 280, background: '#EFE8D4', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {discount
          ? <span style={{ position: 'absolute', top: 12, left: 12, background: '#F5C518', color: '#111', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 9px', borderRadius: 4, fontWeight: 700, zIndex: 1 }}>−{discount}%</span>
          : tag && <span style={{ position: 'absolute', top: 12, left: 12, background: '#111', color: '#fff', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 9px', borderRadius: 4, fontWeight: 700, zIndex: 1 }}>{tag}</span>
        }
        <span style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.06)', zIndex: 1, fontSize: 14 }}>♡</span>
        {image
          ? <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : (
            <svg viewBox="0 0 200 280" width="120" height="160">
              <ellipse cx="100" cy="58" rx="22" ry="20" fill="#c9b89a" />
              <rect x="62" y="72" width="76" height="130" fill="#0E7B8C" rx="4" />
              <rect x="42" y="82" width="22" height="88" fill="#0E7B8C" />
              <rect x="136" y="82" width="22" height="88" fill="#0E7B8C" />
            </svg>
          )
        }
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: '#111' }}>{title}</div>
          {(category || size) && (
            <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>
              {[category, size ? `Size ${size}` : null].filter(Boolean).join(' · ')}
            </div>
          )}
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#111', lineHeight: 1, textAlign: 'right', flexShrink: 0 }}>
          ₹{priceInr.toLocaleString('en-IN')}
          {origInr && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#aaa', textDecoration: 'line-through', fontWeight: 500, marginTop: 3, display: 'block' }}>₹{origInr.toLocaleString('en-IN')}</span>}
        </div>
      </div>
    </Link>
  );
}
