<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const router = useRouter()
//create
const handleSubmit = async () => {
  try {
        const newProject = {
            title: title.value,
            content: content.value,
            completed: false
        }
        const response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText}`);
        }

        router.push({
            path:'/'
        })

  } catch (err) {
    console.error('Erreur lors de la création du projet:', err);
  }
}
</script>

<template>
    <h3> Add a new project</h3>
    <router-link :to="{ path: '/' }" style="margin-bottom:10px">Retour</router-link>
    <form @submit.prevent="handleSubmit">
        <label for="title">Titre</label>
        <input type="text" id="title" placeholder="Enter title" v-model="title" required>
        <label for="content">Contenu</label>
        <textarea id="content" placeholder="Enter content" v-model="content" required></textarea>
        <button>Envoyer</button>
    </form>
</template>

<style>
form {
    background: white;
    padding: 20px;
    border-radius: 10px;
}
label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin:  20px 0 10px 0;
}
input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}
form button {
    display: block;
    margin: 20px auto 0;
    background: #00cc89;
    color: white;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
}
</style>