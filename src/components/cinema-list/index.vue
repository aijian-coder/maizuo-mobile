<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCityStore } from "@/stores/city";
import { getCinemaInfo, getCinemaList } from "@/api/cinema";
import CinemaItem from "@/components/cinema-item/index.vue";
import { useCinemaStore } from "@/stores/cinema";
import { onUpdated } from "vue";

const cinemaStore = useCinemaStore();

const cityStore = useCityStore();
//创建路由器
const router = useRouter();
const props = defineProps<{
  type: 1 | 2;
  searchList?: API.Cinema[];
  isSearch?: boolean;
}>();

/**
 * 请求接口的参数
cityId: 440300
ticketFlag: 1 | 2 app订票，前台兑换
 */
// 请求接口的参数
const params = reactive({
  cityId: cityStore.curCityId!,
  type: props.type,
});

//设置一个state 用来整理页面需要的数据,使用reactive 搞一个响应式数据
const state = reactive({
  //列表数据
  list: [] as API.Cinema[],
  // 当前是否正在请求中
  loading: false,
  // 是否已加载完成，加载完成后不再触发 load 事件
  finished: false,
  // 当前请求是否出错了
  error: false,
});
// const searchList = [] as API.Cinema[];

//列表滚动条的加载事件
function onLoad() {
  // console.log("滚动");
}
//点击事件处理函数
const handelclick = async (cinema: API.Cinema) => {
  // TODO  路由跳转
  const params = { cinemaId: "" + cinema.cinemaId, filmId: "", showdate: "" };

  // console.log("点击跳转影院详情", cinema);
  await getCinemaInfo(params).then((res) => {
    // console.log(res.cinema);
    const cinemaIfo = res.cinema;
    cinemaStore.setCurCinema(cinemaIfo);
  });
  router.push({ name: "cinema-info", params });
};
onUpdated(() => {
  // state.list = cinemaStore.searchCinemaList!;
  // console.log("搜索");
  if ((cinemaStore.searchCinemaList?.length as number) == 0) {
    state.finished = true;
  }
});

onMounted(() => {
  getCinemaList(params)
    .then((res) => {
      // console.log(res);

      cinemaStore.cinemas = res.cinemas;
      state.list = res.cinemas;
    })
    .catch(() => {
      state.error = true;
    })
    .finally(() => {
      /**
       List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
       */
      // 不管接口成功还是失败，
      //    1. 将 state.loading 设置为 false
      state.loading = false;
      //    2. 计算 state.finished 是否为 true
      //    当获取到的数据的条数等于toal时，就停止
      // state.finished = true;
      if (!props.isSearch) {
        state.finished = true;
      }
    });
});
</script>
<template>
  <div class="cinema-list">
    <van-list
      v-model:loading="state.loading"
      v-model:error="state.error"
      :finished="state.finished"
      :disabled="props.isSearch"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      :offset="10"
      @load="onLoad"
    >
      <template
        v-for="item in props.isSearch ? props.searchList : state.list"
        :key="item.cinemaId"
      >
        <CinemaItem :cinema="item" @myclick="handelclick(item)" />
      </template>
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
.cinema-list {
  flex: 1;
  // padding: 0 10px;
  overflow-y: hidden;
}
</style>
