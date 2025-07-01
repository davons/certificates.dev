<script setup lang="ts">
import { ref } from 'vue'
import type { ICart, IMenu } from './types/index'
import PizzaMenu from './components/PizzaItem.vue'
import Basket from './components/Basket.vue'

const menus = ref<IMenu[]>([
  {
    id: 1,
    image: 'pizza-1.png',
    name: 'BISMARCK',
    price: 30,
    calories: '800 kcal',
    fats: '50 g',
  },
  {
    id: 2,
    image: 'pizza-2.png',
    name: 'FIORI DI ZUCCA',
    price: 50,
    calories: '800 kcal',
    fats: '50 g',
  },
  {
    id: 3,
    image: 'pizza-3.png',
    name: 'VALDOSTANA',
    price: 55,
    calories: '800 kcal',
    fats: '50 g',
  },
  {
    id: 4,
    image: 'pizza-4.png',
    name: 'PIZZA TARTUFATA',
    price: 45,
    calories: '800 kcal',
    fats: '50 g',
  },
  {
    id: 5,
    image: 'pizza-5.png',
    name: 'FRANCESCANA',
    price: 25,
    calories: '800 kcal',
    fats: '50 g',
  },
])

const carts = ref<ICart[]>([])

const handleAddToCart = (item: IMenu) => {
  const existing = carts.value.find((t) => t.id === item.id)
  if (existing) {
    existing.quantity++
  } else {
    carts.value.push({ ...item, quantity: 1 })
  }
}

const handleRemoveToCart = (id: number) => {
  carts.value = carts.value.filter((item) => item.id !== id)
}

const addQuantity = (id: number) => {
  const existing = carts.value.find((t) => t.id === id)
  if (existing) existing.quantity++
}

const removeQuantity = (id: number) => {
  const existing = carts.value.find((t) => t.id === id)
  if (existing) existing.quantity--

  if (existing.quantity == 0) {
    carts.value = carts.value.filter((item) => item.id !== id)
  }
}
</script>

<template>
  <div id="pizza-restaurant" class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-9 p-4">
        <div class="text-center title-holder">
          <span class="subtitle"> CHOOSE YOUR FLAVOR </span>
          <h1 class="title">THE BEST PIZZA MENU IN TOWN</h1>
          <p class="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu in pretium
            molestie. Interdum et malesuada fames ac.
          </p>
        </div>

        <div class="row row-cols-4 mt-4">
          <PizzaMenu
            v-for="menu in menus"
            :key="menu.id"
            :menu="menu"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>
      <div class="col-3 cart p-4">
        <Basket
          :carts="carts"
          @remove-to-cart="handleRemoveToCart"
          @add-quantity="addQuantity"
          @remove-quantity="removeQuantity"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
