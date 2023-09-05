<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUnmounted, ref } from "vue";
//使用响应式 调取接口
// import { getCinemaInfo, getCurCinemaFilmList } from "@/api/cinema";
import { toRefs } from "vue";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
const { cinemaId, filmId, showdate } = route.params;
const isShow = ref(false);
const params = { cinemaId: cinemaId + "", filmId: "6502", showdate: "asdas" };

// //设置响应式数据
// const cinemaInfo = ref<API.CinemaInfo | null>(null);
// const films = ref<API.IFilm[]>([]);
// const schedules = ref<API.ISchedule[]>([]);

//设置仓库数据
const { cinemaFilms: films, cinemaInfo } = toRefs(cinemaStore);

function onClickLeft() {
  router.back();
}

// let cinemaInfo = ref<API.CinemaInfo>();
/**
 * 初始化
 *  1. 获取影院详情
 *  2. 获取影院下电影列表
 *  PS: 考虑多个接口请求时，串行与并行的选择。
 */
async function init() {
  // //初始化响应式数据 要用async 因为接口返回一个promise
  // Promise.all([getCinemaInfo(params), getCurCinemaFilmList(params)]).then(
  //   ([cinemaInfoResp, cinemaFilmsResp]) => {
  //     cinemaInfo.value = cinemaInfoResp.cinema;
  //     films.value = cinemaFilmsResp.films;
  //   }
  // );

  //初始化仓库数据
  cinemaStore.getCinemaFlimsList(params);
  cinemaStore.getCinemaInfo(params);
}

// 设置掉排期的接口
function 


onMounted(() => {
  init();
});

onUnmounted(() => {
  cinemaStore.clearInfo();
  // cinemaStore.$reset()
});
</script>
<template>
  <div class="cinema-page-info">
    <div class="header">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <span> {{ isShow ? cinemaInfo?.name : " " }}</span>
        </template>
      </van-nav-bar>
      <van-nav-bar :title="cinemaInfo?.name" v-if="!isShow" />
    </div>
    <div class="body">
      <template v-if="cinemaInfo && films">
        <div class="cinema-info"><Info :info="cinemaInfo" /></div>
        <div class="cinema-carousel">
          <Carousel :films="films" :filmId="(filmId as string)" />
        </div>
        <div class="cinema-schedule"><Schedule /></div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cinema-page-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-nav-bar {
  height: 44px;
}
.van-nav-bar::after {
  display: none;
}
.body {
  flex: 1;
  height: 100%;
  // background: #d08383;
}
</style>
