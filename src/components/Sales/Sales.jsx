import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Sales.module.css";
import { Link } from "react-router-dom";
import { colors, spacing, radii, typography, borders } from "../../constants/styles";
import { BASE_URL } from "../../constants/index";

const Sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/products`); 
        // Берем первые 4 товара со скидкой
        const firstFour = resp.data.filter(item => item.discount > 0).slice(0, 4);
        setSales(firstFour);
      } catch (error) {
        console.error("Error при загрузке товаров со скидкой:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <section
      className={styles.salesSection}
      style={{
        padding: `${spacing.xl} ${spacing.xl}`,
        maxWidth: 1360,
        margin: "auto",
      }}
    >
      {/* Заголовок и Divider */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: spacing.lg }}>
        <h2 style={{ ...typography.TBlack, fontSize: 32, margin: 0 }}>Sales</h2>
        <div
          style={{
            flexGrow: 1,
            height: "1px",
            backgroundColor: colors.grayDivider,
            marginLeft: spacing.md,
          }}
        />
      </div>

      {/* Карточки */}
      <div
        className={styles.cardsContainer}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: spacing.md,
        }}
      >
        {sales.length > 0 ? (
          sales.map(item => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              style={{ textDecoration: "none", flex: "1 1 0" }}
            >
              <div
                className={styles.card}
                style={{
                  border: borders.grayDivider,
                  borderRadius: radii.small,
                  padding: spacing.sm,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: spacing.sm,
                  backgroundColor: colors.background,
                }}
              >
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <p style={{ ...typography.TBlack, fontSize: 18, margin: 0 }}>{item.title}</p>
                <p style={{ ...typography.TBlack, fontSize: 16, color: colors.primary }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ ...typography.TGrey }}>No sale products available.</p>
        )}
      </div>
    </section>
  );
};

export default Sales;
