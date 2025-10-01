import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg"; 
import cartVector from "../../assets/Vector.svg"; // пустая корзина



const Header = () => {
  {/*const cartItemCount = 3; */} // к Redux

  return (
    <header className={styles.header}>
      {/* Логотип */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>
      {/* Навигация */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Main Page</Link>
        <Link to="/categories" className={styles.navLink}>Categories</Link>
        <Link to="/products" className={styles.navLink}>All Products</Link>
        <Link to="/discounts" className={styles.navLink}>All Sales</Link>
      </nav>

      {/* Иконка корзины */}
      <div className={styles.cartContainer}>
        <Link to="/cart" className={styles.cartLink}>
          <img src={cartVector} alt="Vector" className={styles.cartVector} />
          {/*cartItemCount > 0 && (
            <img src={cartItem} alt="Cart Item" className={styles.cartItem} />
          )*/}
        </Link>
      </div>
    </header>
  );
};

export default Header;
