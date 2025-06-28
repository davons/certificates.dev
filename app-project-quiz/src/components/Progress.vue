<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div>
    Étape : {{ props.value }} / {{ props.max + 1 }}
    <progress :value="props.value" :max="props.max" />
  </div>
</template>
