<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container display-flex my-md mx-sm">

    <h1>7 GUIs</h1>

    <div class="grid links">
        <RouterLink :to="{ name: 'Counter' }">Counter</RouterLink>
        <RouterLink :to="{ name: 'TemperatureConverter' }" aria-current="page">Temperature</RouterLink>
        <RouterLink :to="{ name:'FlightBooker' }">Fliter Booker</RouterLink>
        <RouterLink :to="{ name: 'Timer'} ">Timer</RouterLink>
        <RouterLink :to="{ name: 'Crud'} ">Crud</RouterLink>
        <RouterLink :to="{ name: 'CircleDrawer'} ">Circle Drawer</RouterLink>
        <RouterLink :to="{ name: 'Cells' } ">Cells</RouterLink>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.links {
  margin: 20px 20px;
}
</style>
