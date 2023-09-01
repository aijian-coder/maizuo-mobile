import store2 from "store2";
import { defineStore } from "pinia";

import { ref, computed } from "vue";
import { getCityList } from "@/api/city";
import { SetCityGroup } from "@/utils/index";

/**
 * 城市列表仓库
 */

export const useCityStore = defineStore(
  "city",
  () => {
    /**
     * ref() 就是 state 属性
     * computed() 就是 getters
     * function() 就是 actions
     */
    // 定义 state 数据，通过 ref 方法
    const cities = ref([] as API.ICity[]);
    // 当前选择的城市对象
    const curCity = ref(null as API.ICity | null);
    //定义搜索框按下的数据
    const keyword = ref("");

    // 定义 getter 数据，通过 computed 方法
    // 计算出城市分组，按拼音首字母
    const cityGroup = computed(() => {
      // const result: { groupName: string; groupList: API.ICity[] }[] = [];
      // cities.value.forEach((city) => {
      //   // 取得首字母
      //   const groupName = city.pinyin.charAt(0).toUpperCase();
      //   // 获取这个拼音首字母的下标
      //   const index = result.findIndex((item) => item.groupName === groupName);
      //   //做判断
      //   if (index > -1) {
      //     //找到了，那就追加这一个city
      //     result[index].groupList.push(city);
      //   } else {
      //     //一般来说，第一次找字母，都应该找不到，那么就直接创建 初始result数组
      //     // result数组
      //     result.push({
      //       groupName,
      //       groupList: [city],
      //     });
      //   }
      // });
      // return result.sort((a, b) => (a.groupName > b.groupName ? 1 : -1));
      //此处把扁平数据变树形数据方法抽出
      return SetCityGroup(cities.value);
    });
    //计算出热门城市
    const hotCity = computed(() => {
      let result: API.ICity[] = [];
      result = cities.value.filter((item) => item.isHot === 1);
      return result;
    });
    //计算出表头
    const indexList = computed(() =>
      cityGroup.value.map((item) => item.groupName)
    );

    //计算当前城市id
    const curCityId = computed(() => {
      return curCity.value?.cityId;
    });

    // 定义 action 数据，通过 普通函数 即可
    async function getLIst() {
      const city: API.ICity[] | null = store2.get("city")?.cities;
      if (city) {
        //本地有值，直接拿
        cities.value = city;
        return;
      }
      //不存在，就去调接口
      const res = await getCityList();
      const list = res.cities;
      cities.value = list;
      // 将 resp.cities 做一个本地存储
      // store2.set("cities", list);
    }

    //设置搜索的值
    function setkeyword(val: string) {
      keyword.value = val;
    }

    //设置选中的城市
    function setCurrentcity(city: API.ICity) {
      curCity.value = city;
    }

    return {
      getLIst,
      setkeyword,
      setCurrentcity,
      hotCity,
      curCity,
      cities,
      cityGroup,
      indexList,
      keyword,
      curCityId,
    };
  },
  {
    persist: true,
  }
);
