<script setup lang="ts">
interface Column<T = any> {
  key: keyof T
  label: string
  class?: string
}

defineProps<{
  columns: Column[]
  data: Record<string, any>[]
  caption?: string
}>()
</script>

<template>
  <Table>
    <TableCaption v-if="caption">{{ caption }}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead v-for="col in columns" :key="col.key" :class="col.class">
          {{ col.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(row, rowIndex) in data" :key="row.id ?? rowIndex">
        <TableCell v-for="col in columns" :key="col.key" :class="col.class">
          <slot :name="`cell-${col.key}`" :row="row">
            {{ row[col.key] }}
          </slot>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
