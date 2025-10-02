import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Sales.module.css";
import { Link } from "react-router-dom";
import { colors, spacing, radii, typography, borders } from "../../constants/styles";
import { BASE_URL } from "../../constants/index";

const Sales = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/sales`); 
        // Берем первые 4 товара со скидкой
        const firstFour = resp.data.filter(item => <item className="sales">{item.discount}</item> > 0).slice(0, 4);
        setCategories(firstFour);
      } catch (error) {
        console.error("Error при загрузке товаров со скидкой:", error);
      }
    };

    fetchSales();
  }, []);

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
         {categories.length > 0 ? (categories.slice(0, 4).map((category) => (
           <Link
             key={category.id}
             to={`/category/${category.id}`}
             className={styles.cardLink}
             style={{ textDecoration: "none" }}
           >
             <div className={styles.card}
             style={{
                  height: "316px",
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
               <img src={`${BASE_URL}${category.image}`} 
                 alt={category.title} 
                 className={styles.cardImage}
                 />
               {<p className={styles.cardTitle} style={typography.TBlack}>
                  {category.title}
               </p>}
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
 