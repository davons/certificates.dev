<script setup lang="ts">
import { IMenu } from '../types'

const props = defineProps<{
  menu: IMenu
}>()

const handleAddToCart = (item: IMenu) => {
  emit('add-to-cart', item)
}

const handleRemoveCart = (id: number) => {
  emit('remove-to-cart', id)
}

const emit = defineEmits<{
  (e: 'add-to-cart', item: IMenu): void
  (e: 'remove-to-cart', id: number)
}>()
</script>

<template>
  <div class="col justify-content-center text-center">
    <div class="d-flex flex-column item">
      <img class="w-100" :src="`./images/${menu.image}`" :alt="menu.name" loading="lazy" />
      <div class="p-3">
        <h5 class="item-name">{{ menu.name }}</h5>
        <h6 class="item-price">${{ menu.price.toFixed(2) }}</h6>
        <button type="button" class="add-cart" @click="handleAddToCart(menu)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
