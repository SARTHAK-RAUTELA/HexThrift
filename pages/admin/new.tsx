import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

const CATEGORIES = ['black', 'winter', 'retro', 'other'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

type VariantRow = { price: string; size: string; images: string; color: string; };

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [variants, setVariants] = useState<VariantRow[]>([
    { price: '', size: 'M', images: '', color: '' },
  ]);

  const addVariant = () => setVariants(v => [...v, { price: '', size: 'M', images: '', color: '' }]);
  const removeVariant = (i: number) => setVariants(v => v.filter((_, idx) => idx !== i));
  const updateVariant = (i: number, field: keyof VariantRow, value: string) =>
    setVariants(v => v.map((row, idx) => idx === i ? { ...row, [field]: value } : row));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Product title is required.'); return; }
    if (variants.some(v => !v.price || isNaN(Number(v.price)))) {
      setError('All variants need a valid price in ₹.'); return;
    }
    setLoading(true);
    setError('');

    try {
      // Insert product
      const { data: product, error: pErr } = await supabase
        .from('products')
        .insert([{ title: title.trim(), description: description.trim() || null, category: category || null }])
        .select('*')
        .single();
      if (pErr) throw pErr;

      // Insert variants (price stored in paise)
      const variantRows = variants.map(v => ({
        product_id: product.id,
        price: Math.round(parseFloat(v.price) * 100),
        size: v.size || null,
        color: v.color.trim() || null,
        images: v.images.trim()
          ? v.images.trim().split('\n').map(u => u.trim()).filter(Boolean)
          : [],
      }));
      const { error: vErr } = await supabase.from('variants').insert(variantRows);
      if (vErr) throw vErr;

      router.push('/admin');
    } catch (err: any) {
      setError(err?.message || 'Failed to save product. Check your Supabase connection and schema.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 16px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, color: '#e8e4dc', fontFamily: 'inherit', fontSize: 14, outline: 'none' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8593C', fontWeight: 600, marginBottom: 8 };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e8e4dc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#000', padding: '18px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <div>
          <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F5C518', letterSpacing: '0.06em', textDecoration: 'none' }}>HEXTHRIFT<span style={{ color: '#E8593C' }}>·</span></Link>
          <span style={{ color: '#666', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', marginLeft: 16 }}>Admin</span>
        </div>
        <Link href="/admin" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600 }}>← Back to products</Link>
      </header>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, letterSpacing: '0.02em', color: '#fff', marginBottom: 36 }}>ADD NEW PRODUCT</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Product title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Vintage Wrangler Denim Jacket" style={inputStyle} required />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the item — fabric, condition, provenance…" rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              <option value="">— select category —</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          {/* Variants */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Variants (size / colour / price)</label>
              <button type="button" onClick={addVariant} style={{ padding: '8px 16px', background: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: 999, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                + Add variant
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {variants.map((v, i) => (
                <div key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, padding: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ ...labelStyle, fontSize: 10 }}>Price (₹) *</label>
                      <input type="number" min="0" step="0.01" value={v.price} onChange={e => updateVariant(i, 'price', e.target.value)} placeholder="1499" style={inputStyle} required />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: 10 }}>Size</label>
                      <select value={v.size} onChange={e => updateVariant(i, 'size', e.target.value)} style={inputStyle}>
                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: 10 }}>Colour</label>
                      <input value={v.color} onChange={e => updateVariant(i, 'color', e.target.value)} placeholder="e.g. Washed Blue" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ ...labelStyle, fontSize: 10 }}>Image URLs (one per line)</label>
                    <textarea value={v.images} onChange={e => updateVariant(i, 'images', e.target.value)} placeholder="https://…" rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
                  </div>
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(i)} style={{ marginTop: 12, fontSize: 11, color: '#E8593C', background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Remove variant ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ padding: '14px 18px', background: 'rgba(232,89,60,0.1)', border: '1px solid rgba(232,89,60,0.3)', borderRadius: 10, fontSize: 13, color: '#E8593C' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '16px', background: loading ? '#555' : '#E8593C', color: '#fff', borderRadius: 999, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, border: 0, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
              {loading ? 'Saving…' : 'Save product →'}
            </button>
            <Link href="/admin" style={{ padding: '16px 28px', background: 'transparent', border: '1px solid #3a3a3a', borderRadius: 999, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: '#aaa', display: 'flex', alignItems: 'center' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
