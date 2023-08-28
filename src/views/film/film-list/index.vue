<script lang="ts">
import FilmList from "@/components/film-list/index.vue";
</script>

<template>
  <van-tabs>
    <van-tab title="正在热映"> <FilmList :type="1"/></van-tab>
    <van-tab title="即将上映"> <FilmList :type="2"/></van-tab>
  </van-tabs>
</template>
