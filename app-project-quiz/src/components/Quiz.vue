<script lang="ts" setup>
import { ref, computed } from 'vue'
import Progress from '../components/Progress.vue'
import Question from '../components/Question.vue'
import Recap from '../components/Recap.vue'

interface Question {
  question: string
  choices: string[]
  correct_answer: string
}

interface Quiz {
  title: string
  questions: Question[]
  minimum_score: number
  success_message: string
  failure_message: string
}

const props = defineProps<{
  quiz: Quiz
}>()

const step = ref(0)
const answers = ref<string[]>([])

const question = computed(() => props.quiz.questions[step.value] ?? null)
const isLastStep = computed(() => step.value >= props.quiz.questions.length)

const addAnswer = (answer: string) => {
  answers.value[step.value] = answer
  if (!isLastStep.value) {
    step.value++
  }
}
</script>

<template>
  <div v-if="quiz">
    <h1>{{ quiz.title }}</h1>

    <Progress :value="step" :max="quiz.questions.length - 1" />

    <Question
      v-if="question && !isLastStep"
      :key="question.question"
      :question="question"
      @answer="addAnswer"
    />

    <Recap v-else :key="question?.question" :answers="answers" :quiz="quiz" />
  </div>
</template>
