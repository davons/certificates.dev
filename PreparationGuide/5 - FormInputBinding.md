# 📚  Form Input Binding

```html
<input :value="text" @input="event" => text = event.target.value />
<!-- or this -->
 <input v-model="text" />
```

## ✅ Basic Usage

```html
<p>Message is: {{ message }} </p>
<input type="text" v-model="message" placeholder="Editer me" />
```
- Textarea (mutliline text)

```html
<span>Multiline message is: </span>
<p style="white-space: pre-line;">{{ message }} </p>
<textarea v-model="message" placeholder="Add multiple lines">
</textarea>

<!-- bad -->
<textarea>{{ text }}</textarea>

<!-- good -->
<textarea v-model="text"></textarea>
```

- Checkbox
```html
<input type="checkbox" v-model="checked" id="checkbox"/>
<label for="checkbox">{{ checkbox }}</label>

<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>

```

- radio
```html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

- select / multiple select
```html
<!-- select -->
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<!-- Multiple select -->
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

- select with for
```js
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```
```html
<select v-model="selected">
    <option v-for="option in options" :value="option.value">
        {{ option.text }}
    </option>
</select>
<div>Selected: {{ selected }}</div>
```
- Value Bindings
```html
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

<!-- checkbox -->
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />

<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />

<!-- Radio -->
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />

<!-- Select Options -->
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```

- Modifiers
 `.lazy`, `number`, `trim`
 ```html
 <!-- synced after "change" instead of "input" -->
 <input v-model.lazy="msg"/> 
 <input v-model.number="age" />
 <input v-model.trim="msg" />
 ```