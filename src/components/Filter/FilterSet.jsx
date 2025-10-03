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
    let filtered = [...products]
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= (maxPrice || Infinity))

    if (showDiscounted) {
      filtered = filtered.filter(product => product.discont_price !== null
      )
    }

    switch (sortOption) {
      case "price: low to high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price: high to low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        break

    }
    setFilteredProducts(filtered)


  }, [minPrice, maxPrice, showDiscounted, sortOption, products])


  return (
    <>
      <Typography>Price</Typography>
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

      {!isDiscountPage && <><Typography>Discounted Items</Typography>
        <Checkbox checked={showDiscounted} onChange={handleDiscountedChange} /></>
      }

      <Select value={sortOption} onChange={handleSortChange}>
        {selectOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
      </Select>


    </>
  )
}

export default FilterSet;
