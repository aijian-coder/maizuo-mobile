// type App 是 createApp() 返回值类型
import { type App } from "vue";
import visible from "./modules/visible";

export default {
  //导出一个对象，对象有一个函数install
  install(app: App) {
    //全局注册指令
    app.directive("visible", visible);
  },
};
