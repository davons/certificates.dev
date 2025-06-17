<script setup lang="ts">
import { ref } from 'vue'

import HandlingUserInput from './components/HandlingUserInput.vue'
import AttributeBindings from './components/AttributeBindings.vue'
import ConditionalsAndLoops from './components/ConditionalsAndLoops.vue'
import FormBindings from './components/FormBindings.vue'
import TodoItem from './components/TodoItem.vue'

const todos = ref([
    {id: 1, text: 'Vegetables'},
    {id: 2, text: 'Cheese'},
    {id: 3, text: 'Whatever'}
])

</script>

<template>
    <h1>Tuto Vue 3</h1>
    <HandlingUserInput />
    <AttributeBindings />
    <ConditionalsAndLoops />
    <FormBindings />
    <h3>Todos</h3>
    <ul>
        <TodoItem v-for="item in todos" :key="item.id" :item="item" />
    </ul>
</template>

<style>
</style>