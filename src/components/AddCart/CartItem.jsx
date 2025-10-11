import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import styles from "./CartItem.module.css";
import { removeFromCart } from "../../services/cartHelper";
import { useDispatch } from "react-redux";

const CartItem = ({ product, quantity }) => {
  const [count, setCount] = useState(quantity);

  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  const dispatch = useDispatch();

const handleRemove = () => {
   console.log("Removing product id:", product.id);
  removeFromCart(product.id, dispatch);
};

  return (
    <Paper elevation={2} className={styles.item}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <Box className={styles.info}>
        <Typography variant="h6" className={styles.title}>
          {product.title}
        </Typography>

        <Box className={styles.priceRow}>
          <Typography variant="h6">
            {product.discont_price ?? product.price}$
          </Typography>
          {product.oldPrice && (
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "#999" }}
            >
              {product.oldPrice}$
            </Typography>
          )}
        </Box>

        <Box className={styles.counter}>
          <button onClick={handleDecrease}>−</button>
          <span>{count}</span>
          <button onClick={handleIncrease}>+</button>
        </Box>
      </Box>

      <button className={styles.closeBtn} onClick={handleRemove}>
        ×
      </button>
    </Paper>
  );
};
   

export default CartItem;