//设置pinia的仓库有两种方式，选项式和组合式，都能用，一般不强制推荐使用哪一种方式
// 此处使用组合式

/**
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCount= defineStore(
  "counter",
  // 函数方式，composition api 方式
  () => {
    // 定义 state 数据，通过 ref 方法
    const count = ref(1);
    //定义一个计算属性，根据ref数据返回一个计算好的
    const countPlus = computed(() => {
      return count.value + 1;
    });
    //定义一个action动作函数
    function increment() {
      count.value++;
    }
    function decrement() {
      count.value--;
    }

    //组合函数式创建的仓库，需要把数据return出来
    return {
      count,
      countPlus,
      increment,
      decrement,
    };
  }
  ,{
    persist:true
});
