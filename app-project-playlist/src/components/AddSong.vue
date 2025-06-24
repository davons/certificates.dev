<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useCollection from '@/composables/useCollection'

const title = ref<string | null>('')
const artist = ref<string | null>('')
const showForm = ref<boolean>(false)

const props = defineProps({
  playlist: Object,
})
const { error, isPending, updatePlaylistSong } = useCollection()

const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: uuidv4(),
  }

  if (props.playlist?.id) {
    await updatePlaylistSong('playlists', props.playlist?.id, {
      songs: [...props.playlist.songs, newSong],
    })

    if (!error.value) {
      showForm.value = false
      title.value = artist.value = ''
    }
  }
}

const handleCancel = () => {
  showForm.value = false
}
</script>

<template>
  <div class="add-song">
    <button @click="showForm = true" v-if="!showForm">Add a New Song</button>
    <form @submit.prevent="handleSubmit" v-show="showForm">
      <h3>Add a New Song</h3>
      <input type="text" v-model="title" placeholder="Song title" />
      <input type="text" v-model="artist" placeholder="Name artist" />
      <button :disabled="isPending">Add a song</button>
      <button @click="handleCancel" style="margin-left: 20px">Cancel</button>
    </form>
  </div>
</template>

<style>
.add-song {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
