import 'vant/es/dialog/style';
import '@vant/touch-emulator';


import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import router from "@/router/index"
import App from "./App.vue";


const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(router);
app.mount("#app");
