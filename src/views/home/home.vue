<script lang="ts" setup>
import { httpGet } from "@/utils/request";
import { useApp } from "@/stores/app";
import { useCount } from "@/stores/counter";
function handelReq() {
  httpGet<API.ICityListResp>("mall.film-ticket.city.list").then((res: any) => {
    console.log(res.cities);
  });
}
//useApp函数是一个组合式函数，函数调用就可以获取仓库的应用实例
const appStore = useApp();
const CountStore = useCount();

function handelTest() {
  console.log(appStore);
}

function handelchange() {
  appStore.msg == "hello"
    ? appStore.changeMsg("zhangdan")
    : appStore.changeMsg("hello");
}
</script>
<template>
  <h1>电影列表页</h1>
  <p>选项式创建仓库测试</p>
  <button @click="handelReq">点击获取城市列表</button>
  <button @click="handelTest">测试pinia实例</button>
  <p>{{ appStore.msg }}</p>
  <button @click="handelchange">修改仓库数据</button>
  <hr />
  <p>组合式创建仓库测试</p>
  <p>count:---{{ CountStore.count }}/countPlus:---{{ CountStore.countPlus }}</p>
  <button @click="CountStore.increment()">++</button>
  <button @click="CountStore.decrement()">--</button>
</template>
