<script lang="ts" setup>
    defineProps({
        item: Object
    })
</script>

<template>
    <li>{{ item.text }}</li>
</template>