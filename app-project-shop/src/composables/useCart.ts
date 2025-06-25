import { computed, ref } from 'vue'
import type { Product } from './useProducts'

const useCart = () => {
  const cartItems = ref<{ id: number; name: string; price: number; quantity: number }[]>([])

  const addToCart = (product: Product) => {
    const existing = cartItems.value.find((item) => item?.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const total = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    total,
  }
}

export default useCart
