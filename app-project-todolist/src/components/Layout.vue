<template>
  <div class="layout">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <aside>
      <slot name="aside" />
    </aside>
    <main>
      <slot name="main" />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
}
.layout > * {
  border: 1px border red;
}
.layout header,
.loyout footer {
  grid-column: 1 / -1;
}
</style>
