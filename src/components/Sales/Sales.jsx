import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./Sales.module.css";
import { Link } from "react-router-dom";
import { colors, spacing, radii, typography, borders } from "../../constants/styles";
import { BASE_URL } from "../../constants/index";

const Sales = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAllProducts()); // при монтировании подгружаем товары
  }, [dispatch]);

  const discountedProducts = products.slice(0, 4); // первые 4 товара

  return (
     <section className={styles.SalesSection} 
     style={{ padding: `${spacing.xl} ${spacing.xl}` }}>
       {/* Заголовок и кнопка All Categories */}
       <div className={styles.header} style={{ marginBottom: spacing.xl,  gap: spacing.md,  }}>
         <h2 className={styles.title} style={{ ...typography.TBlack, fontSize: "64px" }}>Sale</h2>
 
         <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
           <div
             style={{
               width: "832px",
               height: "1px",
               backgroundColor: colors.grayDivider,
             }}
           />
         
         {/* Divider */}
         <div style={{  display: "flex", alignItems: "center" }}></div>
           <div
             style={{ 
               position: "absolute",
               width: "832px",
               height: "1px",
             }}
         />
         <Link to="/sales" className={styles.allBtn}
         style={{
             
             color: colors.txtGrey,
             textDecoration: "none",
             fontWeight: 500,
             padding: spacing.sm,
             borderRadius: radii.small,
             border: `1px solid ${colors.txtGrey}`,
             paddingBottom: spacing.xs,
           }}
           >
             All Categories
             </Link>
       </div>
         </div>
       {/* Сетка карточек категорий */}
       <div className={styles.cardsContainer} style={{
            justifyContent: "space-between",
             alignItems: "center",
             
               height: "392px" }}>
         {loading ? (
          <p style={{ ...typography.TGrey }}>Загрузка...</p>
        ) : error ? (
          <p style={{ ...typography.TGrey }}>Ошибка: {error}</p>
        ) : discountedProducts.length > 0 ? (
          discountedProducts.map((product) => (
           <Link
             key={product.id}
             to={`/category/${product.id}`}
             className={styles.cardLink}
             style={{ textDecoration: "none" }}
           >
             <div className={styles.card}
             style={{
                  height: "422px",
                 border: borders.grayDivider,
                 borderRadius: radii.small,
                  flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center",
                   gap: spacing.sm,
                   padding: spacing.sm,
                   backgroundColor: colors.background,
               }}
               >
               <img src={`${BASE_URL}${product.image}`} 
                 alt={product.title} 
                 className={styles.cardImage}
                 />
                 <div> 
               {<p className={styles.cardTitle} style={typography.TBlack}>
                  {product.title}
               </p>}
                {/* Блок с ценой */}
    <div
      className={styles.priceBox}
      style={{
        display: "flex",
        
        justifyContent: "flex-start", // чтобы цена была слева
        width: "100%",
      }}
    >
      <span
        className={styles.price}
        style={{
          ...typography.TBlack,
          fontSize: "20px",
          fontWeight: "bold",
          color: colors.secondary,
        }}
      >
        {product.price}$
      </span>
      <span style={{ textDecoration: "line-through", color: colors.txtGrey }}>
    {product.discont_price}$
  </span>
    </div>
                  </div>
             </div>
           </Link>
         ))
         ) : (
           <p style={{ ...typography.TGrey, fontSize: "18px" }}>No categories available.</p>
         )}
       </div>
     </section>
   );
 };
 export default Sales;
 