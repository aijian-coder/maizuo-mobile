<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
defineProps<{ scheduleItem: API.ISchedule }>();
const emits = defineEmits(["clickTab"]);
//向父组件传递自身的DOM
function handelclick() {
  emits("clickTab", item);
}
/* {
    "advanceStopMins": 15,
    "endAt": 1694087124,
    "filmLanguage": "英语",
    "hallName": "sk6号厅",
    "imagery": "2D",
    "isOnsell": true,
    "marketPrice": 11800,
    "salePrice": 10300,
    "scheduleId": 7456894,
    "showAt": 1694078193
} */

function formatShowAt(time: number) {
  return dayjs(time * 1000).format("HH:mm");
}
const item = ref(null);
</script>
<template>
  <div class="schedule-item" @click="handelclick" ref="item">
    <div class="left">
      <div class="start-at">{{ formatShowAt(scheduleItem.showAt) }}</div>
      <div class="end-at">{{ formatShowAt(scheduleItem.endAt) + "散场" }}</div>
    </div>
    <div class="middle">
      <div class="language">
        {{ scheduleItem.filmLanguage }}{{ scheduleItem.imagery }}
      </div>
      <div class="hall">{{ scheduleItem.hallName }}</div>
    </div>
    <div class="right">
      <div class="lowest-price">
        <span>￥{{ scheduleItem.salePrice / 100 }}</span>
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

.schedule-item.disable {
  filter: grayscale(100%);
  > * > * {
    color: rgb(19, 226, 74);
  }
}
</style>
