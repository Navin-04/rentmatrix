import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import CategoryPage from './pages/CategoryPage';
import PostAdPage from './pages/PostAdPage';
import ServicePage from './pages/ServicePage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import AboutUsPage from './pages/AboutUsPage';
import FAQPage from './pages/FAQPage';
import ContactUsPage from './pages/ContactUsPage';
import EditListingPage from './pages/EditListingPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import MyListingsPage from './pages/MyListingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminListingsPage from './pages/AdminListingsPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PasswordResetPage from './pages/PasswordResetPage';
import { useEffect, useState } from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListingPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="services" element={<ServicePage />} />
        <Route path="services/:id" element={<ServiceDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="post-ad" element={<PostAdPage />} />
        <Route path="dashboard/*" element={<UserDashboardPage />} />
        <Route path="edit-listing/:id" element={<EditListingPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="booking/:id" element={<BookingDetailsPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/listings" element={<AdminListingsPage />} />
        <Route path="verify-email" element={<EmailVerificationPage />} />
        <Route path="reset-password" element={<PasswordResetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;