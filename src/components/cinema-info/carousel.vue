<script lang="ts" setup>
import router from "@/router";
import Swiper from "swiper";
import "swiper/css/bundle";

import { onMounted, computed, ref } from "vue";

//定义prop
const props = defineProps<{ films: API.Film[]; filmId?: string }>();

//定义emits
const emits = defineEmits<{
  //可能是数组，因为电影会有多个天数的排期
  changeFilmId: [payload: string];
  changeDate: [payload: string];
}>();

// swiper 容器
const container = ref<HTMLElement | null>(null);
const img = ref<HTMLElement | null>(null);

//当前激活的轮播图的下标
const curIndex = ref(0);

// 当前激活的电影
const curFilm = computed(() => props.films[curIndex.value]);

// 当前激活的电影海报
const curPoster = computed(() => {
  return props.films[curIndex.value].poster;
});

//背景图片样式
const styleValue = computed(() => ({
  backgroundImage: `url(${curPoster.value})`,
}));

//点击跳转
//TODO  路由跳转
// const params = { filmId: curFilm.value.filmId };
// const params = computed(()=>({ filmId: curFilm.value.filmId + "" }))
function handelJump(filmId: any) {
  router.push({
    name: "films-detail",
    params: { filmId },
  });
}

onMounted(() => {
  // 不建议使用 css 选择器，原因是别的组件中也有使用 这个类名
  const mySwiper = new Swiper(container.value!, {
    slidesPerView: 4,
    spaceBetween: 16,
    centeredSlides: true,
    slideToClickedSlide: true,
  });
  //判断传递的filmId是否有值
  if (props.filmId) {
    const index = props.films.findIndex(
      (item) => item.filmId === +props.filmId!
    );
    // 使用 mySwiper 的 slideTo() 切换到 index 下标的电影信息
    mySwiper.slideTo(index);
  }

  //触发自定义事件，把当前的电影filmId和时间撮showDate传递出去
  // 默认通知一次父组件，filmId 是什么, showDate 是什么
  emits("changeFilmId", props.films[mySwiper.activeIndex].filmId + "");
  emits("changeDate", props.films[mySwiper.activeIndex].showDate + "");

  mySwiper.on("slideChange", () => {
    curIndex.value = mySwiper.activeIndex;
    // 切换后通知父组件切换了并传递，filmId 是什么, showDate 是什么
    emits("changeFilmId", props.films[mySwiper.activeIndex].filmId + "");
    emits("changeDate", props.films[mySwiper.activeIndex].showDate + "");
  });
});
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
  <div
    class="film-info"
    @click="handelJump(curFilm.filmId)"
    :data-filmId="curFilm.filmId"
  >
    <div class="film-head">
      <span>{{ curFilm.name }}&nbsp;</span>
      <i style="color: #ff5f16">{{ curFilm.grade }}</i>
      <span style="color: #ff5f16; font-size: 12px">分</span>
    </div>
    <van-icon name="arrow" size="10" />
    <div class="film-desc">
      {{ curFilm.category }} | {{ curFilm.runtime + "分钟" }} |
      {{ curFilm.director }} | {{ curFilm.synopsis }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.carousel-page {
  // filter: grayscale(100%);
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
.film-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  padding: 15px 0;
  box-sizing: border-box;
  cursor: pointer;
  .van-icon {
    position: absolute;
    top: 40px;
    right: 10px;
    transform: translateY(-50%);
  }
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    transform: scaleY(0.5);
  }
  .film-head {
    display: flex;
    justify-content: center;
    font-size: 15px;
    color: #191a1b;
    align-items: end;
    padding-bottom: 10px;
  }
  .film-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 54px;
    color: #797d82;
    font-size: 14px;
  }
}
</style>
