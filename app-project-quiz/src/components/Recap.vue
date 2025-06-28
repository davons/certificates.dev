<script setup>
import { computed } from 'vue'

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
  quiz: {
    type: Object,
    required: true,
  },
})

const score = computed(() =>
  props.quiz.questions.reduce(
    (sum, question, index) => sum + (question.correct_answer === props.answers[index] ? 1 : 0),
    0,
  ),
)

const isOwner = computed(() => score.value >= props.quiz.minimum_score)
</script>

<template>
  <div>
    <h1>Recap</h1>

    <p>{{ isOwner ? quiz.success_message : quiz.failure_message }}</p>
    <p>Score: {{ score }} / {{ quiz.questions.length }}</p>
  </div>
</template>
