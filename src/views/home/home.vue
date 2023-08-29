<script lang="ts" setup>

defineOptions({
  name: "home",
});

</script>
<template>
  <div class="page-home">
    <div class="page-home__body">
      <RouterView />
    </div>
    <div class="page-home__footer">
      <van-tabbar inactive-color="#797d82" route  :fixed="false">
        <van-tabbar-item  replace to="/films" icon="video-o">电影</van-tabbar-item>
        <van-tabbar-item  replace to="/cinemas"  icon="search">影院</van-tabbar-item>
        <van-tabbar-item  replace to="/posts"  icon="notes-o">咨询</van-tabbar-item>
        <van-tabbar-item  replace to="/center"  icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-home {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__body {
    // background: #c87171;
    overflow-y: auto;
    flex: 1;
  }
  &__footer {
    height: 50px;
  }
}
</style>
