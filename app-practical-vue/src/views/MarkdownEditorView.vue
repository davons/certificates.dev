<script setup lang="ts">
import { computed, ref } from 'vue'
import { debounce  } from 'lodash-es'
import { marked } from 'marked'

const input = ref('# Titre principal\n\nCeci')
const update = debounce((e) => {
    input.value = e.target.value
},100)
const output = computed(() => marked(input.value))

</script>

<template>
    <h2>Markdown Editor</h2>
    <div class="editor">
        <textarea class="input" :value="input" @input="update"></textarea>
        <div class="output" v-html="output"></div>
    </div>
</template>

<style>

.editor {
  height: 100vh;
  display: flex;
}

.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

</style>