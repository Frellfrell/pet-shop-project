import { Button, Checkbox, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function FilterSet({ products, setFilteredProducts, isDiscountPage }) {
  const [minPrice, setMinPrice] = useState(0)
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value)
  }

  const [maxPrice, setMaxPrice] = useState(0)
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value)

  }

  const [showDiscounted, setShowDiscounted] = useState(isDiscountPage ? true : false)
  const handleDiscountedChange = (e) => {
    setShowDiscounted(e.target.checked)
  }

  const selectOptions = ["by default", "newest", "price: low to high", "price: high to low"]
  const [sortOption, setSortOption] = useState(selectOptions[0])
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  useEffect(() => {
    let filtered = [...products];
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= (maxPrice || Infinity))

    if (showDiscounted) {
      filtered = filtered.filter(product => product.discont_price !== null);
    }

    switch (sortOption) {
      case 'price: low to high':
        filtered.sort((a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price));
        break;
      case 'price: high to low':
        filtered.sort((a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      default:
      // do nothing


    }
    setFilteredProducts(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      const prevIds = prev.map(p => p.id).join(",");
      const newIds = filtered.map(p => p.id).join(",");
      if (prevIds === newIds) return prevArray; // если фильтр не изменился — не обновляем
      return filtered;
    });


  }, [minPrice, maxPrice, showDiscounted, sortOption, products, setFilteredProducts]);


  return (
    <div style={{ display: "flex", maxHeight: "36px", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography sx={{ fontSize: "20px", lineHeight: "130%", color: "rgba(40, 40, 40, 1)" }}>Price</Typography>
        <TextField
          label="from"
          variant="outlined"
          size="small"
          placeholder="From"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <TextField
          label="to"
          variant="outlined"
          size="small"
          placeholder="To"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {!isDiscountPage && <><Typography fontSize={"20px"}>Discounted Items</Typography>
          <Checkbox checked={showDiscounted} onChange={handleDiscountedChange} /></>
        }
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography fontSize={"20px"}>Sorted</Typography>
        <Select  size="small" value={sortOption} onChange={handleSortChange}>
          {selectOptions.map(option => (<MenuItem  key={option} value={option}>{option}</MenuItem>))}
        </Select>

      </div>
    </div>
  );
}

export default FilterSet;
