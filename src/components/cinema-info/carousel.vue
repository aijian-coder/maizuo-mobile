<script lang="ts" setup>
import Swiper from "swiper";
import "swiper/css/bundle";
import { onUpdated, onMounted, computed, ref } from "vue";

const props = defineProps<{ films: API.IFilm[] | null }>();
// swiper 容器
const container = ref<HTMLElement | null>(null);
const img = ref<HTMLElement | null>(null);

//当前下标
const curIndex = ref(0);
// TODO
// const curFilm = computed(() => props.films[curIndex.value]);
const curPoster = computed(() => {
  return props.films![curIndex.value].poster;
});

//背景图片样式
const styleValue = computed(() => ({
  backgroundImage: `url(${curPoster.value})`,
}));

onMounted(() => {
  // console.log(props.films);

  // 不建议使用 css 选择器，原因是别的组件中也有使用 这个类名
  const mySwiper = new Swiper(container.value!, {
    slidesPerView: 4,
    spaceBetween: 16,
    centeredSlides: true,
    slideToClickedSlide: true,
  });
  mySwiper.on("slideChange", () => {
    curIndex.value = mySwiper.activeIndex;
    // console.log(curFilm.value);
  });
});
onUpdated(() => {});
</script>
<template>
  <div class="carousel-page">
    <div class="carousel-bg" :style="styleValue"></div>
    <div class="swiperBg">
      <div class="swiper-container" ref="container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="film in films" :key="film.filmId">
            <img :src="film.poster" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.carousel-page {
  height: 160px;
  position: relative;
  // background: #e3a7a7;
  overflow: hidden;
  &::after {
    // 三角形
    content: " ";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-color: transparent transparent #fff transparent !important;
    border: 10px;
    border-style: solid;
    z-index: 5;
  }
  .carousel-bg {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    filter: blur(30px);
  }
  .swiperBg {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
  }
}

.swiper-container {
  width: 100%;
  height: 130px;
}
.swiper-wrapper {
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  height: 100%;
}
.swiper-slide {
  transition: 300ms;
  box-sizing: border-box;
  padding-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 72px;
    height: 100%;
    transition: all 0.5s ease;
  }
}
.swiper-slide-active {
  padding-top: 0px;
  img {
    width: 90px;
    height: 100%;
  }
}
</style>
