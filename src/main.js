// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';

import  "./././../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
const app = createApp(App);
app.use(router);
app.use(store)
app.mount('#app');
