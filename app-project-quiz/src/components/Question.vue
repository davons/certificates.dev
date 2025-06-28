<script setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { shuffle } from 'lodash-es'
import Answer from '../components/Answer.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answer'])
const answer = ref(null)
const randomChoices = ref([])
const hasAnswer = computed(() => answer.value !== null)
// Mélange les choix à chaque nouvelle question
watchEffect(() => {
  randomChoices.value = shuffle(props.question.choices)
})

/*const submitAnswer = () => {
  emit('answer', answer.value)
}*/

let timer

onMounted(() => {
  setInterval(() => {
    emit('answer', answer.value)
  }, 3000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="question">
    <h3 v-html="question.question" />
    <ul>
      <li v-for="(choice, index) in randomChoices" :key="choice">
        <Answer
          :id="`answer-${index}`"
          v-model="answer"
          :value="choice"
          :disabled="hasAnswer"
          :correctAnswer="question.correct_answer"
        />
      </li>
    </ul>

    <!--button @click="submitAnswer" :disabled="!hasAnswer">Question suivante</button-->
  </div>
</template>

<style scoped>
.question {
  padding-top: 2rem;
}
.question button {
  margin-left: auto;
  display: block;
}
</style>
