# 📚  Creating a Vue Application

- **Vue SPA (Single Page Application)**  
  Using modern tooling like Vite to scaffold a full-featured app.

- **From a CDN**  
  Include Vue via a `<script>` tag for quick prototyping or learning.

- **The Application Instance**  
  Understand how to create and mount the Vue application using `createApp`.
# ✅ 1.  Vue SPA (Single Page Application)

Using Vite and Node.js to create a new Vue.js project:

```bash
# Using npm
$ npm create vue@latest

# Using Bun
$ bun create vue@latest

# Using pnpm
$ pnpm create vue@latest

# Using Yarn (modern / Berry)
$ yarn create vue@latest # Recommended for Yarn modern (Plug'n'Play)

# Using Yarn 4.11+ with `dlx`
$ yarn dlx create-vue@latest # Alternative for Yarn v4.11+ if create-vue is not available directly
```

## Exemple

```bash
# with npm
$ npm create vue@latest
# then
$ cd <your-project-name>
$ npm install
$ npm run dev

# create product build
$ npm run build
```
## Basic structure (main.js)

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```
# ✅ 2.  From a CDN (Quick prototype)

```js
// Using the Global Build
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```
```js
//Using the ES Module Build
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```
```js
// Enabling Import maps
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```
```html
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```
```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```
# ✅ 3.  Vue Application Instance

## The Root Component
```js 
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```
## Mounting the App
```html
<div id="app"></div>
```
```js
app.mount('#app')
```
## In-DOM Root Component Template
```html
<div id="app">
    <button @click="count++">{{count++}}</button>
</div>
```
```js
import { createApp } from 'vue'
const app = createApp({
    data(){
        return {
            count : 0
        }
    }
});
app.mount('#app')
```
## App Configurations

```js
//app.config.errorHandler
app.config.errorHandler = (err) => {
    /*...*/
}
//app.config.warnHandler
app.config.warnHandler = (err) => {
    /*...*/
}
```
## Multiple application instances

```js
// instance 2
const app1 = createApp({
    /*....*/
})
app1.mount('#container-1')

// instance 2
const app2 = createApp({
    /*...*/
})
app2.mount('#container-2')
```