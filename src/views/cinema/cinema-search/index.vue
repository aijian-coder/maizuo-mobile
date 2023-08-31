<script lang="ts" setup>
import { useCinemaStore } from "@/stores/cinema";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CinemaList from "@/components/cinema-list/index.vue";

const cinemaStore = useCinemaStore();

const router = useRouter();
const keword = ref("");
const onSearch = () => {
  // console.log("search");
};
const onCancel = () => {
  router.replace({
    name: "cinemas",
  });
};

//搜索，此处使用防抖
let timer: any;
function handelsearch() {
  // console.log(cinemaStore.cinemas);

  clearInterval(timer);
  timer = setTimeout(() => {
    // console.log("search");
    cinemaStore.setSearchKey(keword.value);
  }, 500);
}
</script>
<template>
  <div class="cinemas-page-search">
    <div class="header">
      <van-search
        v-model="keword"
        clearable
        show-action
        placeholder="请输入影城名称"
        @search="onSearch"
        @cancel="onCancel"
        @update:model-value="handelsearch"
      />
    </div>

    <div class="body">
      <CinemaList
        :type="1"
        :is-search="true"
        :search-list="cinemaStore.searchCinemaList"
      />
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
