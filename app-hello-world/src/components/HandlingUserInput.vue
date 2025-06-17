<script setup lang="ts">
import { ref } from "vue";

const message = ref('Handling User Input')
const reverseMessage = () => {
    message.value = message.value.split('').reverse().join('')
}
const notify = () => {
    console.log('Notification')
}
</script>

<template>
    <h2>{{ message }}</h2>
    <button @click="reverseMessage"> Reverse message </button>
    <button @click="message += '!'">Append !</button>
    <button @click="notify">Notify</button>
    <a href="https://vuejs.org" @click.prevent="notify">A link with e.preventDefault()</a>
</template>

<style>
button, a {
    display: block;
    margin: 1em;
}
</style>
