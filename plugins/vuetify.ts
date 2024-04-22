// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    blueprint: md2,
    theme:{
        defaultTheme: 'dark',
    }
  })
  app.vueApp.use(vuetify)
})
