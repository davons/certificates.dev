<script setup>
import { onMounted, ref } from 'vue'
import Quiz from './components/Quiz.vue'

const quiz = ref(null)
const isLoading = ref(false)
const error = ref(null)

const fetchQuiz = async () => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:5173/quiz.json')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    quiz.value = await response.json()
    isLoading.value = false
  } catch (err) {
    isLoading.value = false
    console.error('Fetch error: ', err)
    error.value = err.message || 'An unknown error occurred'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchQuiz)
</script>

<template>
  <div class="container">
    <div v-if="error" style="color: crimson">❌ {{ error }}</div>

    <div v-else-if="isLoading" aria-busy="true">Loading quiz...</div>

    <div v-else>
      <Quiz :quiz="quiz" v-if="quiz" />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
