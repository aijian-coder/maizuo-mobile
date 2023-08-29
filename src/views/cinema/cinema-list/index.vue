<script lang="ts" setup>
import FilmList from "@/components/film-list/index.vue";
import { useCityStore } from "@/stores/city";
import { useRouter } from "vue-router";

//拿到仓库
const cityStre = useCityStore();
//拿到路由器
const router = useRouter();


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
      title="影院"
      left-arrow
      right-arrow
      @click-left="onClickLeft"
    >

      <template #left>
        <span>{{ cityStre.curCity?.name }}&nbsp;</span>
        <van-icon name="arrow-down" :size="12"  color="#000"/>
      </template>
      <template #right>
    <van-icon name="search" size="18" color="#000"/>
  </template>
    </van-nav-bar>
<van-dropdown-menu>
  <van-dropdown-item  />
  <van-dropdown-item />
</van-dropdown-menu>
    <van-tabs>
      <van-tab title="正在热映">
        <FilmList :type="1"
      /></van-tab>
      <van-tab title="即将上映">
        <FilmList :type="2"
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
