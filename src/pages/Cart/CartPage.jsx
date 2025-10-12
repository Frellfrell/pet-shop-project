import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { spacing, colors, radii, } from "../../constants/styles";
import { Link } from "react-router-dom";
import CartItem from "../../components/AddCart/CartItem";
import CartForm from "../../components/AddCart/CartForm";
import { getCartItems } from "../../services/cartHelper";
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 


const CartPage = () => {
 const cartCounter = useSelector(state => state.cart.cartCounter);
  const [cartItems, setCartItems] = useState(getCartItems());
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Перерисовываем список товаров при изменении cartCounter
  useEffect(() => {
    setCartItems(getCartItems());
  }, [cartCounter]);

  const isMobile = window.innerWidth < 1024;

  const handleSubmitOrder = async (customerData) => {
    try {
      const orderData = {
        customer: customerData,
        items: cartItems,
      };

      // Отправляем запрос на сервер
      const response = await axios.post("/order/send", orderData);

      // Если заказ отправлен успешно, показываем модальное окно
      if (response.status === 200) {
        setOrderSuccess(true); // Открываем окно подтверждения
        // Здесь можно очистить корзину или выполнить другие действия после успешного заказа
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const isEmpty = cartItems.length === 0;


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
          maxHeight: isMobile ? "auto" :  `calc(3 * 180px + 3*16px )`,
          display: "flex", flexDirection: "column", gap: "16px", 
           overflowY: isMobile ? "visible" : "auto",
            paddingRight: "8px", 
            scrollbarWidth: "thin",
             }}>
         {isEmpty ? (
            <div style={{ padding: "16px", textAlign: "center" }}>
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                Looks like you have no items in your basket currently
              </Typography>
              <Link to="/categories">
                <Button variant="outlined" size="large">
                  Continue Shopping
                </Button>
              </Link>  
            </div>
        ) : (
            cartItems.map(item => (
              <CartItem key={item.item.id} product={item.item} quantity={item.quantity} style={{ width: "780px", height: "180px", flexShrink: 0 }} />
            ))
          )}
        </div>

        {/* Right - Cart Form */}
        <div
          style={{
            flex: isMobile ? "1" : "0 0 548px",
             maxHeight: isMobile ? "auto" :  `calc(3 * 180px + 3*16px )`,
            backgroundColor: "rgba(241,243,243,1)",
            borderRadius: radii.medium,
          }}
        >
           
        <CartForm cartItems={cartItems} onSubmit={handleSubmitOrder} />
        
      </div>
      </div>
      {/* Success Modal */}
      {orderSuccess && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(13,80,255,1)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            width: "548px",
            height: "236px",
          }}
        >
          <Typography variant="h6" style={{ fontSize: "24px", marginBottom: "20px" }}>
            Congratulations!
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            Your order has been successfully placed on the website. A manager will contact you shortly to confirm your order.
          </Typography>
          <Button
            variant="contained"
            style={{ position: "absolute", top: "10px", right: "10px", width: "22px", height: "22px", padding: "0" }}
            onClick={() => setOrderSuccess(false)}
          >
            ×
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
