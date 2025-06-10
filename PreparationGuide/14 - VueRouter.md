# 📚  Vue Router
SPAs
- Display :  `<RouterView/>`
- Navigate : `<RouterLink/>`
- current route : `$route`
## ✅ Getting Started

```html
<!-- App.vue -->
 <template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```
## ✅ Creating the router instance
- createRouter()
```js
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
```

## ✅ Registering the router plugin
```js
createApp(App).use(router).mount('#app')
//or 
const app = createApp(App)
app.use(router)
app.mount('#app')
```
- Its responsibilities:
  
  1. Globally registering the `RouterView` and `RouterLink` components.  
  2. Adding the global `$router` and `$route` properties.  
  3. Enabling the `useRouter()` and `useRoute()` composables.  
  4. Triggering the router to resolve the initial route.

- Accessing the router and current route

 1. Option API

 ```js
 export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
  },
}
 ```
 2. Composition API
 ```js
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>
 ```