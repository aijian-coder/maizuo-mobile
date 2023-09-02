<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUpdated, ref } from "vue";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
const isShow = ref(false);
const params = { cinemaId: route.params.cinemaId + "" };
function onClickLeft() {
  router.back();
}

// let cinemaInfo = ref<API.CinemaInfo>();

onMounted(() => {
  cinemaStore.getCinemaInfo(params);
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
      <div class="cinema-info"><Info :info="cinemaStore.cinemaInfo !" /></div>
      <div class="cinema-carousel"><Carousel /></div>
      <div class="cinema-schedule"><Schedule /></div>
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
  background: #d08383;
}
</style>
