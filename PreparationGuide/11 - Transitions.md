# 📚  Transitions

## ✅ Transition

- Conditional rendering via `v-if`
- Conditional display via `v-show`
- Dynamic components toggling via the `component` special element
- Changing the special `key` attribute

- Basic usage
```html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```
```css
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```
- CSS-Based Transitions <br/>
- 1- Enter<br/>
`v-enter-from`<br/>
`v-enter-active`<br/>
`v-enter-to`<br/>

- 2- leave <br/>
`v-leave-from`<br/>
`v-leave-active`<br/>
`v-leave-to`<br/>

- Named Transitions
```html
<Transition name="fade">
  ...
</Transition>
```
```css
/** using this css with fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```
- CSS Transitions
```html
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>
```
```css
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

- CSS Animations
```html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>
```
```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

- Custom Transition Classes

`<Transition>`
- 1 - `enter-from-class`
- 2 - `enter-active-class`
- 3 - `enter-to-class`
- 4 - `leave-from-class`
- 5 - `leave-active-class`
- 6 - `leave-to-class`

```html
<!-- assuming Animate.css is included on the page -->
<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<template>
	<button @click="show = !show">Toggle</button>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">hello</p>
  </Transition>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>
```

- JavaScript Hooks
```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```
```js
export default {
  // ...
  methods: {
    // called before the element is inserted into the DOM.
    // use this to set the "enter-from" state of the element
    onBeforeEnter(el) {},

    // called one frame after the element is inserted.
    // use this to start the animation.
    onEnter(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done()
    },

    // called when the enter transition has finished.
    onAfterEnter(el) {},

    // called when the enter transition is cancelled before completion.
    onEnterCancelled(el) {},

    // called before the leave hook.
    // Most of the time, you should just use the leave hook.
    onBeforeLeave(el) {},

    // called when the leave transition starts.
    // use this to start the leaving animation.
    onLeave(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done()
    },

    // called when the leave transition has finished and the
    // element has been removed from the DOM.
    onAfterLeave(el) {},

    // only available with v-show transitions
    onLeaveCancelled(el) {}
  }
}
```

- Reusable Transitions

```html
<!-- MyTransition.vue -->
<script>
// JavaScript hooks logic...
</script>

<template>
  <!-- wrap the built-in Transition component -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- pass down slot content -->
  </Transition>
</template>

<style>
/*
  Necessary CSS...
  Note: avoid using <style scoped> here since it
  does not apply to slot content.
*/
</style>
```

```html
<MyTransition>
  <div v-if="show">Hello</div>
</MyTransition>
```
- Transition on Appear
```html
<!-- Apply transition on the initial render -->
<Transition appear>
  ...
</Transition>
```

- Transition Modes
```html
<!-- Apply transition on the initial render -->
<Transition mode="out-in">
  ...
</Transition>

<!--Transition Between Components -->
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

- Dynamic Transitions
```html
<!-- Apply transition on the initial render -->
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

- Transitions with the Key Attribute
```html
<script>
export default {
  data() {
    return {
      count: 1,
      interval: null 
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.count++;
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<template>
  <div class="wrapper">
    <Transition>
      <span :key="count">{{ count }}</span>
    </Transition>
  </div>
</template>

<style scoped>
span{
  font-size: 4rem;
}
.wrapper{
  position:relative;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```
## ✅ Transition Group
- insertion
- removal
- order
- list

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```
```css
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```
 - Staggering List Transitions

 ```html
 <TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
 ```

 - example
 ```html
 <script>
import gsap from 'gsap'

const list = [
  { msg: 'Bruce Lee' },
  { msg: 'Jackie Chan' },
  { msg: 'Chuck Norris' },
  { msg: 'Jet Li' },
  { msg: 'Kung Fury' }
]

export default {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    computedList() {
      return list.filter((item) => item.msg.toLowerCase().includes(this.query))
    }
  },
  methods: {
    onBeforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    onEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }
  }
}
</script>

<template>
  <input v-model="query" />
  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </TransitionGroup>
</template>

 ```