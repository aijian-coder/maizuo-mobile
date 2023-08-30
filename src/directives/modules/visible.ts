/**
 * 一个自定义插件
 * v-visible
 */

import { type Directive } from "vue";
/**
 *
 * @param el 使用指令的元素
 * @param binding 指令绑定的值
 */
const visible: Directive = (el, binding) => {
  // 如果 binding.value 是 false, 则对当前元素设置 style 让其 visibl: hidden
  if (!binding.value) {
    //传递的值是false，就给他的visibility添加一个hidden
    el.style.visibility = "hidden";
  }
};

export default visible;
