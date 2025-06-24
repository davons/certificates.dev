<script setup lang="ts">
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import useUser from '@/composables/useUser'
import { useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const file = ref<File | null>(null)
const fileError = ref('')
const acceptedTypes = ['image/png', 'image/jpeg']

const { url, error: storageError, filePath, uploadImage, isPending: loading } = useStorage()
const { error, isPending, addDocument } = useCollection()
const { currentUser: user } = useUser()
const router = useRouter()

const handleChange = (e: Event) => {
  fileError.value = ''
  const target = e.target as HTMLInputElement
  const selected = target.files?.[0] || null

  if (selected && acceptedTypes.includes(selected.type)) {
    file.value = selected
  } else {
    file.value = null
    fileError.value = 'Please select an image file (png or jpeg)'
  }
}

const handleSubmit = async () => {
  /*if (!file.value) {
    fileError.value = 'Please select an image before submitting.'
    return
  }

  if (!error.value) {
    await uploadImage(file.value)
  }*/

  const res = await addDocument('playlists', {
    title: title.value,
    content: content.value,
    userId: user.value?.uid,
    userName: user.value?.displayName,
    coverUrl: null,
    filePath: 'https://bootstrapmade.com/content/demo/College/assets/img/education/showcase-6.webp',
    songs: [],
  })

  if (!error.value) {
    router.push({
      name: 'PlaylistShow',
      params: { id: res?.id },
    })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>

    <input type="text" v-model="title" placeholder="Title" required />
    <textarea v-model="content" placeholder="Content" required></textarea>

    <!-- label for="cover">Upload Cover</label>
    <input type="file" id="cover" @change="handleChange" accept="image/png, image/jpeg" />

    <div class="error" v-if="fileError">{{ fileError }}</div -->

    <button :disabled="isPending">{{ isPending ? 'Loading...' : 'Create' }}</button>
    <div class="error" v-if="error">{{ error }}</div>
  </form>
</template>

<style>
input[type='file'] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}
</style>
