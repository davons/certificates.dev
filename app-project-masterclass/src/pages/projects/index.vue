<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { IProject } from '@/types'

const columns = [
  { key: 'id', label: 'ID', class: 'w-[100px]' },
  { key: 'name', label: 'Titre' },
  { key: 'collaborators', label: 'Collaborations' },
  { key: 'status', label: 'Statut' },
  { key: 'created_at', label: 'Date création' },
]

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
  <div class="p-4">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Liste des projets</h1>
    </div>

    <div v-if="loading">Chargement…</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <DataTable :columns="columns" :data="projects" caption="Vos projets tâches">
        <template #cell-name="{ row }">
          <RouterLink :to="`/projects/${row.slug}`" class="text-blue-600 hover:underline">
            {{ row.name }}
          </RouterLink>
        </template>
      </DataTable>
    </div>
  </div>
</template>
