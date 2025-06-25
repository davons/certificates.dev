<script setup lang="ts">
const props = defineProps({
  product: Object,
})
</script>

<template>
  <div class="product-card">
    <h2>
      <router-link :to="{ name: 'ProductDetail', params: { id: product?.id } }">
        {{ product?.name }}
      </router-link>
    </h2>
    <p>{{ product?.price }} €</p>
    <slot>
      <button @click="$emit('addToCart', product)">Ajouter au panier</button>
    </slot>
  </div>
</template>
