<script setup lang="ts">
const props = defineProps({
    show: Boolean
})
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">Default header</slot>
                </div>

                <div class="modal-body">
                    <slot name="body">Default body</slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        Default footer
                        <button class="modal-default-button" @click="$emit('close')">Fermer</button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition:  all 0.30s ease;
}

.modal-header h3 {
    margin-top:0;
    color:#42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container, 
.modal-leave-to .modal-container {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
}
</style>