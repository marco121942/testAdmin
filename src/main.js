import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./style/tailwind.css";
import VueCookies from 'vue3-cookies'
const app = createApp(App);
app.use(VueCookies)
app.use(store).use(router).mount('#app')