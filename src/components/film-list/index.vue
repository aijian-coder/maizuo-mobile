<!-- 
  当前组件，需要控制 showHeader 的值，要根据滚动条来控制，
  但是滚动条不是全局滚动条，而是局部元素的滚动
  问题：如果监控到局部元素的滚动
    1. document.getElelement('局部元素').addEventListener('scroll')

    2. FilmList 组件内 emit 出 scroll 事件出来
 -->

<script lang="ts" setup>
import { getFilmList } from "@/api/film";
import { reactive } from "vue";
import { useCityStore } from "@/stores/city";

const cityStore=useCityStore()

//定义一个调接口要用的prop
const props = defineProps<{
  type: 1 | 2;
}>();
/**
 * 请求接口的参数
cityId: 440300
pageNum: 1
pageSize: 10
type: 1
 */
// 请求接口的参数
const params = reactive({
  cityId: cityStore.curCityId,
  pageNum: 1,
  pageSize: 10,
  type: props.type,
});
 getFilmList(params)

</script>
<template>
  <h1>电影列表</h1>
</template>
