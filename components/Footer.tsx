import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-wrap" style={{ background: '#111', color: '#bbb', padding: '64px 48px 32px' }}>
      <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 36, color: '#F5C518', lineHeight: 1 }}>
            HEXTHRIFT<sup style={{ fontSize: 18 }}>★</sup>
          </div>
          <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
            HexThrift. Sustainable, sorted, second-hand.
            Based in Bangalore — shipping pan-India via Razorpay-secured checkout.
          </p>
        </div>

        <div>
          <h5 style={{ color: '#fff', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>Shop</h5>
          {['New in', 'Black Collection', 'Winter', 'Retro', 'Sale'].map(l => (
            <Link key={l} href="/shop" style={{ display: 'block', fontSize: 13, lineHeight: 2 }}>{l}</Link>
          ))}
        </div>

        <div>
          <h5 style={{ color: '#fff', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>Help</h5>
          {['Sizing', 'Returns', 'Shipping', 'FAQ'].map(l => (
            <Link key={l} href="/" style={{ display: 'block', fontSize: 13, lineHeight: 2 }}>{l}</Link>
          ))}
        </div>

        <div>
          <h5 style={{ color: '#fff', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>Brand</h5>
          {['Our story', 'Sell to us', 'Press', 'Contact'].map(l => (
            <Link key={l} href="/" style={{ display: 'block', fontSize: 13, lineHeight: 2 }}>{l}</Link>
          ))}
        </div>

        <div>
          <h5 style={{ color: '#fff', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>Newsletter</h5>
          <p style={{ fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>Drops, journal, occasional 10% off codes.</p>
          <div style={{ display: 'flex', background: '#1f1f1f', borderRadius: 999, padding: 4 }}>
            <input
              style={{ background: 'transparent', border: 0, outline: 0, color: '#fff', padding: '8px 12px', flex: 1, fontFamily: 'inherit', fontSize: 12 }}
              placeholder="you@email.com"
              type="email"
            />
            <button style={{ background: '#F5C518', color: '#111', padding: '8px 14px', borderRadius: 999, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, border: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
              Join
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 12 }}>
        <div>© 2026 HexThrift · ♻️ Carbon-neutral shipping</div>
        <div>INR · Razorpay · UPI · Cards · Net Banking</div>
      </div>
    </footer>
  );
}
