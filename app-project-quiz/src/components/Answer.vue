<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  disabled: Boolean,
})

const model = defineModel()

const isCorrect = computed(() => props.disabled && props.value === props.correctAnswer)
const isWrong = computed(() => props.disabled && props.value !== props.correctAnswer)

const classes = computed(() => ({
  correct: isCorrect.value,
  incorrect: isWrong.value,
}))
</script>

<template>
  <label :for="id" :class="classes">
    <input
      :id="id"
      type="radio"
      name="answer"
      :value="value"
      v-model="model"
      :disabled="disabled"
    />
    {{ value }}
  </label>
</template>

<style scoped>
.correct {
  background-color: #d4edda;
  color: #155724;
}
.incorrect {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
