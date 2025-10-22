import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import styles from "./CartItem.module.css";
import { removeFromCart, updateCartQuantity } from "../../services/cartHelper";
import { useDispatch } from "react-redux";

const CartItem = ({ product, quantity, onChange }) => {
  const [count, setCount] = useState(quantity);

  const handleIncrease = () => {const newCount = count + 1;
    setCount(newCount);
    updateCartQuantity(product.id, newCount, dispatch);
    if (onChange) onChange();
  };
  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateCartQuantity(product.id, newCount, dispatch);
      if (onChange) onChange();
    }
  };

  const dispatch = useDispatch();

const handleRemove = () => {
   console.log("Removing product id:", product.id);
  removeFromCart(product.id, dispatch);
   if (onChange) onChange();
};

  return (
    <Paper elevation={2} className={styles.item}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <Box className={styles.info}>
        <Typography variant="h6" className={styles.title}>
          {product.title}
        </Typography>

        <Box className={styles.priceRow}>
           <Box className={styles.counter}>
          <button onClick={handleDecrease}>−</button>
          <span>{count}</span>
          <button onClick={handleIncrease}>+</button>
        </Box>
      
          <Typography className={styles.priceCurrent} sx={{ fontWeight: 700,
              fontSize: "clamp(20px, 2.5vw, 40px)", 
              lineHeight: 1, fontFamily: "Montserrat" }}>
            ${product.discont_price ? `${product.discont_price}` : `${product.price}`}
          </Typography>
          {product.discont_price  && (
            <Typography className={styles.priceOld}
              sx={{ fontSize: "clamp(12px, 1.5vw, 20px)", fontFamily: "Montserrat" }}
            >
              ${product.price}
            </Typography>
          )}
        </Box>
        </Box>
       

      <button className={styles.closeBtn} onClick={handleRemove}>
        ×
      </button>
    </Paper>
  );
};
   

export default CartItem;