# 📚  Plugins

## ✅ Install Plugin
```js
import { createApp } from 'vue'
const app = createApp({})
app.use(myPlugin, {
    /* optional options */
})
```
## ✅ Writing a Plugin

```html
<h1>{{ $translate('greetings.hello') }}</h1>
```

```js

//example
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}

// plugins/i18n.js
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}

//using
import i18nPlugin from './plugins/i18n'
app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

## ✅ Provide / Inject with Plugins

```js
//plugins/i18n.js
export default {
    install: (app, options) => {
        app.provide('i18n', options)
    }
}

//using
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

## ✅ Awesome Vue
https://github.com/vuejs/awesome-vue