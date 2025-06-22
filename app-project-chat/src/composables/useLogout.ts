import { ref } from "vue"
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

const error = ref(null)
const isPending = ref(false)

//Déconnexion de l'utilisateur actuel.
const logout = async () => {

    error.value = null;
    isPending.value = true 

    try {

        await signOut(auth)
        isPending.value = false
        
        console.log("Utilisateur déconnecté")

    } catch (error) {
        error.value = error.message
        isPending.value = false;
        console.log('Erreur lors de la deconnection', error.message)
    }
}

const useLogout = () => {
    return {
        error,
        isPending,
        logout
    }
}

export default useLogout