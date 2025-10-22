import { BASE_URL } from "../constants"
import { recalculateCart } from "../redux/reducers/cart"

export const addToCart = (product, dispatch, quantity = 1) => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || []
  const alreadyInCart = existingCart.find(item => item.item.id === product.id)

  if (alreadyInCart) {
    alreadyInCart.quantity += quantity
    localStorage.setItem('cart', JSON.stringify(existingCart))
    dispatch(recalculateCart())
    return
  }

  localStorage.setItem('cart', JSON.stringify([...existingCart, { item: { ...product, image: `${BASE_URL}${product.image}` }, quantity: quantity }]))
  dispatch(recalculateCart())
}

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem('cart')) || []
}

export const countCartItems = () => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || []
  return existingCart.length

}
export const removeFromCart = (productId, newQuantity, dispatch) => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log("Удаляем товар с id:", productId);
  console.log("Корзина ДО:", existingCart);
  // Оставляем только те товары, у которых id не совпадает
  const updatedCart = existingCart.map(entry =>
    String(entry.item.id) === String(productId)
      ? { ...entry, quantity: newQuantity }
      : entry
  );

console.log("Корзина ПОСЛЕ:", updatedCart);
  // Обновляем localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // Пересчитываем количество товаров в Redux
  if (dispatch) {
    dispatch(recalculateCart());
  }
   return updatedCart;
};