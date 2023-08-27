<script lang="ts" setup>
import { httpGet } from "@/utils/request";
function handelReq() {
  httpGet<API.ICityListResp>("mall.film-ticket.city.list").then((res) => {
    console.log(res.cities);
  });
}
</script>
<template>
  <button @click="handelReq">点击获取城市列表</button>
  <RouterView />
  <h1>首页导航栏</h1>
</template>
