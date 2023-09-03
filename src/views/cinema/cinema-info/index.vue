<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUpdated, ref } from "vue";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
const { cinemaId, filmId, show } = route.params;

const isShow = ref(false);
const params = { cinemaId: cinemaId + "" };
const schedules = ref<API.ISchedule[]>([]);

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
// async function init() {
//   Promise.all([
//     cinemaStore.getCinemaInfo(params),
//     cinemaStore.getCinemaFlimsList(params),
//   ]).then(([cinemaInfoResp, cinemaFilmsResp]) => {
//     cinema.value = cinemaInfoResp.cinema;
//     films.value = cinemaFilmsResp.films;
//   });
// }
function init() {
  cinemaStore.getCinemaInfo(params);
  cinemaStore.getCinemaFlimsList(params);
}

onMounted(() => {
  init();
});
onUpdated(() => {
  // console.log(cinemaStore.cinemaInfo);
});
</script>
<template>
  <div class="cinema-page-info">
    <div class="header">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <span> {{ isShow ? cinemaStore.cinemaInfo?.name : " " }}</span>
        </template>
      </van-nav-bar>
      <van-nav-bar :title="cinemaStore.cinemaInfo?.name" v-if="!isShow" />
    </div>
    <div class="body">
      <template v-if="cinemaStore.cinemaInfo && cinemaStore.cinemaFilms">
        <div class="cinema-info"><Info :info="cinemaStore.cinemaInfo" /></div>
        <div class="cinema-carousel">
          <Carousel :films="cinemaStore.cinemaFilms" />
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
