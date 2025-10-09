
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import cartVector from "../../assets/Vector.svg"; // пустая корзина
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";



const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCounter)
  {/*const cartItemCount = 3; */ } // к Redux

  return (
    <header className={styles.header}>
      {/* Логотип */}
      <div className={styles.logoContainer}>
        <NavLink to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>
      </div>
      {/* Навигация */}
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navLink}>Main Page</NavLink>
        <NavLink to="/categories" className={styles.navLink}>Categories</NavLink>
        <NavLink to="/products" className={styles.navLink}>All Products</NavLink>
        <NavLink to="/discounts" className={styles.navLink}>All Sales</NavLink>
      </nav>

      {/* Иконка корзины */}
      <div className={styles.cartContainer}>
        <Typography variant="body2">{cartCount}</Typography>
        <NavLink to="/cart" className={styles.cartLink}>
          <img src={cartVector} alt="Vector" className={styles.cartVector} />
          {/*cartItemCount > 0 && (
            <img src={cartItem} alt="Cart Item" className={styles.cartItem} />
          )*/}
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
