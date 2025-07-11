import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').limit(8);
      if (!error) setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading featured products...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="card h-full flex flex-col overflow-hidden transition duration-300 hover:shadow-lg">
          <img src={product.images && product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
            <div className="text-sm text-gray-600 mb-1">{product.category}</div>
            <div className="text-primary-600 font-bold mb-1">₹{product.price} / {product.priceType}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;