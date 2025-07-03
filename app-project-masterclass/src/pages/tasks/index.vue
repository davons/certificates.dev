<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'

const columns = [
  { key: 'id', label: 'ID', class: 'w-[100px]' },
  { key: 'name', label: 'Titre' },
  { key: 'project_id', label: 'Project Id' },
  { key: 'collaborators', label: 'Collaborations' },
  { key: 'status', label: 'Statut' },
  { key: 'due_date', label: 'Date limite' },
]

const tasks = ref<Tables<'tasks'>[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const getTasks = async () => {
  loading.value = true
  const { data, error: fetchError } = await supabase.from('tasks').select()

  if (fetchError) {
    error.value = 'Une erreur est survenue lors du chargement des tasks.'
  } else {
    tasks.value = data ?? []
  }

  loading.value = false
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <div class="p-4">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Liste des tâches</h1>
    </div>

    <div v-if="loading">Chargement…</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <DataTable :columns="columns" :data="tasks" caption="Tâches récentes">
        <template #cell-name="{ row }">
          <RouterLink :to="`/tasks/${row.id}`" class="text-blue-600 hover:underline">
            {{ row.name }}
          </RouterLink>
        </template>
      </DataTable>
    </div>
  </div>
</template>
