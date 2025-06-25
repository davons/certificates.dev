<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const carteStore = useCartStore()
const name = ref<string>('')
const email = ref<string>('')
const router = useRouter()
const isEmpty = computed(() => carteStore.cartItems.length === 0)

const submitOrder = () => {
  if (!name.value || !email.value) {
    alert('Veuillez remplir tous les champs!')
    return
  }
  carteStore.resetCart()

  router.push({
    name: 'Success',
  })
}
</script>

<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <div v-if="isEmpty">
      <p>Votre panier est vide</p>
    </div>
    <ul v-else>
      <li v-for="item in carteStore.cartItems" :key="item.id">
        {{ item.name }} x {{ item.quantity }} - {{ (item.price * item.quantity).toFixed(2) }} €
      </li>
    </ul>
    <p><strong>Total: </strong> {{ carteStore.total }}</p>

    <div v-if="!isEmpty">
      <form @submit.prevent="submitOrder">
        <div>
          <label for="name"> Nom </label>
          <input id="name" v-model="name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" v-model="email" required />
        </div>
        <button :disabled="isEmpty">Valider ma commande</button>
      </form>
    </div>
  </div>
</template>

<style>
.checkout {
  max-width: 400px;
  margin: auto;
  font-family: Arial, sans-serif;
}
form > div {
  margin-bottom: 1rem;
}
</style>
