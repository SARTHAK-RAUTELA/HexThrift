import Link from 'next/link';

export default function OrderSuccess() {
  return (
    <div style={{ background: '#F6F1E4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <div style={{ textAlign: 'center', maxWidth: 520, padding: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#0E7B8C', color: '#F5C518', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>✓</div>
        <h1 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 56, lineHeight: 0.95, color: '#0E7B8C' }}>
          ORDER<br />PLACED!
        </h1>
        <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.6, color: '#5b524a' }}>
          Thanks for shopping with HexThrift! We&apos;ll pack your order with care and ship it within 1–2 business days. You&apos;ll receive a tracking link via email.
        </p>
        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/shop" style={{ padding: '13px 28px', background: '#111', color: '#fff', borderRadius: 999, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
            Shop more →
          </Link>
          <Link href="/" style={{ padding: '13px 28px', background: '#F5C518', color: '#111', borderRadius: 999, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
