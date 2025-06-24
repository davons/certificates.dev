import { storage } from '@/firebase/config'
import useUser from './useUser'
import { ref } from 'vue'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const useStorage = () => {
  const { currentUser: user } = useUser()
  const error = ref<string | null>(null)
  const url = ref<string | null>(null)
  const filePath = ref<string>('')
  const isPending = ref(false)

  const uploadImage = async (file: File) => {
    error.value = null
    url.value = null
    isPending.value = true

    try {
      if (!user.value?.uid) {
        throw new Error('User is not authenticated')
      }

      filePath.value = `convers/${user.value?.uid}/${file.name}`
      const fileRef = storageRef(storage, filePath.value)
      // Upload the file
      await uploadBytes(fileRef, file)
      // Get the download URL after successful upload
      const downloadURL = await getDownloadURL(fileRef)
      url.value = downloadURL
      isPending.value = false
    } catch (err: any) {
      error.value = err.message || 'Upload failed'
    } finally {
      isPending.value = false
    }
  }

  const deleteImage = async (path: string) => {
    error.value = null
    isPending.value = true

    try {
      const fileRef = storageRef(storage, path)
      await deleteObject(fileRef)
    } catch (err: any) {
      error.value = err?.message || 'Unknown error occurred'
      console.error('Firebase Storage deleteImage error:', error.value)
    } finally {
      isPending.value = false
    }
  }

  return {
    url,
    error,
    filePath,
    uploadImage,
    deleteImage,
    isPending,
  }
}

export default useStorage
