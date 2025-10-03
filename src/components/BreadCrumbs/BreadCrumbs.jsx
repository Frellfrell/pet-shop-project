import React from "react";
import { Breadcrumbs, Typography, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// Стили для кнопок хлебных крошек
const BreadcrumbBtn = styled(Typography)(({ theme }) => ({
  border: '1px solid rgba(221, 221, 221, 1)',
  padding: '6px 12px',
  borderRadius: '6px',
  color: 'rgba(139, 139, 139, 1)',
  fontWeight: 500,
  fontSize: '14px',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: 'rgba(221, 221, 221, 0.2)',
  },
}));

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <Breadcrumbs
      separator="-"
      aria-label="breadcrumb"
      sx={{
        '& .MuiBreadcrumbs-separator': {
          margin: '0 8px',
          color: 'rgba(221, 221, 221, 1)',
        },
      }}
    >
      {breadCrumbs.map((crumb, index) =>
        index !== breadCrumbs.length - 1 ? (
          <RouterLink
            key={crumb.name}
            to={crumb.path}
            style={{ textDecoration: 'none' }}
          >
            <BreadcrumbBtn>{crumb.name}</BreadcrumbBtn>
          </RouterLink>
        ) : (
          <BreadcrumbBtn
            key={crumb.name}
            sx={{
              color: 'black',
              borderColor: 'black',
              cursor: 'default',
            }}
          >
            {crumb.name}
          </BreadcrumbBtn>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
