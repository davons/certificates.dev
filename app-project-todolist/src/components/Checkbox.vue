<script setup>
const model = defineModel()
const props = defineProps({
  label: String,
})
const emits = defineEmits(['check', 'uncheck'])

const onChange = (event) => {
  if (event.currentTarget.checked) {
    emits('check', event.currentTarget)
  } else {
    emits('uncheck', event.currentTarget)
  }
}
</script>

<template>
  <label :class="{ completed: model }">
    <input type="checkbox" @change="onChange" v-model="model" />
    {{ label }}
  </label>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
