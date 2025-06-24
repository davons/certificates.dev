<script setup lang="ts">
import { computed, onMounted } from 'vue'
import useCollection from '@/composables/useCollection'
import useUser from '@/composables/useUser'
import { useRouter } from 'vue-router'
import AddSong from '@/components/AddSong.vue'

const props = defineProps<{
  id: string
}>()

const { currentUser: user } = useUser()
const {
  error,
  isPending,
  document: playlist,
  getDocument,
  deleteDocument,
  deletePlaylistSong,
} = useCollection()

onMounted(() => {
  if (props.id) {
    getDocument('playlists', props.id)
  }
})

const router = useRouter()
const ownerShip = computed(() => {
  return playlist.value.userId == user.value?.uid
})

const handleDeletePlaylist = async (docId: string) => {
  await deleteDocument('playlists', docId)

  if (!error.value) {
    router.push({
      name: 'Home',
    })
  }
}

const handleDeleteSong = async (song: object) => {
  const updatedSongs = playlist.value.songs.filter((s: any) => s.id !== song?.id)
  await deletePlaylistSong('playlists', props.id, song?.id, updatedSongs)

  if (!error.value) {
    playlist.value.songs = updatedSongs
  }
}
</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error" class="error">{{ error }}</div>

  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.filePath" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="content">{{ playlist.content }}</p>
      <hr />
      <button v-if="ownerShip" :disabled="isPending" @click="handleDeletePlaylist(playlist.id)">
        Delete playlist
      </button>
    </div>

    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
      <div v-else>
        <div v-for="song in playlist.songs" :key="song.id" class="single-song">
          <div class="details">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <button v-if="ownerShip" @click="handleDeleteSong(song)">Delete song</button>
        </div>
      </div>
      <AddSong v-if="ownerShip" :playlist="playlist" />
    </div>
  </div>
</template>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
