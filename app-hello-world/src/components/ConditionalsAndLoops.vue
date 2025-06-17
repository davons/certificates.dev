<script setup lang="ts">
import { ref } from "vue";

const show = ref(true)
const lists = ref([1,2,3,4])
</script>

<template>
    <h2> Conditionals and Loops</h2>
    <button @click="show = !show">Toogle List</button>
    <button @click="lists.push(lists.length + 1)">Push Number</button>
    <button @click="lists.pop()">Pop Number</button>
    <button @click="lists.reverse()">Reverse list</button>
    <ul v-if="show && lists.length">
        <li v-for="(item, index) in lists" :key="index"> {{ item }}</li>
    </ul>
    <p v-else-if="lists.length">
        List is not empty.
    </p>
    <p v-else>
        List is empty.
    </p>
</template>

<style scoped>
button {
    display: inline-block;
    margin-top: 1em;
}
</style>