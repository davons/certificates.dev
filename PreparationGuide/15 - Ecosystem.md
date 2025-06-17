# 📚  Ecosystem

## ✅ VueUse
 - Collection of vue composition utilities
 : https://vueuse.org/functions.html
```bash
$ npm i @vueuse/core
```
- cdn
```bash
<script src="https://unpkg.com/@vueuse/shared"></script>
<script src="https://unpkg.com/@vueuse/core"></script>
```
 - Nuxt
```bash
$ npx nuxi@latest module add vueuse
### or
$ npm i -D @vueuse/nuxt @vueuse/core
```
```js
// nuxt3: nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
})
```

- Usage Example
```html
<!-- VueUse in Nuxt -->
<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div>pos: {{ x }}, {{ y }}</div>
</template>
```

```js
<script setup>
   import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

   // tracks mouse position
   const { x, y } = useMouse()

   // is user prefers dark theme
   const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
        'my-storage',
        {
            name: 'Apple',
            color: 'red',
        },
    )
</script>
```
## ✅ Pinia
- The intuitive store for Vue.js

## ✅ Nuxt
## ✅ Vuetify
## ✅ Vue Devtools
## ✅ Volar
## ✅ Vue CLI 3

Vue CLI is in Maintenance Mode!
 - Install
```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
``` 

- create a project
```sh
vue create my-project
# OR
vue ui
``` 