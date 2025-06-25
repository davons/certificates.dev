<script setup lang="ts">
import useProducts from '@/composables/useProducts'
import { onMounted } from 'vue'

const { isPending, error, product, getProduct } = useProducts()
const props = defineProps<{ id: string }>()

onMounted(async () => {
  await getProduct(props?.id)
})
</script>

<template>
  <h3>ProductDetail</h3>
</template>
