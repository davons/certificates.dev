<script setup>
import { onMounted, ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import FilterNav from '@/components/FilterNav.vue';
import ProjectItem from '@/components/ProjectItem.vue'

const url = 'http://localhost:3000/projects'
const error = ref(null)
const projects = ref([])
const current = ref('all')

const fetchProjects = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      projects.value = data
      
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch projects:', err)
    }
}

const handleDelete = (id) => {
    projects.value = projects.value.filter((p) => p.id != id)
}

const handleCompleted = (id) => {
    let p = projects.value.find((project) => project.id === id)
    p.completed = !p.completed
}

const filterProjects = computed(() => {
  
  if (current.value == 'completed') {
     return projects.value.filter((p) => p.completed == true )
  }
  
  if (current.value == 'ongoing') {
     return projects.value.filter((p) => p.completed == false)
  }

  return projects.value;
})
onMounted(fetchProjects)

</script>

<template>

  <NavBar />

  <FilterNav @filterChange="current = $event" :current ="current" />

  <div v-if="error" class="red">
    Error: {{ error }}
  </div>

  <div v-else-if="projects.length > 0">
      <div v-for="project in filterProjects" :key="project.id">
        <project-item :project="project" @delete="handleDelete" @completed = "handleCompleted"/>
      </div>
  </div>

  <div v-else>
    Loading projects...
  </div>
</template>

<style scoped>
.red {
  color: crimson;
}
</style>