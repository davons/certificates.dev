<script setup lang="ts">
import { ref } from 'vue'
import Task from './components/Task.vue'
import Filter from './components/Filter.vue'
import Modal from './components/modal/Modal.vue'
import AddTask from './components/addTask.vue'
import { useTasksStore } from './stores/tasksStore'

const store = useTasksStore()
const isModalActive = ref(false)
const appName = ref('Tasks Manager')

const setFilter = (value: string) => {
  store.filterBy = value as 'all' | 'todo' | 'done'
}

const toggleCompleted = (taskId: number) => {
  store.toggleTask(taskId)
}

const closeModal = () => {
  isModalActive.value = false
}
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>
      </div>
      <div class="header-side">
        <button @click="isModalActive = true" class="btn secondary">+ Add Task</button>
      </div>
    </div>

    <Filter :filterBy="store.filterBy" @set-filter="setFilter" />

    <div class="tasks">
      <Task
        v-for="task in store.filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-completed="toggleCompleted"
      />
    </div>

    <Modal v-if="isModalActive" @close-modal="closeModal">
      <AddTask @task-added="closeModal" />
    </Modal>
  </main>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }
}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}
</style>
