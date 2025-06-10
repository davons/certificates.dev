# 📚  Components

## ✅ Components Basics
```html
<Root>
    <Header> 
    <Main> -> <Article> *2
    <Aside> -> <Item> * 3

```
- Defining a Component (SFC)
```html
<!-- Composition -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```
```html
<!-- Options -->
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

```js
// Composition
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // Can also target an in-DOM template:
  // template: '#my-template-element'
}
```
```js
// Options
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```

- Using a Component 

```html
<!-- Composition -->
<script setup>
    import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
    <h1>Here is a child component</h1>
    <ButtonCounter />
    <ButtonCounter />
    <ButtonCounter />
</template>
```

```html
<!-- Options -->
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
    <h1>Here is a child component!</h1>
    <ButtonCounter />
    <ButtonCounter />
    <ButtonCounter />
</template>
```

- Passing Props

```html
<!-- Composition -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```
```html
<!-- option -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>

<!-- or compostion setup -->
<script>
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```
- Usage 

```html
<BlogPost title="My Journey With Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

```js
<script setup>
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])

const postFontSize = ref(1)

defineProps(['title'])
defineEmits(['enlarge-text'])

</script>
```
```html
<!-- parent listen the custom event -->
<BlogPost 
    v-for="post in posts" 
    :key="post.id"
    :title="post.title"
    @enlarge-text="postFontSize += 0.1"
/>
```
 - Listening Events (back up to the parent)

```html
<!-- BlogPost.vue, omitting <script> -->
<template>
    <div class="blog-post">
        <h4> {{ title }}</h4>
        <button @click="$emit('enlarge-text')">
            Enlarge text
        </button>
    </div>
</template>
```

- Content Distribution with Slots
```html
<Alert>
    Something bad happened
<Alert>
```

```html
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

- Dynamic Components
```html
<!-- Component changes when currentTab changes -->
<component :is="currentTab"></component>
```
exemple 
```html
<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'

// Define async components (lazy-loaded only when needed)
const tabComponents = {
  Home: defineAsyncComponent(() => import('./Home.vue')),
  Posts: defineAsyncComponent(() => import('./Posts.vue')),
  Archive: defineAsyncComponent(() => import('./Archive.vue')),
}

const tabs = Object.keys(tabComponents)
const currentTab = ref('Home')

// Dynamically resolve the component
const currentTabComponent = computed(() => tabComponents[currentTab.value])

</script>

<template>
  <div class="demo">
    <button
       v-for="tab in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab"
     >
      {{ tab }}
    </button>
    <component :is="currentTabComponent" class="tab" />
  </div>
</template>

<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
```

- Case Insensitivity

```js
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```
```html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```
- Self Closing Tags

```html
<MyComponent />

<my-component></my-component>
```

```html
<my-component /> <!-- we intend to close the tag here... -->
<span>hello</span>
```

```html
<!-- will be parsed as: -->
<my-component>
  <span>hello</span>
</my-component> <!-- but the browser will close it here. -->
```
## ✅ Single-File Components
```html
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```
## ✅ Ansyc Components
- Basic Usage (defineAsyncComponent)
```js
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...load component from server
    resolve(/* loaded component */)
  })
})
```
```js
// ES module dynamic import
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => import('./components/MyComponent.vue'))

```

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

```js
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

- Loading and Error States

```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```

- Lazy Hydration <br/>

`Hydrate on Idle` <br/>
```js
import { defineAsyncComponent, hydrateOnIdle } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* optionally pass a max timeout */)
})
```

`Hydrate on Visible` <br/>
```js
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnVisible()
})
```

`Hydrate on Media Query` <br/>
  ```js
import { defineAsyncComponent, hydrateOnMediaQuery } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnMediaQuery('(max-width:500px)')
})
 ```

`Hydrate on Interaction` <br/>
  ```js
import { defineAsyncComponent, hydrateOnInteraction } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnInteraction('click')
  //hydrate: hydrateOnInteraction(['wheel', 'mouseover'])
})
 ```

 `Custom Strategy` <br/>
 ```js
 import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement is a helper to iterate through all the root elements
  // in the component's non-hydrated DOM, since the root can be a fragment
  // instead of a single element
  forEachElement(el => {
    // ...
  })
  // call `hydrate` when ready
  hydrate()
  return () => {
    // return a teardown function if needed
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
 ```
- Using with Suspense 
```html
<Suspense>
  <!-- component with nested async dependencies -->
  <Dashboard />

  <!-- loading state via #fallback slot -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```
 
## ✅ v-model

- Basic usage
```html
<!-- v-model -->
<input type="text" v-model="searchText" />
<!-- Under the hood -->
<input :value="searchText" @input="searchText = $event.target.value"/>
```
- With component
```html
<!-- Usage -->
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```
```html
<!-- CustomInput.vue -->
<script>
    export default{
        props: ['modelValue'],
        emits: ['update:modelValue']
    }
</script>
<template>
    <input 
    :value="modelValue" 
    @update="$emit('update:modelValue', $event.target.value)" 
    />
</template>
```

```html
<!--work perfectly -->
<script>
import CustomInput from './CustomInput.vue'

export default {
  components: { CustomInput },
  data() {
    return {
      message: 'hello'
    }
  }
}
</script>

<template>
  <CustomInput v-model="message" /> {{ message }}
</template>
```

- `v-model` Arguments

```html
<!-- declaration -->
<MyComponent v-model:title="bookTitle" />
```
```html
<!-- MyComponent -->
<script>
    export default{
        props: ['title'],
        emits: ['update:title']
    }
</script>
<template>
    <input 
     type="text"
     :value="title"
     @update:title="$emit('update:title', $event.target.value)"
    />
</template>
```

- Multiple v-model Bindings
```html
<!-- declaration -->
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```html
<!-- usage -->
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```
- Handling v-model Modifiers
```html
<MyComponent v-model.capitalize="myText" />
```

```html
<!-- Under the hood -->
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

- Multiple v-model with Arguments
```html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
``` 
```html
<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    firstNameModifiers: {
      default: () => ({})
    },
    lastNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:firstName', 'update:lastName'],
  created() {
    console.log(this.firstNameModifiers) // { capitalize: true }
    console.log(this.lastNameModifiers) // { uppercase: true }
  }
}
</script>
```