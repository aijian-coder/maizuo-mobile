<script lang="ts" setup>
defineProps<{ info: API.CinemaInfo }>();
function handelClick() {
  console.log("click");
}
</script>
<template>
  <div class="cinema-info">
    <div
      class="tags"
      @click="handelClick"
      style="cursor: pointer"
      v-show="info.services"
    >
      <template v-for="service in info.services">
        <div class="tag" :data-title="service.name"></div>
        <!-- <van-tag type="primary" plain >标签</van-tag> -->
      </template>
      <van-icon name="arrow" />
    </div>
    <div class="address">
      <p>{{ info.address }}</p>
      <span>
        <a href="tel:0755-23082193"> <van-icon name="phone-o" size="22px" /></a
      ></span>
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
      transform: scaleY(0.2);
    }

    .tag {
      transform: scale(0.8);
      &::after {
        content: attr(data-title);
        padding: 2px 5px;
        border: 1px solid #ffb232;
        // border-radius: 4px;
        border-radius: 2px;
      }
    }
  }
}
.address {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: #dba3a3;
  &::before {
    content: " ";
    flex-shrink: 0;
    width: 14px;
    height: 21px;
    background: url("../../assets/address.png");
    background-size: 100%;
    margin: 0 10px;
  }
  p {
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span {
    padding: 0 25px;
  }
}
</style>
