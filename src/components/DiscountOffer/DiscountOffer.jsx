import React, { useState } from "react";
import styles from "./DiscountOffer.module.css";
import { colors, spacing, radii, typography } from "../../constants/styles";
import discountImg from "../../assets/discount.png";
import { BASE_URL } from "../../constants";

const DiscountOffer = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.trim()) return "Phone number is required";
    if (!form.email.trim()) return "Email is required";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch(`${BASE_URL}/PostSaleSend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setLoading(false);

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`Error ${resp.status}: ${text}`);
      }

      alert("Заявка отправлена! Спасибо 🎉");
      setForm({ name: "", phone: "", email: "" });
    } catch (error) {
      setLoading(false);
      console.error("Error при отправке формы:", error);
      alert("Error при отправке. Попробуйте позже.");
    }
  };

  return (
    <section
      className={styles.discountSection}
      style={{
        marginTop: "150px",
        marginLeft: spacing.xl,
        marginRight: spacing.xl,
        marginBottom: "80px",
        backgroundColor: colors.primary,
        
        borderRadius: radii.large,
        
        maxHeight: "486px",
       
      }}
    >
      <h2
        style={{
          ...typography.TBlack,
          color: colors.background,
          fontSize: "64px",
          lineHeight: "70px",
          margin: "0",
          textAlign: "center",
          paddingTop: "32px",
          marginBottom: spacing.lg,
        }}
      >
        5% off on the first order
      </h2>

      {/* Контейнер с картинкой и формой */}
      <div
        className={styles.content}
        style={{
          
          gap: "32px",
          
          height: "360px",
         
        }}
      >
        {/* Левая картинка */}
        <div
          className={styles.imageBox}
          style={{
           
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
           
          }}
        >
          <img
            src={discountImg}
            alt="Discount"
            style={{
              maxHeight: "360px",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Правая форма */}
        <form
          className={styles.formBox}
          onSubmit={onSubmit}
          style={{
            flex: 1,
            maxWidth: "40%",
            maxHeight: "296px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "32px",
            marginBottom: "32px",
            padding: spacing.md,
            borderRadius: radii.large,
            backgroundColor: colors.primary,
          }}
        >
          <input className={styles.input}
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Name"
            style={{
             
                color: colors.background,
               backgroundColor: colors.primary,
              border: `1px solid ${colors.background}`,
              borderRadius: radii.small,
              padding: spacing.sm,
              fontSize: "26px",
            }}
          />
          <input className={styles.input}
            type="text"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone number"
            style={{
                 backgroundColor: colors.primary,
              color: colors.background,
              border: `1px solid ${colors.background}`,
              borderRadius: radii.small,
              padding: spacing.sm,
              fontSize: "26px",
            }}
          />
          <input className={styles.input}
            type="text"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            style={{
                 backgroundColor: colors.primary,
              color: colors.background,
              border: `1px solid ${colors.background}`,
              borderRadius: radii.small,
              padding: spacing.sm,
              fontSize: "26px",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              fontSize: "26px",
              backgroundColor: colors.background,
              color: colors.secondary,
              border: `1px solid ${colors.background}`,
              padding: `${spacing.sm} ${spacing.lg}`,
              borderRadius: radii.small,
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {loading ? "Отправка..." : "Get a discount"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DiscountOffer;