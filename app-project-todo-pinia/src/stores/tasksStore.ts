import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ITask } from '@/types/ITask'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const storedTasks = localStorage.getItem('tasks')
  const tasks = ref<ITask[]>(storedTasks ? JSON.parse(storedTasks) : [])

  const filterBy = ref<'all' | 'todo' | 'done'>('all')

  // Computed
  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case 'todo':
        return tasks.value.filter((task) => !task.completed)
      case 'done':
        return tasks.value.filter((task) => task.completed)
      default:
        return tasks.value
    }
  })

  // Actions
  const addTask = (task: Omit<ITask, 'id'>) => {
    const id = Date.now()
    tasks.value.push({ ...task, id })
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.completed = !task.completed
  }

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  return {
    tasks,
    filterBy,
    filteredTasks,
    addTask,
    toggleTask,
    removeTask,
  }
})
