import React from "react";
import { spacing, colors, radii, } from "../../constants/styles";
import { Link } from "react-router-dom";
import CartItem from "../../components/AddCart/CartItem";
import CartForm from "../../components/AddCart/CartForm";
import { getCartItems } from "../../services/cartHelper";
import PageTitle from "../../components/PageTitle/PageTitle";


const CartPage = () => {
  const cartItems = getCartItems()
  console.log(JSON.stringify(cartItems))

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: `${spacing.xl} ${spacing.xl}` }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
       <PageTitle text="Shopping cart" />
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <div style={{ width: "832px", height: "1px", backgroundColor: colors.grayDivider }} />
          <Link to="/categories" style={{ color: colors.txtGrey, textDecoration: "none", fontWeight: "500", padding: spacing.sm, borderRadius: radii.small, border: `1px solid ${colors.txtGrey}` }}>
            All Categories
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", gap: spacing.xl }}>
        {/* Left - Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", flex: "1" }}>
          {cartItems.length > 0 ? cartItems.map(item => <CartItem key={item.item.id} product={item.item} quantity={item.quantity} />) : <p>Your cart is empty</p>}
        </div>

        {/* Right - Cart Form */}
        <CartForm cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
