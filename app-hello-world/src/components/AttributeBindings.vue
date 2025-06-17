<script lang="ts" setup>
import { ref } from 'vue'

const message = ref('Hello world!')
const isRed = ref(true)
const color = ref('green')

const toogleRed = () => {
    isRed.value = ! isRed.value;
}

const toogleColor = () => {
    color.value = color.value == 'green' ? 'blue' : 'green'
}
</script>

<template>
<h2> Attribute Bindings</h2>  
<p>
    <span :title="message">
        Hover your mouse me for a few second
    </span>
</p>  

<p :class="{ red: isRed }" @click="toogleRed">
    This sould be red...
</p>

<p :style="{ color: color }" @click="toogleColor">
    This sould be green.
</p>
</template>

<style scoped>
.red {
    color: red;
}
</style>