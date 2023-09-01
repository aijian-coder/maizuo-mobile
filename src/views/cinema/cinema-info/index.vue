<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter, useRoute } from "vue-router";
import { Carousel, Info, Schedule } from "@/components/cinema-info/index";
import { onMounted, onUpdated } from "vue";

const cinemaStore = useCinemaStore();
const router = useRouter();
const route = useRoute();
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
      <van-nav-bar
        :title="cinemaStore.cinemaInfo?.name"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="body">
        <div class="cinema-info"><Info :info="cinemaStore.cinemaInfo" /></div>
        <div class="cinema-carousel"><Carousel /></div>
        <div class="cinema-schedule"><Schedule /></div>
      </div>
    </div>
  </div>
</template>
