import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const MyListingsPage: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('owner_id', user.id);
      if (!error) setListings(data || []);
      setLoading(false);
    };
    fetchListings();
  }, [user]);

  if (!user) return <div className="container mx-auto py-8">Please log in to view your listings.</div>;
  if (loading) return <div className="container mx-auto py-8">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      {listings.length === 0 ? (
        <p>You have not posted any ads yet.</p>
      ) : (
        <ul className="space-y-4">
          {listings.map(listing => (
            <li key={listing.id} className="border p-4 rounded">
              <strong>{listing.title}</strong> - {listing.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyListingsPage; 