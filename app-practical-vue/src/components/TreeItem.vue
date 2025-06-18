<script setup lang="ts">
import { computed, ref } from "vue"

const props = defineProps({
    model: Object
})

const isOpen = ref(false)

const isFolder = computed(() => {
    return props.model.children && props.model.children.length
})

const toggle = () => {
    isOpen.value = !isOpen.value
}

const changeType = () => {
    if (!isFolder.value) {
        props.model.children = []
        addChild()
        isOpen.value = true
    }
}

const addChild = () => {
    props.model.children.push({ name: 'New staff'})
}
</script>

<template>
  <li>
    <div
      :class="{ bold: isFolder }"
      @click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model"
        >
      </TreeItem>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<style>
</style>