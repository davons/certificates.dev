<script setup lang="ts">
import useProducts, { type Product } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cartStore'
import { onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

const { products, error, isPending, getProducts } = useProducts()
const cartStore = useCartStore()

onMounted(async () => {
  await getProducts()
})

const addProduct = (product: Product) => {
  cartStore.addToCart(product)
}
</script>

<template>
  <h1>Liste des produits</h1>
  <div v-if="isPending">Chargement...</div>
  <div v-if="error">{{ error }}</div>
  <div v-for="product in products" :key="product.id">
    <ProductCard :product="product" @add-to-cart="addProduct" />
  </div>

  <h2>Panier</h2>

  <ul>
    <li v-for="item in cartStore.cartItems" :key="item.id">
      {{ item.name }} x {{ item.quantity }} / {{ item.price * item.quantity }} $
      <button @click="cartStore.removeFromCart(item.id)">Supprimer</button>
    </li>
  </ul>

  <p>Total: {{ cartStore.total.toFixed(2) }} $</p>

  <router-link :to="{ name: 'Checkout' }">Aller au paiement</router-link>
</template>

<style scoped>
.error {
  color: crimson;
}
</style>
