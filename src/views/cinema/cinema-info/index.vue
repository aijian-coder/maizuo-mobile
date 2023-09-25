<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUnmounted, ref, watchEffect, toRefs } from "vue";
import { getSchedules } from "@/api/cinema";
//使用响应式 调取接口
// import { getCinemaInfo, getCurCinemaFilmList } from "@/api/cinema";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
let { cinemaId } = route.params;
const isShow = ref(false);

//调接口的参数
// const params = { cinemaId: cinemaId + "", filmId, showdate };

// //设置响应式数据
// const cinemaInfo = ref<API.CinemaInfo | null>(null);
// const films = ref<API.IFilm[]>([]);
// const schedules = ref<API.ISchedule[]>([]);

//设置仓库数据
const { cinemaFilms: films, cinemaInfo } = toRefs(cinemaStore);

// 定义当前的 filmId， 初始值由 URL 地址动态参数提供
const filmId = ref<string>(route.params.filmId as string);
// 定义当前的 date, 初始化由 URL 地址动态参数提供
const date = ref<string>(route.params.showdate as string);
//定义时间排期的接口返回值
const schedulesList = ref<API.ISchedule[]>([]);

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

// showDate ，当前电影的showDate

//子组件传递来的自定义事件处理函数
function handleChangeDate(aaa: any) {
  // console.log(aaa);
  date.value = aaa;
  // console.log(date.value);
}
function handleChangeFilmId(aaa: any) {
  filmId.value = aaa;
  // console.log(filmId);
}
watchEffect(async () => {
  // 默认触发一次，这时 filmId 与 date 还没有值。
  if (!filmId.value || !date.value) {
    return false;
  }
  console.log(cinemaId, filmId.value, date.value[0]);
  const res = await getSchedules({
    cinemaId: cinemaId as string,
    filmId: filmId.value,
    date: date.value[0],
  });
  schedulesList.value = res.schedules;
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
        <div class="cinema-schedule">
          <Schedule :schedules="schedulesList" v-if="schedulesList.length" />
        </div>
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
