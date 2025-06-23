<script setup>
import { ref, onMounted } from "vue";
import userUser from '../composables/useUser'
import useCollection from '../composables/useCollection'

const message = ref('')
const { currentUser: user } = userUser()
const { addDocument, error, isPending } = useCollection('chats')

const handleSubmit = async () => {

    const chat = {
        message: message.value,
        name: user.value.displayName
    }

    await addDocument(chat)

    if (!error.value) {
        message.value = ''
        console.log('Document added')
    }
 
}
</script>

<template>
    <form >
        <textarea
            placeholder="Type a message"
            v-model="message"
            @keypress.enter.prevent="handleSubmit"
            :disabled="isPending"
        >
        </textarea>
        <div v-if="error" class="error"> {{ error }}</div>
        <div v-if="isPending" class="loading"> Loading... </div>
    </form>
</template>

<style scoped>
form {
    margin: 10px;
}
textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
}

.error{
    font-weight: bold;
    color:crimson;
    margin: 10px;
    padding-bottom: 10px;
}
.loading {
    margin: 10px;
    padding-bottom: 10px;
    color: blue;
}
</style>