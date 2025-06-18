<script setup lang="ts">
import Modal from '../components/Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
    <h2>Modal with Transitions</h2>
    <button @click="showModal =!showModal">Show modal</button>
    <Teleport to="body">
        <Modal :show="showModal" @close="showModal = false">
            <template #header>Test header</template>
        </Modal>
    </Teleport>
</template>