<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUnmounted, ref } from "vue";
import { getCinemaInfo, getCurCinemaFilmList } from "@/api/cinema";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
const { cinemaId } = route.params;

const isShow = ref(false);
const params = { cinemaId: cinemaId + "" };
const cinema = ref<API.CinemaInfo | null>(null);
const films = ref<API.IFilm[]>([]);

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
  Promise.all([getCinemaInfo(params), getCurCinemaFilmList(params)]).then(
    ([cinemaInfoResp, cinemaFilmsResp]) => {
      cinema.value = cinemaInfoResp.cinema;
      films.value = cinemaFilmsResp.films;
    }
  );
  cinemaStore.getCinemaFlimsList(params);
  cinemaStore.getCinemaInfo(params);
}

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
          <span> {{ isShow ? cinemaStore.cinemaInfo?.name : " " }}</span>
        </template>
      </van-nav-bar>
      <van-nav-bar :title="cinemaStore.cinemaInfo?.name" v-if="!isShow" />
    </div>
    <div class="body">
      <template v-if="cinema">
        <div class="cinema-info"><Info :info="cinema" /></div>
        <div class="cinema-carousel">
          <Carousel :films="films" />
          <!-- <Carousel :films="cinemaStore.cinemaFilms" /> -->
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
