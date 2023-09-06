<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUnmounted, ref, watchEffect, toRefs } from "vue";
//使用响应式 调取接口
// import { getCinemaInfo, getCurCinemaFilmList } from "@/api/cinema";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
let { cinemaId, filmId, showdate } = route.params;
const isShow = ref(false);

//调接口的参数
// const params = { cinemaId: cinemaId + "", filmId, showdate };

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
  cinemaStore.getCinemaFlimsList({ cinemaId: cinemaId + "" });
  cinemaStore.getCinemaInfo({ cinemaId: cinemaId + "" });
}

// 设置掉排期的接口
// function

//子组件传递来的自定义事件处理函数
function handleChangeDate(aaa: any) {
  // console.log(aaa);
  showdate = aaa;
  console.log(showdate);
}
function handleChangeFilmId(aaa: any) {
  filmId = aaa;
  console.log(filmId);
}

watchEffect(() => {
  // 默认触发一次，这时 filmId 与 date 还没有值。
  // if (!filmId || !showdate) {
  //   return;
  // }
  console.log(cinemaId, filmId, showdate);
});

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
          <Carousel
            :films="films"
            :filmId="(filmId as string)"
            @change-date="handleChangeDate"
            @change-film-id="handleChangeFilmId"
          />
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
