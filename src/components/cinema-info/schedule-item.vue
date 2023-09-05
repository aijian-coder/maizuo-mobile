<script lang="ts" setup>
import { ref } from "vue";
const emits = defineEmits(["clickTab"]);
//向父组件传递自身的DOM
function handelclick() {
  emits("clickTab", item);
}
const item = ref(null);
</script>
<template>
  <div class="schedule-item" @click="handelclick" ref="item">
    <div class="left">
      <div class="start-at">17:47</div>
      <div class="end-at">20:08散场</div>
    </div>
    <div class="middle">
      <div class="language">国语2D</div>
      <div class="hall">skVIP厅</div>
    </div>
    <div class="right">
      <div class="lowest-price">
        <span>￥0</span>
      </div>
      <div class="buy-ticket">购票</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.schedule-item {
  display: block;
  height: 74px;
  padding: 15px 15px;
  box-sizing: border-box;
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #ededed;
    transform: scaleY(0.5);
  }
}
.left {
  height: 100%;
  float: left;
  width: 84px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .start-at {
    font-size: 15px;
    color: #191a1b;
  }
  .end-at {
    font-size: 13px;
    color: #797d82;
    margin-top: 2px;
  }
}
.middle {
  float: left;
  height: 100%;
  float: left;
  width: 84px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 210px);
  .language {
    font-size: 15px;
    color: #191a1b;
  }
  .hall {
    font-size: 13px;
    color: #797d82;
    margin-top: 2px;
  }
}
.right {
  font-size: 14px;
  color: #eb6816;
  float: right;
  height: 100%;
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .buy-ticket {
    margin-right: 10px;
    position: relative;
    &::after {
      content: " ";
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      position: absolute;
      border: 1px solid #eb6816;
      border-radius: 2px;
      transform: scale(0.8);
    }
  }
}
</style>
