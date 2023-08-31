<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CinemaList from "@/components/cinema-list/index.vue";

const router = useRouter();
const value = ref("");
const onSearch = () => {};
const onCancel = () => {
  router.replace({
    name: "cinemas",
  });
};
</script>
<template>
  <div class="cinemas-page-search">
    <div class="header">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>

    <div class="body">
      <CinemaList :type="1" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cinemas-page-search {
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    // background: #000;
    overflow-y: auto;
  }
}
</style>
