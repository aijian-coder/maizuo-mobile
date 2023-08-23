<script lang="ts" setup>
import { httpGet } from '@/utils/request';
function handelReq(){

   httpGet<API.ICityListResp>("mall.film-ticket.city.list").then(res=>{

       console.log(res.cities);
   });
    
}
</script>
<template>
    <h1>电影列表页</h1>
    <button @click="handelReq">点击</button>
</template>