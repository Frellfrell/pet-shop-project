import React, { useState } from "react";
import { spacing, colors, radii, borders } from "../../constants/styles";

const CartItem = ({ product, quantity }) => {
  const [count, setCount] = useState(quantity);

  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div style={{
      display: "flex",
      gap: spacing.md,
      padding: spacing.sm,
      border: borders.grayDivider,
      borderRadius: radii.small,
      width: "780px",
      height: "180px",
      alignItems: "center",
    }}>
      <img src={product.image} alt={product.title} style={{ width: "200px", height: "180px", objectFit: "cover" }} />

      <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <div style={{ fontWeight: "700", color: colors.secondary }}>{product.title}</div>

        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <button onClick={handleDecrease}>−</button>
          <span>{count}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <div style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}>
          <span style={{ fontWeight: "700" }}>{product.discont_price ?? product.price}$</span>
          {product.oldPrice && <span style={{ textDecoration: "line-through", color: colors.txtGrey }}>{product.oldPrice}$</span>}
        </div>
      </div>
    </div>
  );
};

export default CartItem;