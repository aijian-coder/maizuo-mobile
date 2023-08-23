import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "@/router/index";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
//pinia的持久化插件实际上就是包装好了一个函数，里面的js原理是localStorage的set和解析
pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(router);
app.mount("#app");
