import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Стили для кнопок хлебных крошек
const BreadcrumbBtn = ({ children, style }) => (
  <Typography
    style={{
      border: "1px solid rgba(221, 221, 221, 1)",
      padding: "6px",
      borderRadius: "6px",
      color: "rgba(139, 139, 139, 1)",
      
      ...style,
    }}
  >
    {children}
  </Typography>
);

function BreadCrumbs({ breadCrumbs }) {
  return (
    <Breadcrumbs
      separator="-"
      aria-label="breadcrumb"
      style={{
        marginLeft: "40px",
      }}
      sx={{
        "& .MuiBreadcrumbs-separator": {
          margin: "0 10px",
          transform: "scaleX(6)",
          transformOrigin: "47%",
          color: "rgba(221, 221, 221, 1)",
        },
      }}
    >
      {breadCrumbs.map((breadCrumb, index) =>
        index !== breadCrumbs.length - 1 ? (
          <Link
            key={breadCrumb.path}
            to={breadCrumb.path}
            style={{ textDecoration: "none" }}
          >
            <BreadcrumbBtn>{breadCrumb.name}</BreadcrumbBtn>
          </Link>
        ) : (
          <BreadcrumbBtn
            key={breadCrumb.path}
            style={{ color: "black", borderColor: "black" }}
          >
            {breadCrumb.name}
          </BreadcrumbBtn>
        )
      )}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
