<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { IProject } from '@/types'

const projects = ref<IProject[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const getProjects = async () => {
  loading.value = true
  const { data, error: fetchError } = await supabase.from('projects').select()

  if (fetchError) {
    error.value = 'Une erreur est survenue lors du chargement des projets.'
  } else {
    projects.value = data ?? []
  }

  loading.value = false
}

onMounted(() => {
  getProjects()
})
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Home</RouterLink>

    <div v-if="loading">Chargement en cours...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }} - {{ project.status }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.error {
  color: brown;
}
</style>
