import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCityList } from "@/api/city";

/**
 * 城市列表仓库
 */

export const useCityStore = defineStore("city", () => {
  /**
   * ref() 就是 state 属性
   * computed() 就是 getters
   * function() 就是 actions
   */
  // 定义 state 数据，通过 ref 方法
  const cities = ref([] as API.ICity[]);
  // 当前选择的城市对象
  const curCity = ref(null as API.ICity | null);
  //热门城市
  const hotCity = ref([] as API.ICity[]);

  // 定义 getter 数据，通过 computed 方法

  // 定义 action 数据，通过 普通函数 即可
  async function getLIst() {
    const res = await getCityList();
      const list = res.cities;
      console.log(list);
      cities.value=list
  }

  return {
    getLIst,
    hotCity,
    curCity,
    cities,
  };
});
