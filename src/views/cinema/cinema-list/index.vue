<script lang="ts" setup>
import { useCityStore } from "@/stores/city";
import { useRouter } from "vue-router";
import CinemaList from "@/components/cinema-list/index.vue";

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
function handelscroll(e:Event){
  // ,(e.target as HTMLElement).scrollTop
  // console.log("gun",(e.target as HTMLElement).scrollTop);
}
</script>

<template>
  <div class="page-cinema-list">
    <van-nav-bar title="影院" left-arrow right-arrow @click-left="onClickLeft">
      <template #left>
        <span>{{ cityStre.curCity?.name }}&nbsp;</span>
        <van-icon name="arrow-down" :size="12" color="#000" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#000" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item title="全城" />
      <van-dropdown-item title="APP订票" />
      <van-dropdown-item title="最近去过" />
    </van-dropdown-menu>
    <div class="body" @scroll="handelscroll">
      <CinemaList :type="1" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-cinema-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .body {
    flex: 1;
    background: #b4b2b2;
    overflow-y: auto;
  }
}
</style>
