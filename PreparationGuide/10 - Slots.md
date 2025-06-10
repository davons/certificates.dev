# 📚  Slots

## ✅ Slot Content and Outlet
```html
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```
```html
<button class="fancy-btn">
  <slot></slot> <!-- slot outlet -->
</button>
```
```html
<!--And the final rendered DOM:-->
<button class="fancy-btn">Click me!</button>
```
```html
<script>
import FancyButton from './FancyButton.vue'
import AwesomeIcon from './AwesomeIcon.vue'
  
export default {
  components: { FancyButton, AwesomeIcon }
}
</script>

<template>
  <FancyButton>
    Click me
  </FancyButton>

  <FancyButton>
    <span style="color:cyan">Click me! </span>
    <AwesomeIcon />
  </FancyButton>
</template>
```

```html
<!-- FancyButton.vue -->
<template>
  <button class="fancy-btn">
  	<slot/>
  </button>
</template>

<style>
.fancy-btn {
  color: #fff;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
```

```html
<!-- AwesomeIcon.vue -->
<template>❤️</template>
```
## ✅ Render Scope
```html
<!-- Slot content has access to the data scope of the parent  -->
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```
## ✅ Fallback Content
```html
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```
```html
<!-- Using 1 -->
<SubmitButton />

<!-- Rendering -->
<button type="submit">Submit</button>

<!-- Using 2 -->
<SubmitButton>Save</SubmitButton>

<!-- Rendering -->
<button type="submit">Save</button>
```
## ✅ Named Slots
```html
<!--BaseLayout.vue-->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
```html
<!--Usage-->
<BaseLayout>
  <template v-slot:header>
    <!-- content for the header slot -->
  </template>
</BaseLayout>
```
- Using shorthand

```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>

<!-- Or like this -->
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- implicit default slot -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

## ✅ Conditional Slots
- Card component
```html
<script setup>
import Card from './Card.vue'
</script>

<template>
  <Card>
    <template #header>
      <h1>This is the header</h1>
    </template>

    <template #default>
      <p>This is the content</p>
    </template>

    <template #footer>
      <em>This is the footer</em>
    </template>
  </Card>
</template>
```

```html
<!--Card.vue-->
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```
## ✅ Dynamic Slot Names
```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```
## ✅ Scoped Slots
- both the parent scope and the child scope
```html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

<!-- Using -->
 <MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```
- example
```html
<!--App.vue-->
<script>
import MyComponent from './MyComponent.vue'
  
export default {
  components: {
    MyComponent
  }
}
</script>

<template>
	<MyComponent v-slot="slotProps">
  	    {{ slotProps.text }} {{ slotProps.count }}
   </MyComponent>
</template>

```
```html
<!--MyComponent.vue-->
<script>
export default {
  data() {
    return {
      greetingMessage: 'hello'
    }
  }
}
</script>

<template>
  <div>
  	<slot :text="greetingMessage" :count="1"></slot>
  </div>
</template>
```
## ✅ Named Scoped Slots

- Passing props to a named slot
```html
<slot name="header" message="hello"></slot>
```

```html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
    <!--  headerProps  -> { message: 'hello' }-->
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

```html
<!-- <MyComponent> template -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" />
</div>
```
```html
<MyComponent>
  <!-- Use explicit default slot -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</MyComponent>
```

```html
<!-- This template won't compile -->
<MyComponent v-slot="{ message }">
  <p>{{ message }}</p>
  <template #footer>
    <!-- message belongs to the default slot, and is not available here -->
    <p>{{ message }}</p>
  </template>
</MyComponent>
```
- Fancy List Example

```html
<!--App.vue-->
<script>
import FancyList from './FancyList.vue'
  
export default {
  components: {
    FancyList
  }
}
</script>

<template>
  <FancyList api-url="url" :per-page="10">
    <template #item="{ body, username, likes }">
      <div class="item">
        <p>{{ body }}</p>
        <p class="meta">by {{ username }} | {{ likes }} likes</p>
      </div>
    </template>
  </FancyList>
</template>

<style scoped>
.meta {
  font-size: 0.8em;
  color: #42b883;
}
</style>
```

```html
<!--FancyList.vue-->
<script>
export default {
  props: ['api-url', 'per-page'],
  data() {
    return {
      items: []
    }
  },
  mounted() {
    // mock remote data fetching
    setTimeout(() => {
      this.items = [
        { body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
        { body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 }
      ]
    }, 1000)
  }
}
</script>

<template>
  <ul>
    <li v-if="!items.length">
      Loading...
    </li>
    <li v-for="item in items">
      <slot name="item" v-bind="item"/>
    </li>
  </ul>
</template>

<style scoped>
  ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }
  li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
  }
</style>
```` 

- More example
```html
<!--App.vue-->
<script>
import MouseTracker from './MouseTracker.vue'
  
export default {
  components: {
    MouseTracker
  }
}
</script>

<template>
	<MouseTracker v-slot="{ x, y }">
  	    Mouse is at: {{ x }}, {{ y }}
	</MouseTracker>
</template>
````

```html
<!--MouseTracker.vue-->
<script>
    export default {
        data(){
            return {
                x:0,
                y:0
            }
        },
        methods: {
            update(e)(){
                this.x = x.pageX
                this.y = x.pageY
            }
        },
        mounted(){
            window.addEventListner('mousemove', this.update)
        },
        unmounted(){
            window.removeEventListener('mousemove', this.update)
        }
    }
</script>
<template>
    <slot :x="x" :y="y" />
</template>
```