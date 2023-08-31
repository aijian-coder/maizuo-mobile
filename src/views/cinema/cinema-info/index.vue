<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { useRouter } from "vue-router";
const cinemaStore = useCinemaStore();
const router = useRouter();
function onClickLeft() {
  router.back();
}
</script>
<template>
  <div class="cinema-page-info">
    <div class="header">
      <van-nav-bar
        :title="cinemaStore.curCinema?.name"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
  </div>
</template>
