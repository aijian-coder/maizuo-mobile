<script lang="ts" setup>
// import { computed } from "vue";

const emits = defineEmits(["myclick"]);
defineProps<{
  cinema: API.Cinema;
}>();

function handelClick() {
  // console.log("ok");
  emits("myclick");
}
</script>
<template>
  <div class="cinema-list-item" @click="handelClick">
    <div class="cinema-info-lf cinema-info">
      <span class="cinema-name">{{ cinema.name }}</span>

      <span class="cinema-address">{{ cinema.address }}</span>
    </div>
    <div class="cinema-info-rt cinema-info">
      <span class="cinema-name">￥{{ cinema.lowPrice / 100 }}起</span>
      <span class="cinema-gpsAddress">xx km</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cinema-list-item {
  font: 12px/1.5 Tahoma, Helvetica, Arial, sans-serif;
  font-family: Microsoft YaHei, Tahoma, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #707274;
  list-style: none;
  margin: 0;
  position: relative;
  background-color: #fff;
  padding: 15px;
  height: 45px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  align-content: center;
  cursor: pointer;
}
.cinema-info-lf {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cinema-address,
  .cinema-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cinema-name {
    font: 16px Tahoma, Helvetica, Arial, sans-serif;
    color: #000;
  }

  width: calc(100% - 65px);
  text-align: left;
  padding-right: 15px;
}
.cinema-info-rt {
  white-space: nowrap;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  .cinema-name {
    font: 16px Tahoma, Helvetica, Arial, sans-serif;
    color: #ff5f16;
  }
}
</style>
