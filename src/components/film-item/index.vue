<script lang="ts" setup>
import { computed } from "vue";
defineOptions({
  name: "FilmDetail",
});
const emits = defineEmits(["myclick"]);
const props = defineProps<{
  film: API.IFilm;
}>();
const actorsText = computed(() =>
  // 基于 props.film.actors => ['张三', '里斯', '王五'].join(' ')
  props.film.actors.map((item) => item.name).join(" ")
);
function handelClick(event: Event) {
  // console.log("ok");
  emits("myclick", event);
}
</script>
<template>
  <div class="nowPlayingFilm-item" @click="handelClick">
    <div
      class="nowPlayingFilm-img"
      alt="film"
      style="width: 66px; height: 94px; /*  background: rgb(249, 249, 249)*/"
    >
      <img :src="film.poster" class="target-img" />
    </div>
    <div class="nowPlayingFilm-info">
      <div class="info_item nowPlayingFilm-name">
        <span class="name" style="padding-right: 5px">{{ film.name }}</span>
        <van-tag color="#d2d6dc">2D</van-tag>
      </div>
      <div class="info_item nowPlayingFilm-grade" style="visibility: visible">
        <span class="label">观众评分 </span
        ><span class="grade" style="color: #ff5f16">{{ film.grade }}</span>
      </div>
      <div class="info_item nowPlayingFilm-actors">
        <span class="label actors">主演：{{ actorsText }}</span>
      </div>
      <div class="info_item nowPlayingFilm-detail">
        <span class="label">{{ film.nation }} | {{ film.runtime }}分钟</span>
      </div>
    </div>
    <div class="info_item nowPlayingFilm-buy"><span>购票</span></div>
  </div>
</template>

<style lang="scss" scoped>
.nowPlayingFilm-item {
  display: flex;
  font: 12px Tahoma, Helvetica, Arial, sans-serif;
  font-family: Microsoft YaHei, Tahoma, Helvetica, Arial, sans-serif;
  color: #707274;
  list-style: none;
  margin: 0;
  padding: 15px 15px 15px 0;
  height: 94px;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #ededed;
}
.nowPlayingFilm-info {
  width: 100px;
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
.nowPlayingFilm-buy {
  width: 50px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    border: 1px solid;
    border-radius: 3px;
    padding: 3px 10px;
    color: #ff5f16;
  }
}
.target-img {
  width: 64px;
}
</style>
