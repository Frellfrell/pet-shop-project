export const colors = {
   primary: "rgba(13,80,255,1)",       // основной цвет кнопок
  secondary: "rgba(40,40,40,1)",      // черный текст
  background: "rgba(255,255,255,1)",  // белый
  grayDivider: "rgba(221,221,221,1)", // бордер карточек
  txtGrey: "rgba(139,139,139,1)",     // мелкий серый текст
};
export const typography = {
  TBlack: {
    fontWeight: 700,
    color: colors.secondary,
  },
  TGrey: {
    fontWeight: 400,
    color: colors.txtGrey,
  },
};


export const radii = {
  small: "5px",
  medium: "8px",
  large: "12px",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "40px",
  xxl: "64px",
};

export const button = {
  width: "218px",
  height: "58px",
  borderRadius: radii.small,
  backgroundColor: colors.primary,
  color: colors.background,
  //display: "flex",              
  justifyContent: "center",    
  alignItems: "center",        
  textDecoration: "none",       
  fontWeight: 600,             
  cursor: "pointer",
  transition: "all 0.3s ease", 
};
export const borders = {
  grayDivider: `1px solid ${colors.grayDivider}`,
};

export const shadows = {
  card: "0 4px 12px rgba(0, 0, 0, 0.08)",       // стандартная карточка
  cardHover: "0 8px 20px rgba(0, 0, 0, 0.15)",  // при наведении
  soft: "0 2px 6px rgba(0, 0, 0, 0.05)",        // для кнопок, мелких блоков
};

export const transitions = {
  fast: "all 0.2s ease",
  normal: "all 0.3s ease",
  slow: "all 0.4s ease",
};

