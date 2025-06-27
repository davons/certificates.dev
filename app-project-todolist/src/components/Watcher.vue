<script setup>
import { watch, ref, watchEffect } from 'vue'
import useTimer from '../composable/useTimer'

const page = ref({ title: '' })
/*watch(
  () => page.value.title,
  (newValue, oldValue) => {
    document.title = page.value.title
  },
  { immediate: true },
)*/

watchEffect(() => {
  document.title = page.value.title
})

const { time, reset, start } = useTimer()
</script>

<template>
  <div>Timer: {{ time }}</div>
  <button @click="reset">Reset</button>
  <button @click="start">Start</button>
  <input v-model="page.title" />
</template>
