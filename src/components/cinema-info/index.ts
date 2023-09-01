export const modules = import.meta.glob("./*.vue");

function toCam(str: any) {
  // 1. 根据 - 分割
  const arr = str.split("/");
  // 2. 对 arr 中带vue后缀的做首字母大写
  return (
    arr[1].split(".")[0].charAt(0).toUpperCase() + arr[1].split(".")[0].slice(1)
  );
}
let com: any = {};
for (let key in modules) {
  let name = toCam(key);
  com[name] = modules[key];
}

import Carousel from "./carousel.vue";
import Info from "./info.vue";
import Schedule from "./schedule.vue";

export { Carousel, Info, Schedule };
