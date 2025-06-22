<script setup>
import { ref } from "vue";
import useSignup from '@/composables/useSignup'
import {useRouter} from 'vue-router'

const emits = defineEmits(['signup'])
const displayName = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()
const { signup, error, isPending } = useSignup()

const handleSubmit = async () => {
    await signup(email.value, password.value, displayName.value)
    if (!error.value) {
        emits('signup')
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="Display Name" v-model="displayName"/>
        <input type="email" require placeholder="Email" v-model="email" />
        <input type="password" require placeholder="Passworld" v-model="password" />
        <button :disabled="isPending">{{ isPending ? 'Loading...' : 'Sign up'}}</button>
        <p v-if="error" class="error"> {{ error }} </p>
    </form>
</template>
