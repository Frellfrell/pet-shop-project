import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { spacing, colors, radii, } from "../../constants/styles";
import { Link } from "react-router-dom";
import CartItem from "../../components/AddCart/CartItem";
import CartForm from "../../components/AddCart/CartForm";
import { getCartItems } from "../../services/cartHelper";
import PageTitle from "../../components/PageTitle/PageTitle";


const CartPage = () => {
 const cartCounter = useSelector(state => state.cart.cartCounter);
  const [cartItems, setCartItems] = useState(getCartItems());

  // Перерисовываем список товаров при изменении cartCounter
  useEffect(() => {
    setCartItems(getCartItems());
  }, [cartCounter]);
  const isMobile = window.innerWidth < 1024;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: `${spacing.xl} ${spacing.xl}` }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
       <PageTitle text="Shopping cart" />
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <div style={{ width: "700px", height: "1px", backgroundColor: colors.grayDivider }} />
          <Link to="/categories" style={{ color: colors.txtGrey, textDecoration: "none", fontWeight: "500", padding: spacing.sm, borderRadius: radii.small, border: `1px solid ${colors.txtGrey}` }}>
            All Categories
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: spacing.xl, width: "100%",
          maxWidth: "1360px",
          minHeight: "582px",
          justifyContent: "space-between",
           }}>
        {/* Left - Cart Items */}
        <div style={{ 
          flex: isMobile ? "1" : "0 0 780px",
          height: isMobile ? "auto" : "572px",
          display: "flex", flexDirection: "column", gap: "32px", 
           overflowY: isMobile ? "visible" : "auto",
            paddingRight: "8px", 
            scrollbarWidth: "thin", }}>
          {cartItems.length > 0 ? cartItems.map(item => <CartItem key={item.item.id} product={item.item} quantity={item.quantity} 
          style={{ width: "780px", height: "180px", flexShrink: 0, }} />) : <p>Your cart is empty</p>}
        </div>

        {/* Right - Cart Form */}
        <div
          style={{
            flex: isMobile ? "1" : "0 0 548px",
            height: isMobile ? "auto" : "582px",
            padding: "32px",
            backgroundColor: "rgba(241,243,243,1)",
            borderRadius: radii.medium,
          }}
        >
        <CartForm cartItems={cartItems} />
      </div>
      </div>
    </div>
  );
};

export default CartPage;
