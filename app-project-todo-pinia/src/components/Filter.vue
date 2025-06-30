<script setup lang="ts">
const props = defineProps(['filterBy'])
</script>

<template>
  <div class="filters">
    <div>
      <p>Filter by state</p>
      <div class="badges">
        <div
          class="badge"
          :class="{ selected: filterBy === 'todo' }"
          @click="$emit('setFilter', 'todo')"
        >
          To-Do
        </div>
        <div
          class="badge"
          :class="{ selected: filterBy === 'done' }"
          @click="$emit('setFilter', 'done')"
        >
          Done
        </div>
        <span
          v-if="filterBy === 'todo' || filterBy === 'done'"
          class="clear"
          @click="$emit('setFilter', 'all')"
        >
          x clear
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 14px 0;
    align-items: center;
  }

  .clear {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }
}
</style>
