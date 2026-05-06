import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

type Product = { id: string; title: string; category?: string; created_at: string; };

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product and all its variants?')) return;
    setDeleting(id);
    await supabase.from('variants').delete().eq('product_id', id);
    await supabase.from('products').delete().eq('id', id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e8e4dc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#000', padding: '18px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <div>
          <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F5C518', letterSpacing: '0.06em', textDecoration: 'none' }}>HEXTHRIFT<span style={{ color: '#E8593C' }}>·</span></Link>
          <span style={{ color: '#666', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', marginLeft: 16 }}>Admin</span>
        </div>
        <Link href="/admin/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#E8593C', color: '#fff', borderRadius: 999, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
          + New product
        </Link>
      </header>

      <div style={{ padding: '36px 36px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: '0.02em', color: '#fff' }}>
            PRODUCTS <span style={{ color: '#E8593C', fontSize: 24 }}>({products.length})</span>
          </h1>
          <Link href="/" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>
            ← View storefront
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#666', fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div style={{ background: '#1a1a1a', borderRadius: 16, padding: 48, textAlign: 'center', border: '1px solid #2a2a2a' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#E8593C', marginBottom: 12 }}>NO PRODUCTS YET</div>
            <p style={{ color: '#666', marginBottom: 24 }}>Add your first product to start selling.</p>
            <Link href="/admin/new" style={{ display: 'inline-flex', padding: '13px 28px', background: '#E8593C', color: '#fff', borderRadius: 999, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Add first product →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontWeight: 600, fontSize: 15, color: '#fff', lineHeight: 1.3 }}>{p.title}</h3>
                    {p.category && (
                      <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#2a2a2a', color: '#E8593C', padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>
                        {p.category}
                      </span>
                    )}
                    <div style={{ fontSize: 11, color: '#555', marginTop: 8, letterSpacing: '0.08em' }}>
                      {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <Link href={`/product/${p.id}`} style={{ flex: 1, textAlign: 'center', padding: '9px', background: 'transparent', border: '1px solid #3a3a3a', borderRadius: 8, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, textDecoration: 'none' }}>
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    style={{ flex: 1, padding: '9px', background: deleting === p.id ? '#3a2a2a' : 'transparent', border: '1px solid #3a2a2a', borderRadius: 8, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E8593C', fontWeight: 600, cursor: deleting === p.id ? 'wait' : 'pointer', fontFamily: 'inherit' }}
                  >
                    {deleting === p.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
