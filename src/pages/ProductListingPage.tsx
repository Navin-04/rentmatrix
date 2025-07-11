import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="container mx-auto py-8">Loading products...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border rounded p-4">
              <img src={product.images && product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-2" />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-primary-600 font-bold">₹{product.price} / {product.priceType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;