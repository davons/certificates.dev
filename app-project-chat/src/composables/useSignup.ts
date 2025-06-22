import { ref } from "vue"
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true
    
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (!userCredential) {
            throw new Error("Erreur lors de l'inscription.")
        }

        const user = userCredential.user;

        await updateProfile(user, {
             displayName: displayName,
        });

        isPending.value = false
        console.log("Utilisateur inscrit:", user)

    } catch (err) {
        error.value = err.message
        isPending.value = false
        console.error('Erreur lors de l’inscription :', err)
    }
}

const useSignup = () => {
    return {
       isPending,
       signup,
       error
    }
}

export default useSignup