# 📚  Template Syntax

## ✅ Template Syntax
- Text Interpolation 
```html
<span>{{ message }}</span>
```
- Row HTML
```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
- Attribute Bindings
```html
<div v-bind:id="dynamicId"></div>

<!-- shorthand -->
<div :id="dynamicId"></div>
```
- Same-name Shorthand
```html
<!-- same as :id="id" -->
<div :id></div>
<!-- This also works -->
<div v-bind:id></div>
```
- Boolean Attributes (true / false)
```html
<button :disabled="isButtonDisabled">Button</button>
```
- Dynamically Binding Mutliple Attributes
```js
//js
const objectOfAttrs = {
    id: 'container',
    class: 'wrapper',
    style: 'backgroud-color:green'
}
```
```html
<!-- using -->
<div v-bind="objectOfAttrs"></div>
```
- Using javascript Expressions
```html
{{ count + 1 }}
{{ ok ? 'YES' : 'NO'}}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
```
- Not work
```html
{{ var a = 1 }}
{{ if (ok) { return message } }}
```
- Calling Functions
```html
<time :title="toTitleDate(date)" :datetime="date">
    {{ formatDate(date) }}
</time>
```
- Restricted Globals Access

Exposed: <b>`Math`</b> and <b>`Date`</b> <br>
user-attached properties on window ( <b>`app.config.globalProperties`</b> )

- Directives (`v-`) <br/>
Example: `v-html`, `v-bind`, `v-for`, `v-on`, `v-slot`, `v-if`, `v-show` 

```html
<p v-if="see">Now you see me</p>
<a :href="url">lien</a> <!-- argument url -->
<a @click="doSomething">...</a>
<a :[attributeName]="url">...</a> <!-- Dynamic argument -->
<a @[eventName]="doSomething">...</a> <!-- Dynamic argument -->
<a :['foo' + bar] = "value">...</a> <!-- Dynamic Argument Syntax Constraints -->
```
- Modifiers
```html
<form @submit.prevent="onSubmit">...</form>
```
`v-on`:`submit`.`prevent` = "`onSubmit`" <br>
v-on: <strong>`Name`</strong> <br>
submit: <strong>`Argument`</strong><br>
prevent: <strong>`modifiers`</strong><br>
onSubmit: <strong>`Value`</strong><br>
## ✅ Class and Style Bindings
- class
- style <br/>
we can use v-bind 

- Binding HTML Classes
```html
<div :class={active: isActive }></div>
```
```js
const isActive = ref(false)
const hasError = ref(true)
```
```html
<div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
></div>
```
- class with Computed property

```js
const isActive = ref(false)
const error = ref(null)
const classObject = computed(() => {
    active: isActive.value && !error.value,
    'text-danger': error.value && error.value.type === 'fatal'
})
```
```html
<div class="static":class="classObject"></div>
```
- Binding to Arrays
```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```
```html
<div class="static" :class="[activeClass, errorClass]"></div>
<!-- or -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```
 - With components
 ```html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

 ```html
<!-- child component template -->
<MyComponent class="baz boo" />
<MyComponent :class="{ active: isActive }" />
```

 ```html
<!-- The rendered HTML will be: -->
<p class="foo bar baz boo">Hi!</p>
<p class="foo bar active">Hi!</p>
```
- $attr
 ```html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<!-- using component -->
<MyComponent class="baz" />

<!-- Rendering -->
<p class="baz">Hi!</p>
<span>This is a child component</span>
````
- Binding Inline Style
```js
const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})

```
```html
<div :style="{ color: activeColor, fontSize: fontSize +'px'}"></div>
<div :style="styleObject"></div>
<div :style="[baseStyles, overridingStyles]"></div>
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
<!-- display: flex browzer that support -->
```
## ✅ List Rendering
- v-for
```js
const items = ref([
    {message: 'Foo'},
    {message: 'Bar'}
])
const parentMessage = ref('Parent')
```
```html
<li v-for="item in items">
    {{ item.message }}
</li>
<!-- with index alias -->
<li v-for="(item, index) in items">
   {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>

<!-- destructuring, with index alias  -->
<li v-for="({ message }, index) in items">
    {{ message }} - {{ index }}
<li>

<!-- double for -->
 <li v-for="item in items">
    <span v-for="childItem in item.children"> 
        {{ item.message }} - {{ childItem }}
    </span>
</li>
<!-- We can use also of -->
 <div v-for="item of items"> ... </div>
```
- v-for with an Object
```js
const myObject = reactive({
    title: "How to do list in Vue",
    author: 'Dave Joe',
    publishedAt : '2017-04-10'
})
```
```html
<ul>
    <li v-for="(value, key, index ) in myObject">
        {{ index }}- {{ key }} - {{ value }}
    </li>
</ul>
```
- v-for with a Range
```html
<span v-for="n in 10 "> {{ n }} </span> <!-- Initial value 1 -->
```
- v-for on template

```html
<ul>
    <template v-for="item in items">
        <li> {{ item.message }} </li>
        <li class="divider" role="presentation"></li>
    </template>
</ul>
```
- v-for with v-if
```html
<template v-for="todo in todos">
    <li v-if="!todo.isComplete"> {{ todo.name }} </li>
</template>
```
- Maintaining State with key (`recommanded`)
```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
  <!-- using template -->
<template v-for="todo in todos" :key="todo.id">
    <li v-if="!todo.isComplete"> {{ todo.name }} </li>
</template>
```
- v-for with a Component
```html
<MyComponent v-for="item in items" :key="item.id" />

<!-- Using props -->
 <MyComponent 
    v-for="(todo, index) in todos" 
    :index="index"
    :todo="todo"
    :key="key.todo"
 />
```
- Array Change Detection

`Mutation Methods`
- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()` 

`Replacing an Array` (return new array)
 - `filter()`
 - `concat()`
 - `slice()`
```js
items.value = items.value.filter((item) => !item.completed)
```
- Displaying Filtered/Sorted Results (computed)

```js
const numbers = ref([1, 2, 3, 4, 5])
const evenNumbers = computed(() => {
    return numbers.value.filter((n) => n % 2 === 0)
})
```
```html
<li v-for="number in evenNumbers"> {{ number }}</li>
```
- Double v-for (recommended using function)
```js
const sets = ref([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
])
const event = (numbers) => {
    return numbers.value.filter((n) => n%2 === 0)
}
```
```html
<ul v-for="numbers in sets">
    <li v-for="n in event(numbers)">
        {{ n }}
    </li>
</ul>
```
- NB using reverse and sort (`recommanded`)
```js
return [...numbers].reverse();
```

## ✅ Condition Rendering

- v-if
```html
<h1 v-if="awesome">Vue is awesome</h1>
```
- v-else
```html
<button @click="awesome != awesome">Toggle</button>
<h1 v-if="awesome">Vue is awesome</h1>
<h1 v-else>Oh no :(</h1>
```
- v-else-if
```html
<div v-if="type=='bmw'">BMW X5</div>
<div v-else-if="type=='mercedes'"> Mercedes Q</div>
<div v-else-if="type=='audi'"> AUDI 8</div>
<div v-else>others</div>
```
- v-if in template
```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
- v-show
```html
<h1 v-show="ok">Hello!</h1>
```
- v-if vs v-show <br/>

v-if : `remove/add DOM ` <br/>
v-show : `Hide the elements` <br/>