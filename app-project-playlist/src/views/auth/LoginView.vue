<script setup lang="ts">
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const { error, isPending, login } = useLogin()
const router = useRouter()

const handleSubmit = async () => {
  await login(email.value, password.value)

  if (!error.value) {
    router.push({
      name: 'UserPlaylists',
    })
    console.log('Utilisateur connecté')
  }
}
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />

      <p v-if="error" class="error">{{ error }}</p>

      <button :disabled="isPending">{{ isPending ? 'Loading...' : 'Log in' }}</button>
    </form>
  </div>
</template>

<style>
.login {
  margin-top: 50px;
}
</style>
