<script lang="ts" setup>
import ScheduleItem from "./schedule-item.vue";

function handelClick(el: { value: HTMLDivElement }) {
  console.log(el.value.childNodes);
}
</script>
<template>
  <div class="schedule-page">
    <van-tabs shrink sticky >
      <van-tab v-for="index in 3" :title="'9月' + index + '日'" :key="index">
        <template v-for=" in 10">
          <ScheduleItem @clickTab="handelClick" />
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.schedule-page {
  overflow-y: hidden;
}
</style>
