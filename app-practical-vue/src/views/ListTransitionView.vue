<script setup lang="ts">
import { shuffle as _shuffle } from 'lodash-es'
import { ref } from 'vue'

const getInitialItems = () => [1, 2, 3, 4]
const items = ref(getInitialItems)
let id = items.value.length + 1
const insert = () => {
    const i = Math.round(Math.random() * items.value.length)
    items.value.splice(i, 0, id++)
}
const reset = () => {
    items.value = getInitialItems()
    id = items.value.length + 1
}
const shuffle = () => {
    items.value = _shuffle(items.value)
}
const remove = (item) => {
    const i =  items.value.indexOf(item)
    if (i > -1) items.value.splice(i, 1)
}
</script>

<template>
    <h2>List with Transitions</h2>
    <button @click="insert">Insert</button>
    <button @click="reset">Reset</button>
    <button @click="shuffle">Shuffe</button>

    <TransitionGroup tag="ul" name="fade" class="container">
        <li v-for="item in items" :key="item" class="item">
            {{ item }} 
            <button @click="remove(item)">x</button>
        </li>
    </TransitionGroup>
</template>

<style scoped>

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>