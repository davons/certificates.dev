# 📚  Reactivity Fundamentals

## ✅ Declaring Reactive State
 - ref()

 ```js
 //recommended
 import { ref } from 'vue'
 const count = ref(0)

 console.log(count) // { value: 0}
 console.log(count.value) //0
 count++;
 console.log(count.value) //1
 ```
example with setup()

```js
import { ref }  from 'vue'

export default {
    setup(){
        const count = ref(0)

        const increment = () => {
            count ++
        }
        const decrement = () => {
            count --
        }
        //expose the ref to the template
        return {
            count,
            increment,
            decrement
        }
    }
}
```
```html
<span>{{ count }} </span>
<button @click="increment">+</button>
<button @click="decrement">-</button>
```

Using <script setup></script>

```html
<script setup>
import {ref} from 'vue'

const count = ref(0)
const increment = () => {
    count ++
}
const decrement = () => {
    count --
}
<script>

<template>
    <span>{{ count }} </span>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
<template>

<style>
</style>
```
No deep: shallowRef()

## ✅ Reactive Function
 - reactive()
```js
import { reactive } from 'vue'
const state = reactive({count : 0 })
```
```html
<button @click="state.count++">
    {{ state.count}}
<button>
```
```js
const raw = {}
const proxy = reactive(raw)
console.log(proxy === raw) //false
```
No deep: <b>shallowReactive</b> <br/>

Limitation:<br/>
    - Limited value types: objects, arrays, Map and Set <br/>
    - Cannot replace entire object<br/>
    - Not destructure-friendly<br/>

## ✅ Composition API FAQ

- Reactivity API
- Lifecycle Hooks
- Dependency Injection

```js
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```
## ✅ Computed Props

```js
<script setup>
import { reactive, computed } from 'vue'
const author = reactive({
    name: 'davon',
    books: [
        'Vue 2 - Advance Guide ',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
})

const publishedBook = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
    <p>Has published books:</p>
    <span>{{ publishedBook }}</span>
<template>
```

```js
<script setup>
import { ref, computed } from 'vue'

const price = ref(20)
const quantity = ref(2)
const total = computed(() => price.value * quantity.value)
console.log(total) //40
</script>
```