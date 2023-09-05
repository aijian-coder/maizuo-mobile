<script lang="ts" setup>
import ScheduleItem from "./schedule-item.vue";

function handelClick(aa: any) {
  console.log(aa);
}
</script>
<template>
  <div class="schedule-page" >
    <van-tabs shrink>
      <van-tab v-for="index in 3" :title="'9月' + index + '日'" :key="index">
        <template #default>
          <ScheduleItem @clickTab="handelClick" />
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.schedule-page {
}
</style>
