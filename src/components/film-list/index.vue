<!-- 
  当前组件，需要控制 showHeader 的值，要根据滚动条来控制，
  但是滚动条不是全局滚动条，而是局部元素的滚动
  问题：如果监控到局部元素的滚动
    1. document.getElelement('局部元素').addEventListener('scroll')

    2. FilmList 组件内 emit 出 scroll 事件出来
 -->

<script lang="ts" setup>
import { getFilmList } from "@/api/film";
import { useCityStore } from "@/stores/city";
import { useFilmStore } from "@/stores/film";
import { reactive } from "vue";
import FilmItem from "@/components/film-item/index.vue";
import { useRouter } from "vue-router";

const cityStore = useCityStore();
const filmStore = useFilmStore();

//定义一个调接口要用的prop
const props = defineProps<{
  type: 1 | 2;
}>();

//定义一个自定义事件 触发给父级
const emits = defineEmits(["myscroll"]);

//创建路由器
const router = useRouter();

/**
 * 请求接口的参数
cityId: 440300
pageNum: 1
pageSize: 10
type: 1
 */
// 请求接口的参数
const params = reactive({
  cityId: cityStore.curCityId,
  pageNum: 1,
  pageSize: 10,
  type: props.type,
});

//设置一个state 用来整理也米娜需要的数据,使用reactive 搞一个响应式数据
const state = reactive({
  //列表数据
  list: [] as API.IFilm[],
  //总条数
  total: 1,
  // 当前是否正在请求中
  loading: false,
  // 是否已加载完成，加载完成后不再触发 load 事件
  finished: false,
  // 当前请求是否出错了
  error: false,
});

// 滚动事件处理
const handleScroll = (event: Event) => {
  // 触发一个 scroll 的自定义事件，通知父组件
  // console.log(event);
  emits("myscroll", event);
};
//列表滚动条的加载事件
function onLoad() {
  getFilmList(params)
    .then((res) => {
      // state.list = resp.films;// 追加 resp.films 到 当前 state.list 的后面
      state.list = [...state.list, ...res.films];
      state.total = res.total;
      //修改页码
      params.pageNum++;
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
      state.finished = state.list.length >= state.total;
    });
}
//点击事件处理函数
const handelclick = (film: API.IFilm) => {
  // console.log("点击电影，准备购票", film);
  //TODO  路由跳转
  const params = { filmId: film.filmId };
  // filmStore.getFilm()
  filmStore.getFilm({ filmId: film.filmId });

  router.push({ name: "films-detail", params });
};
</script>
<template>
  <div class="film-list" @scroll.passive="handleScroll">
    <van-list
      v-model:loading="state.loading"
      v-model:error="state.error"
      :finished="state.finished"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      :offset="10"
      @load="onLoad"
    >
      <template v-for="item in state.list" :key="item.filmId">
        <FilmItem :film="item" @myclick="handelclick(item)" />
      </template>
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
.film-list {
  flex: 1;
  padding: 0 10px;
  overflow-y: auto;
}
</style>
