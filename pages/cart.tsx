import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

declare global {
  interface Window {
    Razorpay: new (opts: Record<string, unknown>) => { open(): void };
  }
}

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, total, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [rzpReady, setRzpReady] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = () => setRzpReady(true);
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  const handleCheckout = async () => {
    if (!rzpReady) { setMessage('Payment gateway loading…'); return; }
    if (items.length === 0) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: null,
          items: items.map(i => ({ variantId: i.variantId, qty: i.quantity })),
          shipping: 0,
        }),
      });
      if (!res.ok) throw new Error('Order creation failed');
      const { razorpayOrderId, key } = await res.json();

      const rzp = new window.Razorpay({
        key,
        amount: total,
        currency: 'INR',
        order_id: razorpayOrderId,
        name: "HexThrift",
        description: 'Thrift clothing order',
        theme: { color: '#0E7B8C' },
        handler: () => {
          clearCart();
          window.location.href = '/order-success';
        },
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage('Checkout failed — please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#F6F1E4', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#111' }}>
      {/* Header */}
      <header style={{ background: '#111', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 24, color: '#F5C518', textDecoration: 'none' }}>HEXTHRIFT</Link>
        <span style={{ color: '#aaa', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Your bag</span>
        <Link href="/shop" style={{ color: '#F5C518', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Continue shopping →</Link>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>

        {/* Items */}
        <div>
          <h1 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 48, lineHeight: 0.95, marginBottom: 32 }}>
            YOUR BAG<br /><span style={{ color: '#0E7B8C' }}>({count} item{count !== 1 ? 's' : ''})</span>
          </h1>

          {items.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 16, padding: 48, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#0E7B8C', marginBottom: 12 }}>YOUR BAG IS EMPTY</div>
              <p style={{ color: '#888', marginBottom: 24 }}>Find something you love in our collection.</p>
              <Link href="/shop" style={{ display: 'inline-flex', padding: '13px 28px', background: '#111', color: '#fff', borderRadius: 999, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                Shop now →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
                  {/* Image placeholder */}
                  <div style={{ width: 100, height: 120, background: '#EFE8D4', borderRadius: 10, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.image
                      ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <svg viewBox="0 0 100 130" width="60"><ellipse cx="50" cy="26" rx="14" ry="12" fill="#0E7B8C" opacity="0.4" /><rect x="28" y="36" width="44" height="70" fill="#0E7B8C" opacity="0.4" rx="3" /></svg>
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && ' · '}
                      {item.color && `Colour: ${item.color}`}
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 999, overflow: 'hidden' }}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: 36, height: 36, border: 0, background: 'transparent', fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' }}>−</button>
                        <span style={{ minWidth: 32, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: 36, height: 36, border: 0, background: 'transparent', fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' }}>+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{ fontSize: 11, color: '#E8593C', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Remove</button>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, flexShrink: 0 }}>
                    ₹{((item.price * item.quantity) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order summary */}
        {items.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: 24 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '0.04em', marginBottom: 20 }}>ORDER SUMMARY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Subtotal ({count} items)</span>
                <span style={{ fontWeight: 600 }}>₹{(total / 100).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Shipping</span>
                <span style={{ color: '#0E7B8C', fontWeight: 600 }}>Free</span>
              </div>
              <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                <span>Total</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24 }}>₹{(total / 100).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {message && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>
                {message}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{ marginTop: 24, width: '100%', padding: '16px', background: loading ? '#888' : '#0E7B8C', color: '#fff', borderRadius: 999, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, border: 0, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
            >
              {loading ? 'Processing…' : 'Pay with Razorpay →'}
            </button>

            <div style={{ marginTop: 14, textAlign: 'center', fontSize: 11, color: '#aaa', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ✓ UPI · Cards · Net Banking · Secure
            </div>

            <div style={{ marginTop: 20, padding: '16px', background: '#F6F1E4', borderRadius: 10 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Have a code?</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="HEXFRESH" style={{ flex: 1, padding: '10px 12px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, fontFamily: 'inherit', fontSize: 13, outline: 'none', background: '#fff' }} />
                <button style={{ padding: '10px 16px', background: '#111', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 0, cursor: 'pointer', fontFamily: 'inherit' }}>Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
