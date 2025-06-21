<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const url = "http://localhost:3000/projects/"
const title = ref('');
const content = ref('');

const router = useRouter()
const props = defineProps({
    id: String 
})

const fetchProject = async () => {
  try {

    const response = await fetch(`${url}${props.id}`)
    const data = await response.json()
    title.value = data.title
    content.value = data.content
    
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch project:', err)
  }
}

const handleSubmit = async () =>{
    try {
        const updateProject = {
            title: title.value,
            content: content.value,
        }
        
        const response = await fetch(`${url}${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateProject)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText}`);
        }

        router.push({ path: '/' })
    } catch (err) {
         console.error('Erreur lors de l"édition du projet:', err);
    }
}
onMounted(fetchProject)
</script>

<template>
    <h3>Edit project</h3>
    <router-link :to="{ path: '/' }" style="margin-bottom:10px">Retour</router-link>
    <form @submit.prevent="handleSubmit">
        <label for="title">Titre</label>
        <input type="text" id="title" placeholder="Enter title" v-model="title" required>
        <label for="content">Contenu</label>
        <textarea id="content" placeholder="Enter content" v-model="content" required></textarea>
        <button>Modifier</button>
    </form>
</template>

<style scoped>
</style>