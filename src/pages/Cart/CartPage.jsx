import React from "react";
import { useSelector } from "react-redux";
import { spacing, colors, radii, } from "../../constants/styles";
import { Link } from "react-router-dom";
import CartItem from "../../components/AddCart/CartItem";
import CartForm from "../../components/AddCart/CartForm";


const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items); // предполагается, что корзина лежит в state.cart.items

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 1360, margin: "0 auto", gap: spacing.xl }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
        <h2 style={{ fontSize: 64, fontWeight: 700, color: colors.secondary }}>Cart</h2>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <div style={{ width: 832, height: 1, backgroundColor: colors.grayDivider }} />
          <Link to="/categories" style={{ color: colors.txtGrey, textDecoration: "none", fontWeight: 500, padding: spacing.sm, borderRadius: radii.small, border: `1px solid ${colors.txtGrey}` }}>
            All Categories
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", gap: spacing.xl }}>
        {/* Left - Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1,  }}>
          {cartItems.length > 0 ? cartItems.map(item => <CartItem key={item.id} product={item} />) : <p>Your cart is empty</p>}
        </div>

        {/* Right - Cart Form */}
        <CartForm cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
