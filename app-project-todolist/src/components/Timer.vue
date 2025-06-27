<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const time = ref(0)
const elDiv = ref(null)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    console.log(time.value)
    time.value++
    console.log('xxxxxxxxxxxxxxx')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div ref="elDiv">Temps: {{ time }}</div>
</template>
