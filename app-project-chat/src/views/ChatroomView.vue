<script setup lang="ts"> 
import NavBar from "../components/NavBar.vue";
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";
</script>

<template>
    <div class="container">
        <NavBar />
        <ChatWindow />
        <NewChatForm />
    </div>
</template>