<template>
  <Transition name="fade-slide" mode="out-in" appear="true">
    <slot/>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: 5s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translate(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-10px);
}
</style>