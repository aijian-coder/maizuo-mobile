import 'vant/es/dialog/style';

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router/index"
import App from "./App.vue";


const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);
app.mount("#app");
