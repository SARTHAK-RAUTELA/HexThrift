import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
type Product = { id: string; title: string; description?: string; variants?: { price: number }[]; };
export default function Home({ products }: { products: Product[] }) { return ( <> <Navbar /> <main className="max-w-6xl mx-auto p-6"> <header className="flex items-center justify-between mb-6"> <h1 className="text-3xl font-bold" style={{ color: '#2D274B' }}>Featured</h1> </header> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {products.map((p) => ( <ProductCard key={p.id} id={p.id} title={p.title} price={p.variants?.[0]?.price || 0} /> ))} </div> </main> </> ); }
export const getServerSideProps: GetServerSideProps = async () => { const { data } = await supabase.from('products').select('id,title').limit(12); return { props: { products: data || [] } }; };