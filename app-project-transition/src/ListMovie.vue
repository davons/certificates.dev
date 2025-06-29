<script setup>
import { ref } from "vue"

const props = defineProps({
  movies: Array,
})

const emits = defineEmits(['addMovie', 'deleteMovie', 'randomize'])

const newMovie = ref('')

const handleSubmit = () => {
  emits('addMovie', newMovie.value)
  newMovie.value = ''
}
</script>

<template>

    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="newMovie" placeholder="Ajouter un film" />
        <button type="submit">Ajouter</button>
    </form>

    <TransitionGroup name="list" tag="ul" mode="out-in">
        <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
        <button @click="$emit('deleteMovie', movie)" class="secondary">x</button>
        </li>
    </TransitionGroup>

    <button @click="$emit('randomize')">🎲 Réorganiser</button>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>