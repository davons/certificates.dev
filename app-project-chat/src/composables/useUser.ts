
import { ref } from "vue"
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from "firebase/auth";

const currentUser = ref(auth.currentUser)

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user
    console.log(user)
  } else {
    currentUser.value = null
  }
});

const useUser = () => {
    return {
        currentUser
    }
}

export default useUser