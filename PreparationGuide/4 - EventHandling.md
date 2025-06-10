# 📚  Event Handling

## ✅ Listening to Event
```html
<button v-on:click="handler">Click me</button>
<!-- or shorthand-->
<button @click="handler">Click me</button>
```
## ✅ Inline Handlers
```js
const count = ref(0)
```
```html
<button @clik="count++">Add 1</button>
<p>Count is {{ count }} </button>
```
## ✅ Method Handlers
```js
const name = ref('Vue.js')
const greet = (event) => {
    console.log(`Hello ${name.value}!`)
    if (event) {
        console.log(event.target.tagName)
    }
}
```
```html
<button @clik="greet">Greet</button>
```
## ✅ Calling Methods in Inline Handlers
```js
function say(message) {
  console.log(message)
}
```
```html
<button @clik="say('hello')">Hello</button>
<button @clik="say('Bonjour')">Bonjour</button>
```
## ✅ Accessing Event Argument in Inline Handlers
```html
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```
```js
function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

## ✅ Event modifiers
- stop
- prevent
- self
- capture
- once
- passive
```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>

<!-- use capture mode when adding the event listener     -->
<!-- i.e. an event targeting an inner element is handled -->
<!-- here before being handled by that element           -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```
## ✅ Key modifiers

```html
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />

<!-- in general KeyboardEvent.key -->
<input @keyup.page-down="onPageDown" />

 <!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
- enter
- tab
- delete (captures both "Delete" and "Backspace" keys)
- esc
- space
- up
- down
- left
- right

## ✅  .exact Modifier

```html
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```

## ✅ Mouse Button Modifiers
- .left
- .right
- .middle

```html
<button @click.left="handleLeftClick">Left Click</button>
<button @click.right="handleRightClick">Right Click</button>
<button @click.middle="handleMiddleClick">Middle Click</button>
```