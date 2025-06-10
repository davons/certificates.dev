# 📚  Lifecycle Hooks

## ✅ Registering Lifecycle Hooks
Most common used: `onMounted`,`onUpdated`, `onUnmounted`

```js
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    console.log('The component is now mounted')
})
</script>
```

## ✅ Lifecycle Diagram
- beforeCreate 
- created 
- beforeMount
- mounted ✅
- beforeUpdate
- updated ✅
- beforeUnmount
- unmounted ✅

```js
onMounted(() => { ... })
onUpdated(() => { ... })
onUnmounted(() => { ... })
//onBeforeMount, onBeforeUpdate, onBeforeUnmount
```