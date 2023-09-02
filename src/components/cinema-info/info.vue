<script lang="ts" setup>
defineProps<{ info: API.CinemaInfo }>();
function handelClick() {
  console.log("click");
}
</script>
<template>
  <div class="cinema-info">
    <div class="tags" @click="handelClick" style="cursor: pointer">
      <div class="tag" name="儿童票"></div>
      <!-- <van-tag type="primary" plain >标签</van-tag> -->
      <div class="tag" name="停车"></div>
      <div class="tag" name="3D眼镜"></div>
      <van-icon name="arrow" />
    </div>
    <div class="address">
      <img width="14px" height="21px" alt="" />
      <div>深圳宝安区后瑞地铁站B出口100米处（壹航城购物中心T2栋2楼）</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cinema-info {
  display: flex;
  flex-direction: column;
  .tags {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: #ffb232;
    overflow: hidden;
    position: relative;
    padding: 5px 0 15px;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #ededed;
      color: #ededed;
      transform: scaleY(0.5);
    }

    .tag {
      transform: scale(0.8);

      &::after {
        content: attr(name);
        padding: 2px 5px;
        border: 1px solid #ffb232;

        // border-radius: 4px;
        border-radius: 2px;
      }
    }
  }
}
</style>
