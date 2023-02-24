import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.css'
const app = createApp(App);
const vuetify = createVuetify()
app.use(router); //use router
// app.use(iView);
app.use(vuetify)
app.mount("#app");
