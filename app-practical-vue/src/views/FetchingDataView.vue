<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'minor']

const currentBranch = ref(branches[0])
const commits = ref([])

watchEffect(async () => {
    const url = `${API_URL}${currentBranch.value}`
    commits.value = await (await fetch(url)).json()
})

function truncate(v) {
  const newline = v.indexOf('\n')
  return newline > 0 ? v.slice(0, newline) : v
}

function formatDate(v) {
  return v.replace(/T|Z/g, ' ')
}
</script>

<template>
    <h2>Latest Vue Core Commits</h2>
    <template v-for="branch in branches" :key="branch">
        <input type="radio"
            :id="branch"
            :value="branch"
            name="branch"
            v-model="currentBranch">
        <label :for="branch">{{ branch }}</label>
    </template>
    <p>Vuejs/core@{{ currentBranch }}</p>
    <ul v-if="commits.length">
        <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
            <a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a>
            - <span class="message">{{ truncate(commit.message) }}</span><br>
            by <span class="author">
                <a :href="author.html_url" target="_blank">{{ commit.author.name }}</a>
            </span>
            at <span class="date">{{ formatDate(commit.author.date) }}</span>
        </li>
    </ul>
</template>

<style>
p {
    margin-top: 1em;
}
</style>