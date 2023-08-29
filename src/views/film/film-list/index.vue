<script lang="ts" setup>
import FilmList from "@/components/film-list/index.vue";
import { useCityStore } from "@/stores/city";
import { ref } from "vue";
import { useRouter } from "vue-router";

//拿到仓库
const cityStre = useCityStore();
//拿到路由器
const router = useRouter();

//设置 顶部NavBar显示
const showHeader = ref(false);
// Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数。顶部卷去的像素
function handleScroll(event: Event) {
  // console.log((event.target as HTMLElement).scrollTop);
  const scrollTop = (event.target as HTMLElement).scrollTop;
  showHeader.value = scrollTop >= 50;
}

//顶部左侧点击
function onClickLeft() {
  // console.log("跳转回city页");
  router.replace({
    name: "city",
  });
}
</script>

<template>
  <div class="page-film-list">
    <van-nav-bar
      title="电影"
      v-show="showHeader"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <span>{{ cityStre.curCity?.name }}&nbsp;</span>
        <van-icon name="arrow-down" :size="12" />
      </template>
    </van-nav-bar>

    <van-tabs>
      <van-tab title="正在热映">
        <FilmList :type="1" @myscroll="handleScroll"
      /></van-tab>
      <van-tab title="即将上映">
        <FilmList :type="2" @myscroll="handleScroll"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.page-film-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .van-tabs {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .van-tab__panel {
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  ::v-deep(.van-tabs__content) {
    flex: 1;
    overflow: hidden;
  }
}
</style>
