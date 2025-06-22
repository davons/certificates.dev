import { onUnmounted, ref } from 'vue'
import { db } from '@/firebase/config'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'

const useCollection = (collectionName: string) => {

    const error = ref<string | null>(null)
    const isPending = ref(false)
    const documents = ref<any[]>([])
      let unsubscribe = null

    //add document firestore
    const addDocument = async (docData: Record<string, any>) => {
        error.value = null
        isPending.value = true

        try {

            const colRef = collection(db, collectionName) 

            await addDoc(colRef, {
                ...docData,
                createdAt: serverTimestamp(),
            })
            
            isPending.value = false

        } catch (err: any) {
            error.value = err.message
            isPending.value = false 
            console.error("Firestore addDoc error: ", err.message)
        }
    }

    //get collection documents
    const getCollection = async (collectionName) => {
        error.value = null
        isPending.value = true

        try {
            const colRef = collection(db, collectionName)
            const q = query(colRef, orderBy('createdAt', 'asc'))
            
            const snapshot = await getDocs(q)
            
            documents.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))

            isPending.value = false

        } catch (err: any) {
            error.value = err.message
            isPending.value = false 
            console.error('Firstore getDocs error: ', err)
        }
    }

    //get collection documents en temps réel
    const getSnapshotCollection = () => {
        error.value = null
        isPending.value = true

        try {
            const colRef = collection(db, collectionName)
            const q = query(colRef, orderBy('createdAt', 'asc'))

            onSnapshot(q, snapshot => {

                    documents.value = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))

                    isPending.value = false

                }, err => {
                    error.value = err.message
                    isPending.value = false
                    console.error('Firestore onSnapshot error:', err.message)
            })

        } catch (err: any) {
            error.value = err.message
            isPending.value = false
            console.error('Firestore onSnapshot error:', err.message)
        }
    }

    return {
        addDocument,
        getCollection,
        getSnapshotCollection,
        documents,
        error,
        isPending
    }
}

export default useCollection