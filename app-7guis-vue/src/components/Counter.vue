<script setup lang="ts">
import { ref } from "vue";

const count = ref(0)
const countUp = () => count.value++
const countDown = () => count.value--

</script>

<template>
    <p>{{ count }}</p>
    <button @click="countUp" style="margin-right: 4px;">+</button>
    <button @click="countDown" style="margin-right: 30px;">-</button>
   <!-- Or -->
    <button @click="count++" style="margin-right: 4px;">+</button>
    <button @click="count--">-</button>
</template>