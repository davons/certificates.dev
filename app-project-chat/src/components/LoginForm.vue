<script setup>
import { ref } from "vue";
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

const emits = defineEmits(['login']);
const router = useRouter()

const email = ref('')
const password = ref('')

const { isLoading, error, login } = useLogin()

const handleSubmit = async () => {
    await login(email.value, password.value)
    if (!error.value) {
        emits('login')
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" require placeholder="Email" v-model="email" />
        <input type="password" require placeholder="Passworld" v-model="password" />
        <button :disabled="isLoading"> {{ isLoading ? 'Loading...': 'Login'}}</button>
        <p v-if="error" class="error"> {{ error }}</p>
    </form>
</template>
