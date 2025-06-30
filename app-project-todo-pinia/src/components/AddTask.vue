<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const emit = defineEmits(['task-added'])

const store = useTasksStore()
const name = ref('')
const description = ref('')

const submit = () => {
  if (!name.value || !description.value) return

  store.addTask({
    name: name.value,
    description: description.value,
    completed: false,
  })

  name.value = ''
  description.value = ''
  emit('task-added')
}
</script>

<template>
  <div class="add-task">
    <input v-model="name" placeholder="Task name" />
    <textarea v-model="description" placeholder="Task description"></textarea>
    <button @click="submit" class="btn">Add</button>
  </div>
</template>
