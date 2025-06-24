<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import useCollection from '@/composables/useCollection'
import { orderBy, where } from 'firebase/firestore'
import PlayLists from '@/components/PlayLists.vue'
import useUser from '@/composables/useUser'

const { error, isPending, documents, getSnapshotCollection } = useCollection()
const { currentUser } = useUser()

onMounted(async () => {
  if (currentUser?.value?.uid) {
    await getSnapshotCollection('playlists', [
      where('userId', '==', currentUser.value.uid),
      orderBy('createdAt', 'asc'),
    ])
  }
})
</script>

<template>
  <div class="user-playlist">
    <h3>User playlist</h3>
    <p v-if="isPending">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <div v-else>
      <PlayLists :playlists="documents" />
    </div>
  </div>
</template>

<style></style>
