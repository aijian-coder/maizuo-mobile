<script lang="ts" setup>
import ScheduleItem from "./schedule-item.vue";

//点击变色，变灰色
function handelClick(el: { value: HTMLDivElement }) {
  el.value.classList.add("disable");
}
</script>
<template>
  <div class="schedule-page">
    <van-tabs shrink sticky>
      <van-tab v-for="index in 3" :title="'9月' + index + '日'" :key="index">
       
          <ScheduleItem @clickTab="handelClick"  v-for="index in 10" :key="index"/>
        
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.schedule-page {
  overflow-y: hidden;
}
</style>
