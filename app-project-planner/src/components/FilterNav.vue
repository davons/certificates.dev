<script setup>
const props = defineProps({
    current: String
})
const emit = defineEmits(['filterChange'])
const applyFilter = (by) => {
    emit('filterChange', by)
}
</script>

<template>
    <nav class="filter-nav">
        <button 
            @click="applyFilter('all')" 
            :class="{ active: current == 'all'}"
            >
            View all
        </button>
        <button 
            @click="applyFilter('completed')"
            :class="{ active: current == 'completed'}"
            >
            Completed
        </button>
        <button 
            @click="applyFilter('ongoing')"
            :class="{ active: current == 'ongoing'}"
            >
            Ongoing
        </button>
    </nav>
</template>

<style scoped>
.filter-nav button {
    background: none;
    border: none;
    color: #bbb;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
}
.filter-nav button.active {
    color: #555;
}
</style>