<script setup>
import useLogout from '../composables/useLogout'
import useUser from '@/composables/useUser';
import { useRouter } from 'vue-router'

const router = useRouter()
const { error, isPending, logout } = useLogout()
const { currentUser: user } = useUser()

const handleLogout = async () => {

    await logout()

    if (!error.value) {
        router.push({
            name:'Welcome'
        })
    }
}
</script>

<template>
    <nav v-if="user">
        <div>
            <p>Hey there... {{ user.displayName }}</p>
            <p class="email">Currently logged in as...{{ user.email }}</p>
        </div>
        <button @click="handleLogout" :disabled="isPending"> {{ isPending ? 'Loading...': 'Logout'}} </button>
    </nav>
</template>

<style scoped>
nav {
    padding: 20px;
    border-radius: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
nav p{
    margin: 2px auto;
    font-size: 16px;
    color: #444;
}
nav p.email {
    font-size: 14px;
    color: #999;
}
</style>