<script setup>

import Cell from './Cell.vue'
import { cells } from '../stores/index'

const cols = cells.map((_, i) => String.fromCharCode(65 + i))

</script>

<template>
 <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="c in cols" :key="c">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in cells[0].length" :key="i">
        <th>{{ i - 1 }}</th>
        <td v-for="(c, j) in cols" :key="j">
          <Cell :r="i - 1" :c="j"></Cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}
</style>