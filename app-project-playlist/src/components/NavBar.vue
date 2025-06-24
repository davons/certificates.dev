<script setup lang="ts">
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import useUser from '@/composables/useUser'

const { error, logout, isPending } = useLogout()
const router = useRouter()
const { currentUser: user } = useUser()

const handleLogout = async () => {
  await logout()

  if (!error.value) {
    router.push({
      name: 'Login',
    })
  }
}
</script>

<template>
  <div class="navbar">
    <nav>
      <h1>
        <img src="@/assets/logo.svg" alt="Logo" height="20" />
        <router-link :to="{ name: 'Home' }"> PlayList </router-link>
      </h1>
      <div class="links">
        <div v-if="user" class="user-login">
          <router-link :to="{ name: 'CreatePlayList' }" clas="btn">Create Playlist</router-link>
          <router-link :to="{ name: 'UserPlaylists' }" class="btn">My Playlist</router-link>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else class="guest-login">
          <router-link :to="{ name: 'Signup' }" class="btn">Sign up</router-link>
          <router-link :to="{ name: 'Login' }" class="btn">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* optional subtle shadow */
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

nav h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
}

nav h1 a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-login,
.guest-login {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}

.btn,
button {
  padding: 8px 14px;
  font-size: 14px;
  text-decoration: none;
  border: none;
  background-color: var(--primary);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover,
button:hover {
  background-color: var(--hover);
}

button {
  font-family: inherit;
}
</style>
