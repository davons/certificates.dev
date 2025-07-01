<script setup lang="ts">
import { computed } from 'vue'
import { ICart, IMenu } from '../types'

const props = defineProps<{
  carts: ICart[]
}>()

const handleRemoveCart = (id: number) => {
  emit('remove-to-cart', id)
}

const handleAddQuantity = (id: number) => {
  emit('add-quantity', id)
}

const handleRemoveQuantity = (id: number) => {
  emit('remove-quantity', id)
}

const emit = defineEmits<{
  (e: 'add-quantity', id: number): void
  (e: 'remove-quantity', id: number): void
  (e: 'remove-to-cart', id: number): void
}>()

const total = computed(() => {
  return props.carts.reduce((sum, item) => (sum = item.quantity * item.price), 0)
})
</script>

<template>
  <h3 class="title">Your Basket</h3>

  <div class="order-items" v-if="carts.length !== 0">
    <div class="order-item mb-4" v-for="(item, index) in carts" :key="index">
      <img class="order-item-image" :src="`./images/${item.image}`" :alt="item.name" />
      <div class="order-item-content">
        <h5>{{ item.name }} - ${{ item.price.toFixed(2) }}</h5>
        <p>
          <button type="button" class="add" @click="handleAddQuantity(item.id)">+</button>
          {{ item.quantity }}
          <button type="button" class="remove" @click="handleRemoveQuantity(item.id)">-</button>
        </p>
        <div class="order-item-details">
          <div>
            <strong>calories</strong>
            {{ item.calories }}
          </div>

          <div>
            <strong>Squirrels</strong>
            {{ item.Squirrels }}
          </div>

          <div><strong> Fats </strong> {{ item.fats }}</div>
        </div>

        <button type="button" class="remove-icon" @click="handleRemoveCart(item.id)">x</button>
      </div>
    </div>
  </div>
  <div class="cart-empty" v-else>
    <p class="text-center">Your basket is empty</p>
  </div>

  <div class="total-section">
    <h6 class="total-title">Total payment:</h6>
    <span class="amount"> $ {{ total }} </span>
  </div>
</template>
