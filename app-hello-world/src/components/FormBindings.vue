<script lang="ts" setup>
import { ref } from "vue";

const text = ref('')
const checked = ref(false)
const checkedNames = ref(['jack'])
const language = ref('vue')
const selected = ref('vue')
const multipleSelected = ref(['france'])
</script>

<template>
    <h2>From Bindings</h2>

    <h3>Text input: {{ text }}</h3>
    <input type="text" v-model="text" placeholder="Edit me">

    <h3>Checkbox: {{ checked }}</h3>
    <input type="checkbox" v-model="checked" id="checked" >

    <h3>Multi checkbox: {{ checkedNames }}</h3>
    <input type="checkbox" v-model="checkedNames" id="jack" value="jack"> <label for="jack"> Jack </label>
    <input type="checkbox" v-model="checkedNames" id="yvon" value="yvon"> <label for="yvon"> Yvon </label>
    <input type="checkbox" v-model="checkedNames" id="paul" value="paul"> <label for="paul"> Paul </label>

    <h3>Radio: {{ language }}</h3>
    <input type="radio" v-model="language" value="vue" id="vue"> <label for="vue">Vue</label>
    <input type="radio" v-model="language" value="react" id="react"> <label for="react">React</label>
    <input type="radio" v-model="language" value="angular" id="angular"> <label for="angular">Angular</label>

    <h3>Select: {{ selected }}</h3>
    <select v-model="selected">
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
    </select>

    <h3>Multiple Selected: {{ multipleSelected }}</h3>
    <select v-model="multipleSelected" multiple style="width: 100px;">
        <option value="france">France</option>
        <option value="allemagne">Allemagne</option>
        <option value="espagne">Espange</option>
        <option value="italie">Italie</option>
    </select>
</template>

<style scoped>
</style>