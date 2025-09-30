import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./layout/Layout";

// Страницы
import MainPage from "./pages/Main/MainPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductsPage from "./pages/Products/ProductsPage";
import DiscountsPage from "./pages/Discounts/DiscountsPage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import SuccessPage from "./pages/CheckoutSuccess/SuccessPage";
import NotFoundPage from "./pages/No/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;