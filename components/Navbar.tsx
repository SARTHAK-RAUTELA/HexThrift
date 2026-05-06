import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();

  return (
    <>
      {/* Announcement bar */}
      <div className="ann-bar" style={{
        background: '#111', color: '#fff', fontSize: 12,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        padding: '10px 24px', display: 'flex', justifyContent: 'center',
        gap: 32, alignItems: 'center', flexWrap: 'wrap',
      }}>
        <span>♻️ Sustainable thrift, hand-picked weekly</span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#666', display: 'inline-block' }} />
        <span>Free shipping on orders ₹2,499+ &nbsp;·&nbsp; code <b style={{ color: '#F5C518' }}>HEXFRESH</b></span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#666', display: 'inline-block' }} />
        <span>Now shipping pan-India 🚚</span>
      </div>

      {/* Header */}
      <header className="header-grid" style={{
        background: '#F6F1E4',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '18px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 32,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <nav style={{ display: 'flex', gap: 28, fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <Link href="/shop" style={{ color: '#111' }}>Shop</Link>
          <Link href="/shop" style={{ color: '#111' }}>Collections</Link>
          <Link href="/" style={{ color: '#111' }}>Lookbook</Link>
          <Link href="/" style={{ color: '#111' }}>Journal</Link>
        </nav>

        <Link href="/" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Paytone One', sans-serif", fontSize: 26,
          color: '#0E7B8C', lineHeight: 1, textDecoration: 'none',
        }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#F5C518', marginRight: 8, flexShrink: 0, display: 'inline-block' }} />
          HEXTHRIFT
        </Link>

        <nav style={{
          display: 'flex', justifyContent: 'flex-end',
          alignItems: 'center', gap: 24,
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <Link href="/" style={{ color: '#111' }}>Sell to us</Link>
          <Link href="/admin" style={{ color: '#111' }}>Admin</Link>
          <Link href="/cart" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#111', color: '#fff',
            padding: '8px 14px', borderRadius: 999,
            fontSize: 11, letterSpacing: '0.12em', textDecoration: 'none',
          }}>
            Bag
            {count > 0 && (
              <span style={{ background: '#F5C518', color: '#111', fontWeight: 700, padding: '1px 7px', borderRadius: 999, fontSize: 10 }}>
                {count}
              </span>
            )}
          </Link>
        </nav>
      </header>
    </>
  );
}
