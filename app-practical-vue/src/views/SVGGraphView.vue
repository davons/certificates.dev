<script setup lang="ts">
import PolyGraph from '../components/PolyGraph.vue'
import { ref, reactive } from 'vue'
import { stat } from 'fs'

const newLabel = ref('')
const stats = reactive([
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
])
const add = (e) => {
    e.preventDefault()
    if (!newLabel.value) return
    stats.push({
        label: newLabel.value,
        value: 100
    })
    newLabel.value = ''
}
const remove = (stat) => {
  if (stats.length > 3) {
    stats.splice(stats.indexOf(stat), 1)
  } else {
    alert("Can't delete more!")
  }
}
</script>

<template>
    <h2>SVG Graph</h2>
    <svg width="200" height="200">
        <PolyGraph :stats="stats"></PolyGraph>
    </svg>

 <!-- controls -->
  <div v-for="t in stats" :key="t.label">
    <label>{{t.label}}</label>
    <input type="range" v-model="t.value" min="0" max="100">
    <span>{{t.value}}</span>
    <button @click="remove(t)" class="remove">X</button>
  </div>

    <form id="add">
        <input name="newLabel" v-model="newLabel" />
        <button @click="add">Add a stat</button>
    </form>
    <pre id="raw">{{ stats }}</pre>
</template>

<style scoped>
polygon {
  fill: #10b66b;
  opacity: 0.75;
}

circle {
  fill: transparent;
  stroke: #8a2b2b;
}

text {
  font-size: 10px;
  fill: #692222;
}

label {
  display: inline-block;
  margin-left: 10px;
  width: 20px;
}

#raw {
  margin-top: 20px;
}
</style>