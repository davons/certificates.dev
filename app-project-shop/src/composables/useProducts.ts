import { ref } from 'vue'

export interface Product {
  id: number
  name: string
  price: number
  image: string
}

const useProducts = () => {
  const error = ref<string | null>(null)
  const isPending = ref<boolean>(false)
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)

  //get all products
  const getProducts = async () => {
    error.value = null
    isPending.value = true

    try {
      const response = await fetch('http://localhost:3001/products')

      if (!response.ok) throw new Error('Failed to fetch products')

      const data = await response.json()
      products.value = data
    } catch (err: any) {
      error.value = err.message || 'Unknown error occurred'
    } finally {
      isPending.value = false
    }
  }

  // Get a single product by ID
  const getProduct = async (productId: string) => {
    const error = ref<string | null>(null)
    const isPending = ref<boolean>(false)

    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`)
      if (!response.ok) throw new Error('Product not found')

      const data = await response.json()
      products.value = data
    } catch (err: any) {
      error.value = err.message || 'Unknown error occurred'
    } finally {
      isPending.value = false
    }
  }

  return {
    products,
    product,
    error,
    isPending,
    getProducts,
    getProduct,
  }
}

export default useProducts
