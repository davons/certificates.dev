# 📚  Custom Directives

Code reuse in vue: `components` and `composable`
## ✅ Introduction
```html
<p v-highlight>This sentence is important!</p>
```

```js
const highlight = {
  mounted: (el) => el.classList.add('is-highlight')
}

export default {
  directives: {
    // enables v-highlight in template
    highlight
  }
}
```

```js
// global registered
const app = createApp({})

// make v-highlight usable in all components
app.directive('highlight', {
  /* ... */
})
```

## ✅ When to use custom directives
- direct DOM manipulation

```js
const focus = {
    mounted: (el) => el.focus()
}
export default {
    directives: {
        //enable v-focus in template
        focus
    }
}
```
```html
<input v-focus />
```

- Directive Hooks

```js
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode) {}
}
```
- Hook Arguments
   - `el`
   - `binding`
   ```html
   <div v-example:foo.bar="baz">

   <div v-example:[arg]="value"></div>
   ```
   ```json
   {
        arg: 'foo',
        modifiers: { bar: true },
        value: /* value of `baz` */,
        oldValue: /* value of `baz` from previous update */
    }
   ```