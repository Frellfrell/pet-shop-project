import React from "react";
import { useForm } from "react-hook-form";
//import { spacing, button } from "../../constants/styles";
import { Box, TextField, Button, Typography } from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";

const CartForm = ({ cartItems }) => {
  const { register, handleSubmit } = useForm();
  // const total = cartItems.reduce((acc, item) => acc + (item.price * item.count || 1), 0);

  const calculateTotals = (cartItems) => {
    let totalItems = 0
    let totalPrice = 0

    cartItems.forEach(({ item, quantity }) => {
      const price = item.discont_price ?? item.price;
      console.log(price)
      totalPrice += +price * +quantity
      console.log(totalPrice)
      totalItems += 1
      console.log(totalItems)

    });

    return { totalItems, totalPrice }
  };

  const { totalItems, totalPrice } = calculateTotals(cartItems);

  const onSubmit = (data) => {
    console.log("Order submitted:", { data, cartItems });
    // axios.post('/order/send', { customer: data, items: cartItems })...
  };

  return (
     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }} >
      <PageTitle text="Order details" variant="small" />
      <Typography sx={{fontSize: 40, color: "rgba(139,139,139,1)", gap: 2 }}>{totalItems} items</Typography>
      <Typography >Total {totalPrice}$</Typography>
    {/*<div style={{ width: "484px", display: "flex", flexDirection: "column", gap: spacing.lg }}>
      {/* Summary */
      /*<div style={{ display: "flex", justifyContent: "space-between", height: "122px" }}>
        <div>{+totalItems} items</div>
        <div>Total: {+totalPrice}$</div>
      </div>*/}
      

      {/* Form */}
     {/*} <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <input {...register("name", { required: true })} placeholder="Name" style={{ height: 58, padding: spacing.sm }} />
        <input {...register("phone", { required: true })} placeholder="Phone" style={{ height: 58, padding: spacing.sm }} />
        <input {...register("email", { required: true })} placeholder="Email" style={{ height: 58, padding: spacing.sm }} />
        <button type="submit" style={{ ...button, marginTop: spacing.xl }}>Order</button>
      </form>
    </div>
  );
};*/}
 <TextField label="Name" variant="outlined" {...register("name")} />
      <TextField label="Phone" variant="outlined" {...register("phone")} />
      <TextField label="Email" variant="outlined" {...register("email")} />
 <Button type="submit" variant="contained" sx={{ mt: 2 }}>
         Order
      </Button>
    </Box>
)};


export default CartForm;
