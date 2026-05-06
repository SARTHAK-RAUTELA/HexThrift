import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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

const CATEGORIES = [
  { key: '', label: 'All pieces' },
  { key: 'black', label: 'Black Collection' },
  { key: 'winter', label: 'Winter Armour' },
  { key: 'retro', label: 'Retro & Funk' },
];

// Static fallback products when no DB connected
const STATIC_PRODUCTS: Product[] = [
  { id: 's1', title: 'Vintage Wrangler Denim Jacket', category: 'black', variants: [{ price: 149900 }] },
  { id: 's2', title: 'Crimson Boxy Knit Sweater', category: 'retro', variants: [{ price: 89900 }] },
  { id: 's3', title: "Champion Hoodie — Black", category: 'black', variants: [{ price: 129900 }] },
  { id: 's4', title: 'Brown Corduroy Overshirt', category: 'retro', variants: [{ price: 99900 }] },
  { id: 's5', title: 'Astro Winter Armor II', category: 'winter', variants: [{ price: 649900 }] },
  { id: 's6', title: 'Glacier White Puffer', category: 'winter', variants: [{ price: 599900 }] },
  { id: 's7', title: 'Stealth Black Puffer', category: 'black', variants: [{ price: 649900 }] },
  { id: 's8', title: 'Crimson Liner Vest', category: 'retro', variants: [{ price: 329900 }] },
];

export default function ShopPage({ products, cat }: { products: Product[]; cat: string }) {
  const router = useRouter();
  const displayProducts = products.length > 0 ? products : STATIC_PRODUCTS.filter(p => !cat || p.category === cat);

  return (
    <div style={{ background: '#F6F1E4', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <Navbar />

      <div style={{ padding: '48px 48px 80px' }}>
        {/* Page heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0E7B8C', fontWeight: 600 }}>
              {displayProducts.length} pieces available
            </span>
            <h1 style={{ fontFamily: "'Paytone One', sans-serif", fontSize: 'clamp(48px,6vw,84px)', lineHeight: 0.9, letterSpacing: '-0.01em', marginTop: 8 }}>
              {cat ? CATEGORIES.find(c => c.key === cat)?.label?.toUpperCase() || 'SHOP' : 'ALL PIECES.'}
            </h1>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => router.push(c.key ? `/shop?cat=${c.key}` : '/shop')}
              style={{
                padding: '10px 20px', borderRadius: 999, fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
                border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontFamily: 'inherit',
                background: cat === c.key ? '#111' : '#fff',
                color: cat === c.key ? '#fff' : '#111',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {displayProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: '#0E7B8C' }}>NO PIECES YET</div>
            <p style={{ color: '#888', marginTop: 12 }}>Check back Monday at 9am IST for fresh drops.</p>
          </div>
        ) : (
          <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {displayProducts.map(p => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                price={p.variants?.[0]?.price ?? 0}
                category={p.category}
                image={p.variants?.[0]?.images?.[0]}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cat = (ctx.query.cat as string) || '';
  try {
    let query = supabase.from('products').select('id, title, category, variants(price, images)').limit(24);
    if (cat) query = query.eq('category', cat);
    const { data } = await query;
    return { props: { products: data || [], cat } };
  } catch {
    return { props: { products: [], cat } };
  }
};
