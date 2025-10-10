import { Typography } from "@mui/material";

function PageTitle({ text, variant }) {

  const fontSizes = {
  small: { xs: "24px", sm: "32px", md: "40px", lg: "40px" },
  large: { xs: "28px", sm: "36px", md: "48px", lg: "64px" },
};
  return (
    <Typography
      component="h1"
      sx={{
        fontWeight: 700,
        margin: { xs: "24px 0", sm: "32px 0", md: "20px 0" },
        color: "secondary",
        fontSize: fontSizes[variant || "large"],
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      {text}
    </Typography>
  );
}

export default PageTitle;
