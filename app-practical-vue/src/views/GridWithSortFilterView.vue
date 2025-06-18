<script setup lang="ts">
import DemoGrid from "../components/Grid.vue"
import { ref } from 'vue'

const searchQuery = ref('')
const gridColumns = [ 'name', 'power']
const gridData = [
     { name: 'Chuck Norris', power: Infinity },
    { name: 'Bruce Lee', power: 9000 },
    { name: 'Jackie Chan', power: 7000 },
    { name: 'Jet Li', power: 8000 }
]

</script>

<template>
    <h2>Grid with Sort and Filter</h2>
    <form>
        Search <input type="text" name="query" v-model="searchQuery" >
    </form>
    <DemoGrid :data="gridData" :columns="gridColumns" :filter-key="searchQuery"/>
</template>