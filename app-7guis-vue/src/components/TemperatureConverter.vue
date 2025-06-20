<script setup lang="ts">
import { ref } from "vue";

const c = ref(0)
const f = ref(32)

const setC = (e, v=+e.target.value) => {
    c.value = v 
    f.value = v * (9 / 5) + 32
}
const setF = (e, v= +e.target.value) => {
    f.value = v 
    c.value = (v - 32) * (5 / 9)
}
</script>

<template>
    <input type="number" :value="c" @change="setC"> Celsius = {{  c }} <br/>
    <input type="number" :value="f" @change="setF"> Fahrenheit = {{ f }}
</template>

<style>
</style>