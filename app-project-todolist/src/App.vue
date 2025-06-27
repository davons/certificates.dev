<script setup>
import { computed, onMounted, ref } from 'vue'
import Checkbox from './components/Checkbox.vue'
import Button from './components/Button.vue'
import Layout from './components/Layout.vue'
import Timer from './components/Timer.vue'
import Watcher from './components/Watcher.vue'

const showTimer = ref(true)
const hideCompleted = ref(false)
const todos = ref([])
const newTodo = ref('')

const addTodo = () => {
  let todo = {
    title: newTodo.value,
    completed: false,
    date: Date.now(),
  }
  if (newTodo.value) {
    todos.value.push(todo)
  }
  newTodo.value = ''
}

const sortedTodos = computed(() => {
  let list = todos.value.toSorted((a, b) => a.completed - b.completed)
  if (hideCompleted.value) {
    list = list.filter((todo) => !todo.completed)
  }
  return list
})

const remainingTodos = computed(() => {
  return todos.value.filter((todo) => todo.completed == false).length
})

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => {
      todos.value = data.map((todo) => ({ ...todo, id: todo.id }))
    })
})
</script>

<template>
  <Watcher />
  <Timer v-if="showTimer" />
  <button @click="showTimer = !showTimer">Toggle</button>
  <Layout>
    <template #header>Header</template>
    <template #aside>Aside</template>
    <template #main>main</template>
    <template #footer>Footer</template>
  </Layout>
  <Button>Envoyer</Button>
  <form @submit.prevent="addTodo">
    <fieldset role="group">
      <input type="text" v-model="newTodo" placeholder="Nouveau tâche" />
      <button :disabled="newTodo.length == 0">Ajouter</button>
    </fieldset>
  </form>

  <div v-if="todos.length === 0">Il n'y a pas de tâche :(</div>
  <div v-else>
    <ul>
      <li v-for="todo in sortedTodos" :key="todo.date">
        <Checkbox :label="todo.title" v-model="todo.completed" />
      </li>
    </ul>

    <div>
      <label><input type="checkbox" v-model="hideCompleted" />Masquer</label>
      <p v-if="remainingTodos > 0">{{ remainingTodos }} tâche à faire</p>
      <!--Checkbox
        label="Masquer"
        @check="handleCheck"
        @uncheck="handleUncheck"
      /-->
    </div>
  </div>
</template>
