<script setup>
import { ref } from 'vue'
import { shuffle } from 'lodash-es'
import ListMovie from './ListMovie.vue'
import FadeSlideTransition from './FadeSlideTransition.vue'

const movies = ref([
  { id: 1, title: 'Titanic' },
  { id: 2, title: 'Les évadés' },
])
const showSpoler = ref(false)

const toggleShowSpoler = () => {
  showSpoler.value =!showSpoler.value
}

const addMovie = (title) => {
  if (!title.trim()) return
  movies.value.push({ id: movies.value.length + 1, title: title.trim() })
}

const deleteMovie = (movie) => {
  movies.value = movies.value.filter((m) => m.id !== movie.id)
}

const randomize = () => {
  movies.value = shuffle(movies.value)
}
</script>

<template>

  <button @click="toggleShowSpoler">Afficher / Masquer le spoiler</button>

  <FadeSlideTransition>
    <div v-if="showSpoler" class="spoiler">
      A la fin de la série !
    </div>
    <div v-else class="spoiler">
      Voir une information!
    </div>
  </FadeSlideTransition>

  <div style="margin-top: 2em;">
      <ListMovie 
        :movies="movies" 
        @add-movie="addMovie"  
        @delete-movie="deleteMovie" 
        @randomize="randomize"
      />
  </div>

</template>

<style scoped>
.spoiler {
  padding: 1rem;
  border: 1px solid #7a7a7a;
  transition: 0.5s;
}
</style>
