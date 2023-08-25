<script lang="ts" setup>
import { showDialog } from "vant";
function onClickLeft() {
  showDialog({ message: "请选择城市" });
}
</script>
<template>
  <div class="page-city">
    <van-nav-bar title="当前城市-深圳" left-arrow @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" size="20" />
      </template>
    </van-nav-bar>
    <van-button>点击获取城市</van-button>
  </div>
</template>

<style lang="scss" scoped>
.page-city {
  height: 44px;
  ::v-deep(.van-nav-bar__content) {
    height: 44px;
    color: #191a1b;
  }
  .van-icon {
    color: #191a1b;
  }
}
</style>
