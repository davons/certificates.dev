<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from 'vue-router'
import SignupForm from "@/components/SignupForm.vue"
import LoginForm from "@/components/LoginForm.vue"

const router  = useRouter();
const showLogin = ref(true)

const enterChatroom = () => {
    router.push({
        name: 'Chatroom'
    })
}
</script>

<template>
    <div class="welcome container">
        <div v-if="showLogin">
            <h2>Login</h2>
            <LoginForm @login="enterChatroom"/>
            <p> Not account yet ? <span @click="showLogin = false "> Signup </span>instead</p>
        </div>
        <div v-else>
            <h2>Signup</h2>
            <SignupForm @signup="enterChatroom"/>
            <p> Already have account ? <span @click="showLogin = true "> Login </span>instead </p>
        </div>
    </div>
</template>

<style>
.welcome {
    text-align: center;
    padding: 20px 0;
}

.welcome form {
    width: 300px;
    margin:  20px auto;
}

.welcome label {
    display: block;
    margin: 20px 0 10px;
}

.welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: noe;
    color: #999;
    margin: 10px auto;
}

.welcome span {
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
}

.welcome button {
    cursor: pointer;
    margin: 20px auto;
}
</style>