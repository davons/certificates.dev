import { ref } from "vue"
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const error = ref(null)
const isPending = ref(false)

const login = async (
    email: string, 
    password: string
) => {

    error.value = null
    isPending.value = true
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        if (!userCredential) {
            throw new Error("Erreur lors de l'authentification.")
        }

        const user = userCredential.user;
        isPending.value = false
        console.log("Utilisateur connecté")
    } catch (err: any) {
        error.value = err.message
        isPending.value = false
        console.error("Erreur lors de l'authentication:", err)
    }
}

const useLogin = () => {
    return {
        isPending,
        login,
        error
    }
}

export default useLogin