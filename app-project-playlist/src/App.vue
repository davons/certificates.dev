<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar />
  <div class="content">
      <RouterView />
  </div>
</template>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
