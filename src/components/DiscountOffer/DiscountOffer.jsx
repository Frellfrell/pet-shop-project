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
    if (!form.name.trim()) return "Введите имя";
    if (!form.phone.trim()) return "Введите телефон";
    if (!form.email.trim()) return "Введите email";
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
        throw new Error(`Ошибка ${resp.status}: ${text}`);
      }

      alert("Заявка отправлена! Спасибо 🎉");
      setForm({ name: "", phone: "", email: "" });
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при отправке формы:", error);
      alert("Ошибка при отправке. Попробуйте позже.");
    }
  };

  return (
    <section
      className={styles.discountSection}
      style={{
        marginTop: "100px",
        marginBottom: "80px",
        backgroundColor: colors.primary,
        padding: spacing.xl,
        borderRadius: radii.large,
        maxWidth: "1360px",
        maxHeight: "486px",
        margin: "auto",
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
          marginBottom: spacing.lg,
        }}
      >
        5% off on the first order
      </h2>

      <div className={styles.content} style={{ gap: spacing.md}}>
        {/* Image box (лево) */}
        <div
          className={styles.imageBox}
          style={{
            flex: 1,
            maxWidth: "783px",
            maxHeight: "360px",
            display: "flex",
          }}
        >
          <img
            src={discountImg}
            alt="Discount"
            style={{ maxHeight: "360px", width: "100%", objectFit: "contain", marginBottom: "-150px" }}
          />
        </div>

        {/* Form box (право) */}
        <form
          className={styles.formBox}
          onSubmit={onSubmit}
          style={{
            flex: 1,
            minHeight: "516px",
            borderRadius: radii.large,
            backgroundColor: colors.primary,
            padding: spacing.lg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: spacing.md,
            paddingBottom: "32px",
          }}
        >
          <input
          type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Name"
            className={styles.input}
            style={{
              color: colors.background,
              border: `1px solid ${colors.background}`,
              borderRadius: radii.small,
              padding: spacing.sm,
              fontSize: "26px",
            }}
          />

          <input
          type="text"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone number"
            className={styles.input}
            style={{
              color: colors.background,
              border: `1px solid ${colors.background}`,
              borderRadius: radii.small,
              padding: spacing.sm,
              fontSize: "26px",
            }}
          />
          <div style={{ height: 58 }}> 
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className={styles.input}
            style={{
              color: colors.background,
              border: `1px solid ${colors.background}`,
              borderRadius: radii.small,
              padding: spacing.sm,
              fontSize: "26px",
            }}
          />
            </div>
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
              fontWeight: 600,
            }}
          >
            {loading  ? "Отправка..." : "Get a discount"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DiscountOffer;
