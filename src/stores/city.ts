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
  const cityGroup = computed(() => {
    const result: { groupName: string; groupList: API.ICity[] }[] = [];
    cities.value.forEach((city) => {
      // 取得首字母
      const groupName = city.pinyin.charAt(0).toUpperCase();
      // 获取这个拼音首字母的下标
      const index = result.findIndex((item) => item.groupName === groupName);
      //做判断
      if (index > -1) {
        //找到了，那就追加这一个city
        result[index].groupList.push(city);
      } else {
        //一般来说，第一次找字母，都应该找不到，那么就直接创建 初始result数组
        // result数组
        result.push({
          groupName,
          groupList: [city],
        });
      }
    });
    return result.sort((a, b) => (a.groupName > b.groupName ? 1 : -1));
  });
  const indexList = computed(() =>
    cityGroup.value.map((item) => item.groupName)
  );

  // 定义 action 数据，通过 普通函数 即可
  async function getLIst() {
    const res = await getCityList();
    const list = res.cities;
    cities.value = list;
  }

  return {
    getLIst,
    hotCity,
    curCity,
    cities,
    cityGroup,
    indexList
  };
});
