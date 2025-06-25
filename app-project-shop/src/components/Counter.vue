<script setup lang="ts">
import { useCounterStore } from '../stores/counter.ts'

const countStore = useCounterStore()
</script>

<template>
  <div>
    <h3>Counter: {{ countStore.count }}</h3>
    <p>Double: {{ countStore.doubleCount }}</p>
    <button @click="countStore.increment">+</button>
    <button @click="countStore.decrement">-</button>
  </div>
</template>
