<script setup lang="ts">
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const displayName = ref('')

const { error, isPending, signup } = useSignup()
const router = useRouter()

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value)

  if (!error.value) {
    console.log('Utilisateur inscrit')
    router.push({
      name: 'Login',
    })
  }
}
</script>

<template>
  <div class="signup">
    <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <input type="text" placeholder="Display name" v-model="displayName" />
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />

      <p v-if="error" class="error">{{ error }}</p>

      <button :disabled="isPending">{{ isPending ? 'Loading...' : 'Log in' }}</button>
    </form>
  </div>
</template>

<style></style>
