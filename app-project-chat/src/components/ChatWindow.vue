<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import useCollection from "../composables/useCollection"

const {  error, isPending, getSnapshotCollection, documents } = useCollection('chats')

onMounted( async () => {
   await getSnapshotCollection()
})

const formattedDocuments = computed(() => {
  return documents.value.map(doc => {
    return {
      ...doc,
      formattedTime: formatDistanceToNow(doc.createdAt.toDate())
    }
  })
})

const messages = ref(null)

onUpdated(() => {
    messages.value.scrollTop = messages.value.scrollHeight
})

</script>

<template>
    <div class="chat-window">
        <div v-if="error"> {{ error }}</div>
        <div v-if="documents.length"  class="messages" ref="messages">
            <div v-for="document in formattedDocuments" :key="document.id" class="single">
                <span class="created-at"> {{ document.formattedTime }} </span>
                <span class="name"> {{ document.name }} </span>
                <span class="message"> {{ document.message }} </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-window {
    background: #fafafa;
    padding: 30px 20px;
}
.single {
    margin:  18px 0;
}
.created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
}
.name {
    font-weight: bold;
    margin-right: 6px;
}
.messages {
    max-height: 400px;
    overflow: auto;
}
</style>
