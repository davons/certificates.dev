<script setup lang="ts"></script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 2 } }">Projects 2 </RouterLink>
  </div>
</template>

<style scoped></style>
