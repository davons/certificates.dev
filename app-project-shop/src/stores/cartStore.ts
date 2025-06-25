import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/composables/useProducts'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<{ id: number; name: string; price: number; quantity: number }[]>([])

  const addToCart = (product: Product) => {
    const existing = cartItems.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId)
  }

  const total = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const resetCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    total,
    resetCart,
  }
})
