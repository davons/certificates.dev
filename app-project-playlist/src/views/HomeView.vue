<script setup lang="ts">
import { orderBy } from 'firebase/firestore'
import useCollection from '@/composables/useCollection'
import { onMounted } from 'vue'
import PlayLists from '@/components/PlayLists.vue'

const { error, isPending, documents, getSnapshotCollection } = useCollection()

onMounted(async () => {
  await getSnapshotCollection('playlists', [orderBy('createdAt', 'asc')])
})
</script>

<template>
  <div class="home">
    <p>Homepage</p>
    <p v-if="isPending">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <div v-else>
      <PlayLists :playlists="documents" />
    </div>
  </div>
</template>

<style></style>
