// src/App.js
import React, { useState, useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb, faMoon } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/pages/home/Home';
import Authors from './components/pages/home/Authors';
import Contact from './components/pages/home/Contact';
import SinglePost from './components/blog/SinglePost';
import Category from './components/blog/Category';
import Blog from "./components/blog/Blog";
import BlogSingle from "./components/blog/BlogSingle";
import AuthorsPage from "./components/blog/AuthorsPage";
import Kontakt from "./components/pages/wordpressbs/Kontakt";
import AboutUs from "./components/pages/wordpressbs/AboutUs";
import SignUp from "./components/pages/users/SignUp";
import SignIn from "./components/pages/users/SignIn";
import Exchange from "./components/test/Exchhange";
import Countries from "./components/countries/Countries";
import SingleCountry from "./components/countries/SingleCountry";
import CategoryPage from './components/blog/CategoryPage';
import AdminLayout from "./components/pages/admin/AdminLayout";
import AdminUser from "./components/pages/admin/AdminUser";
import AdminPost from "./components/pages/admin/AdminPost";
import AdminComments from "./components/pages/admin/AdminComments";
import AdminCategories from "./components/pages/admin/AdminCategories";
import AdminAddUser from "./components/pages/admin/AdminAddUser";
import AdminAddPost from "./components/pages/admin/AdminAddPost";
import EditUser from "./components/pages/admin/EditUser";
import ShopHome from "./components/pages/home/shop/ShopHome";
import ShopProductPage from "./components/pages/home/shop/ShopProductPage";
import CartPage from "./components/pages/home/shop/Cartpage";
import ShopCheckout from "./components/pages/home/shop/ShopCheckout";
import NotFound from "./components/pages/home/NotFound";
import Construction from "./components/pages/admin/Construction";


library.add(faLightbulb, faMoon);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Conditionally load App.css
  useEffect(() => {
    if (!isAdminRoute) {
      import('./App.css');
    }
  }, [isAdminRoute]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('darkmode', !darkMode);
  };

  return (
    <div className={darkMode ? 'darkmode' : ''}>
      {!isAdminRoute && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      
      <Routes>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:slug" element={<SinglePost />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/bloge" element={<Blog />} />
        <Route path="/bloge/:slug" element={<BlogSingle />} />
        <Route path="/author/:author" element={<AuthorsPage />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:name" element={<SingleCountry />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/shop/:id" element={<ShopProductPage />} />
        <Route path="/shop/cart" element={<CartPage />} />
        <Route path="/shop/checkout" element={<ShopCheckout />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<AdminCategories />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="posts" element={<AdminPost />} />
          <Route path="posts/add" element={<AdminAddPost />} />
          <Route path="users" element={<AdminUser />} />
          <Route path="users/add" element={<AdminAddUser />} />
          <Route path="users/:id" element={<EditUser />} />
          <Route path="cs" element={<Construction />}/>
        </Route>
      </Routes>

      {!isAdminRoute && <Footer darkMode={darkMode} />}
    </div>
  );
}

export default App;
