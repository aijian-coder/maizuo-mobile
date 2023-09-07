<script lang="ts" setup>
import ScheduleItem from "./schedule-item.vue";

//点击变色，变灰色
function handelClick(el: { value: HTMLDivElement }) {
  el.value.classList.add("disable");
}

//定义prop接受index传下来的值
const props = defineProps<{ schedules: API.ISchedule[] }>();
console.log(props.schedules);
</script>
<template>
  <div class="schedule-page">
    <van-tabs shrink sticky>
      <van-tab v-for="index in 3" :title="'9月' + index + '日'" :key="index">
        <ScheduleItem
          @clickTab="handelClick"
          v-for="schedule in schedules"
          :key="schedule.endAt"
          :scheduleItem="schedule"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.schedule-page {
  overflow-y: hidden;
}
</style>
