<script setup>
import { ref } from 'vue';

const url = "http://localhost:3000/projects/"
const props = defineProps({
    project: Object
})
const emit = defineEmits(['delete', 'update', 'completed'])
const showContent = ref(false)

//update
const updateProject = async () => {
    try {
        const response = await fetch(`${url}${props.project.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.project.id,
                title: 'Nouveau titre complet',
                content: 'Nouveau contenu complet',
                completed: false
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erreur ${response.status}: ${errorText}`)
        }

        console.log('Projet mis à jour avec succès')
    } catch (err) {
        console.error('Erreur lors de la mise à jour du projet:', err)
    }
}

//delete
const deleteProject = async () => {
    try {
        const response = await fetch(`${url}${props.project.id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erreur ${response.status}: ${errorText}`)
        }

        emit('delete', props.project.id)

        console.log('Projet supprimé avec succès')
    } catch (err) {
        console.error('Erreur lors de la suppression du projet:', err)
    }
}

//completed
const toogleCompleted = async () => {
  try {
        const response = await fetch(`${url}${props.project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !props.project.completed })
        });
        
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${await response.text()}`);
        }

        const updatedProject = await response.json();
        emit('completed', updatedProject.id)

        console.log('Projet marqué comme terminé:', updatedProject);
  } catch (err) {
        console.error('Erreur lors de la mise à jour du projet:', err);
  }
}
</script>

<template>
    <div class="projects" :class="{ completed: project.completed }">
        <div class="actions">
            <h3 @click="showContent = !showContent" 
                title="Cliquer pour voir le contenu">
                {{ project.title }}
            </h3>
            <div class="icons">
                <span class="material-icons tick"  @click="toogleCompleted()">done</span>
                <router-link  :to="{ name: 'EditProject', params: { id: project.id }}"><span class="material-icons">edit</span></router-link>
                <span class="material-icons" @click="deleteProject()">delete</span>
            </div>
        </div>
        <div v-if="showContent" class="content">
            {{ project.content }}
        </div>
    </div>
</template>

<style>
.projects {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #e90074;
}
.actions h3 {
    cursor: pointer;
}
.actions, .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
.completed {
    border-left: 4px solid #00cc99
}
.projects.completed .tick {
    color: #00cc99;
}
</style>