import React, { useEffect} from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";

const CartForm = ({ cartItems, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm();
  
  const handleOrderSubmit  = (data) => {
     onSubmit(data); // Передаём данные на сервер через onSubmit
  };
   
useEffect(() => {
    reset();  // Сброс формы при изменении пропсов
  }, [cartItems, reset]);

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

  

  return (
     <Box component="form" onSubmit={handleSubmit((handleOrderSubmit))} sx={{ display: "flex", flexDirection: "column", padding: "0 32px 0 32px", gap: 2}} >
      <PageTitle text="Order details" variant="small" />
      <Typography sx={{fontSize: 40, color: "rgba(139,139,139,1)" }}>{totalItems} items</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems: "baseline", lineHeight: 1, maxHeight: "70px" }}>
        <Typography sx={{fontSize: 40, color: "rgba(139,139,139,1)", lineHeight: 1 }}>Total</Typography>
      <Typography sx={{fontSize: 64,fontWeight:700, color: "rgba(40,40,40,1)", lineHeight: 1, fontFamily: "Montserrat" }}>${totalPrice}</Typography>
   </Box>

      <TextField 
      label="Name"
        variant="outlined" {...register("name", { required: "Please enter your name" })}
        error={!!errors.name}
        helperText={errors.name?.message}
         />
      <TextField 
      label="Phone" 
      variant="outlined" {...register("phone",{
          required: "Please enter your phone number",
          pattern: {
            value: /^[0-9+\-\s()]*$/,
            message: "Enter a valid phone number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
         />
      <TextField 
      label="Email" 
      variant="outlined" {...register("email", {
          required: "Please enter your email",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
         error={!!errors.email}
        helperText={errors.email?.message}
         />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ mt: 3, fontFamily: "Montserrat", backgroundColor: "rgba(13,80,255,1)" }}>
         Order
        </Button>
  
    </Box>
);
};


export default CartForm;
