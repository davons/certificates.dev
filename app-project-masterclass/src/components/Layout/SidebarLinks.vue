<script setup lang="ts">
import type { ILink } from '@/types'

defineProps<{
  links: ILink[]
}>()
</script>

<template>
  <RouterLink
    exactActiveClass="text-primary bg-muted"
    v-for="link in links"
    :key="link.title"
    :to="link.to"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>
