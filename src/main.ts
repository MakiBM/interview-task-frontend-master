import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// This is throwing an error: "The target environment doesn't support dynamic import()"
// import 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(store).use(router).mount('#app')
