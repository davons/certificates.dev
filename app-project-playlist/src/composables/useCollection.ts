import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { db } from '@/firebase/config'
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  QueryConstraint,
} from 'firebase/firestore'

const useCollection = () => {
  const error = ref<string | null>(null)
  const isPending = ref<boolean>(false)
  const document = ref<any>(null)
  const documents = ref<any[]>([])

  /**
   * Add a document in Firestore.
   * @param data - The fields to update (partial object).
   */
  const addDocument = async (collectionName: string, docData: Record<string, any>) => {
    error.value = null
    isPending.value = true

    try {
      const colRef = collection(db, collectionName)

      const res = await addDoc(colRef, {
        ...docData,
        createdAt: serverTimestamp(),
      })

      isPending.value = false
      return res
    } catch (err: any) {
      error.value = err.message
      isPending.value = false
      console.error('Firestore addDoc error: ', err.message)
    }
  }

  /**
   * Get a document in Firestore.
   * @param docId - The document ID to update.
   */
  const getDocument = async (collectionName: string, docId: string) => {
    error.value = null
    isPending.value = true
    try {
      const docRef = doc(db, collectionName, docId)

      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        document.value = {
          id: docSnap.id,
          ...docSnap.data(),
        }
      } else {
        error.value = 'Document does not exist'
      }

      isPending.value = false
    } catch (err: any) {
      error.value = err?.message || 'Unknown error occurred'
      isPending.value = false
      console.error('Firestore getDocument error:', error.value)
    }
  }

  /**
   * delete a document in Firestore.
   * @param docId - The document ID to update.
   */
  const deleteDocument = async (collectionName: string, docId: string) => {
    error.value = null
    isPending.value = true
    try {
      const docRef = doc(db, collectionName, docId)
      await deleteDoc(docRef)
    } catch (err: any) {
      error.value = err?.message || 'Unknown error occurred'
      console.error('Firestore deleteDocument error:', error.value)
    } finally {
      isPending.value = false
    }
  }

  /**
   * Update a document in Firestore.
   * @param docId - The document ID to update.
   * @param data - The fields to update (partial object).
   */
  const updatePlaylistSong = async (
    collectionName: string,
    docId: string,
    data: Record<string, any>,
  ) => {
    error.value = null
    isPending.value = true
    try {
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, data)
    } catch (err: any) {
      error.value = err?.message || 'Unknown error occurred'
      console.error('Firestore update error:', error.value)
    } finally {
      isPending.value = false
    }
  }

  /**
   * Update a document in Firestore.
   * @param collectionName - Name of the Firestore collection
   * @param playlistId - The document ID to update.
   * @param data - The fields to update (partial object).
   */
  const deletePlaylistSong = async (
    collectionName: string,
    playlistId: string,
    songId: string,
    data: object,
  ) => {
    error.value = null
    isPending.value = true

    try {
      const playlistRef = doc(db, collectionName, playlistId)

      await updateDoc(playlistRef, {
        songs: data,
        updatedAt: new Date(),
      })
    } catch (err: any) {
      error.value = err?.message || 'Failed to delete song'
      console.error('DeletePlaylistSong error:', error.value)
    } finally {
      isPending.value = false
    }
  }

  //get collection documents
  const getCollection = async (collectionName: string) => {
    error.value = null
    isPending.value = true

    try {
      const colRef = collection(db, collectionName)
      const q = query(colRef, orderBy('createdAt', 'asc'))

      const snapshot = await getDocs(q)

      documents.value = snapshot.docs.map((doc) => ({
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

  /**
   * Subscribe to a real-time Firestore collection query.
   * @param collectionName - Name of the Firestore collection
   * @param constraints - Optional array of Firestore query constraints
   */
  const getSnapshotCollection = (collectionName: string, constraints: QueryConstraint[] = []) => {
    error.value = null
    isPending.value = true

    try {
      const colRef = collection(db, collectionName)
      const q = query(colRef, ...constraints)

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          documents.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          isPending.value = false
        },
        (err) => {
          error.value = err.message
          isPending.value = false
          console.error('Firestore onSnapshot error:', err.message)
        },
      )

      // Cleanup when component is unmounted
      watchEffect((onInvalid) => {
        onInvalid(() => unsubscribe())
      })
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
      isPending.value = false
      console.error('Firestore onSnapshot error:', err.message)
    }
  }

  return {
    addDocument,
    getCollection,
    getSnapshotCollection,
    getDocument,
    deleteDocument,
    updatePlaylistSong,
    deletePlaylistSong,
    documents,
    document,
    error,
    isPending,
  }
}

export default useCollection
