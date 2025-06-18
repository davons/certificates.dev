<script setup lang="ts">
</script>

<template>
    <h1>Vue Pratical</h1>

    <RouterLink :to="{ name: 'MarkdownEditor' }">Markdown Editor</RouterLink>
    <RouterLink :to="{ name: 'FetchingData' }" aria-current="page">Fetching Data</RouterLink>
    <RouterLink :to="{ name:'GridWithSortFilter' }">Grid with Sort and Filter</RouterLink>
    <RouterLink :to="{ name: 'TreeView'} ">Tree View</RouterLink>
    <RouterLink :to="{ name: 'SVGGraph'} ">SVG Graph</RouterLink>
    <RouterLink :to="{ name: 'ModalTransition'} ">Modal with Transitions</RouterLink>
    <RouterLink :to="{ name: 'ListTransition' } ">List with Transitions</RouterLink>
</template>

<style scoped>
a {
    display: block;
    margin-top: 1em;
    text-decoration: none;
}
</style>