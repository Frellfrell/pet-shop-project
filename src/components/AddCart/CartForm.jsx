import React from "react";
import { useForm } from "react-hook-form";
import { spacing, button } from "../../constants/styles";

const CartForm = ({ cartItems }) => {
  const { register, handleSubmit } = useForm();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.count || 1), 0);

  const onSubmit = (data) => {
    console.log("Order submitted:", { data, cartItems });
    // axios.post('/order/send', { customer: data, items: cartItems })...
  };

  return (
    <div style={{ width: "484px", display: "flex", flexDirection: "column", gap: spacing.lg }}>
      {/* Summary */}
      <div style={{ display: "flex", justifyContent: "space-between", height: "122px" }}>
        <div>{cartItems.length} items</div>
        <div>Total: {total}$</div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <input {...register("name", { required: true })} placeholder="Name" style={{ height: 58, padding: spacing.sm }} />
        <input {...register("phone", { required: true })} placeholder="Phone" style={{ height: 58, padding: spacing.sm }} />
        <input {...register("email", { required: true })} placeholder="Email" style={{ height: 58, padding: spacing.sm }} />
        <button type="submit" style={{ ...button, marginTop: spacing.xl }}>Order</button>
      </form>
    </div>
  );
};

export default CartForm;
