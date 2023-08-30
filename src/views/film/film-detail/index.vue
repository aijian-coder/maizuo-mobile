<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useFilmStore } from "@/stores/film";
import { computed, ref } from "vue";
import { onUnmounted } from "vue";

const filmStore = useFilmStore();
const actorsText = computed(() =>
  // 基于 props.film.actors => ['张三', '里斯', '王五'].join(' ')
  filmStore.film?.actors.map((item) => item.name).join(" ")
);
//设置 顶部NavBar显示
const showHeader = ref(false);

// const router = useRouter();
const route = useRoute();
// console.log(router);

function handleClick() {
  console.log("ok", route.fullPath.split("/").slice(-1)[0]);
}

function handelscroll(e: Event) {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  showHeader.value = scrollTop >= 50;
}
// onBeforeRouteUpdate(()=>{

//   filmStore.getFilm({ filmId:  (route.fullPath.split("/").slice(-1)[0] )});
// })
// router.beforeEach((to, from) => {
//   // ...
//   // 返回 false 以取消导航
//   // console.log(to, from);

//   // return false
// })
// onMounted(() => {
//   console.log("onMounted", filmStore.film);

//   filmStore.getFilm({ filmId: route.fullPath.split("/").slice(-1)[0] });
// });
onUnmounted(() => {
  // console.log("onUnmounted", filmStore.film);
  filmStore.clearFilm();
});
</script>
<template>
  <div class="film-detail">
    <div class="header" v-show="showHeader">
      <van-nav-bar :title="filmStore.film?.name" />
    </div>
    <div class="body" @scroll="handelscroll">
      <div class="poster">
        <img :src="filmStore.film?.poster" class="target-img" />
      </div>
      <div class="detail">
        <div class="info_item nowPlayingFilm-name">
          <span class="name" style="padding-right: 5px">{{
            filmStore.film?.name
          }}</span>
          <van-tag color="#d2d6dc">2D</van-tag>
        </div>
        <div class="info_item nowPlayingFilm-grade" style="visibility: visible">
          <span class="label">观众评分 </span
          ><span class="grade" style="color: #ff5f16">{{
            filmStore.film?.grade
          }}</span>
        </div>
        <div class="info_item nowPlayingFilm-actors">
          <span class="label actors">主演：{{ actorsText }}</span>
        </div>
        <div class="info_item nowPlayingFilm-detail">
          <span class="label"
            >{{ filmStore.film?.nation }} |
            {{ filmStore.film?.runtime }}分钟</span
          >
        </div>
      </div>
      <div class="actor"></div>
      <div class="photos"></div>
    </div>
    <div class="foot">
      <van-button type="primary" block @click="handleClick"
        >选座购票</van-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.film-detail {
  display: flex;
  flex-direction: column;
  height: 100%;

  .head {
    height: 44px;
  }
  .body {
    flex: 1;
    overflow-y: auto;
    color: #707274;
    background: #eeeeee;
  }
  .foot {
    height: 50px;
    // background: #eef130;
    .van-button {
      height: 100%;
    }
  }
}
// 海报
.poster {
  width: 100%;
  height: 300px;
  background: rgb(169, 55, 55);
  opacity: 1;
  overflow-y: hidden;
}

.detail {
  height: 190px;
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: #fff;

  .info_item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nowPlayingFilm-name {
    font: 16px Tahoma, Helvetica, Arial, sans-serif;
    color: #000;
  }
}
.target-img {
  width: 100%;
}
.actor {
  height: 190px;
  background: #e99595;
  margin: 10px 0;
}
.photos {
  height: 190px;
  background: #77db91;
}
</style>
