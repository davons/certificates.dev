import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ITask } from '@/types/ITask'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref<ITask[]>([
    {
      id: 1,
      name: 'Website design',
      description: 'Define the style guide, branding and create the webdesign on Figma.',
      completed: true,
    },
  ])

  const filterBy = ref<'all' | 'todo' | 'done'>('all')

  // Auto-increment ID
  let nextId = 2

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
    tasks.value.push({ ...task, id: nextId++ })
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
