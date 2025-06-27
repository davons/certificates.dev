import { onMounted, onUnmounted, ref } from 'vue'

const useTimer = (init = 0) => {
  const time = ref(init)
  let timer = null

  onMounted(() => {
    timer = setInterval(() => {
      time.value++
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  const start = () => {
    time.value = 0
    timer = setInterval(() => {
      time.value++
    }, 1000)
  }

  const reset = () => {
    clearInterval(timer)
    time.value = 0
  }

  return {
    time,
    reset,
    start,
  }
}

export default useTimer
