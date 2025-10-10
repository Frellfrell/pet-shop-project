import { Typography } from "@mui/material";

function PageTitle({ text }) {
  return (
    <Typography
      component="h1"
      sx={{
        fontWeight: 700,
        margin: { xs: "24px 0", sm: "32px 0", md: "40px 0" },
        color: "secondary",
        fontSize: {
          xs: "28px", // до 600px
          sm: "36px", // до 900px
          md: "48px", // до 1200px
          lg: "64px", // от 1200px и выше
        },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      {text}
    </Typography>
  );
}

export default PageTitle;
