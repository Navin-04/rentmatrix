import React from 'react';
import { useParams } from 'react-router-dom';
import ProductListingPage from './ProductListingPage';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  return (
    <ProductListingPage initialCategory={categoryId} />
  );
};

export default CategoryPage;