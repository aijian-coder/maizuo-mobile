<!-- 
/**
 * 腾讯地图开放平台：
 *  https://lbs.qq.com/
 * 入口使用：
 *  1. 注册登录（公司的话，使用企业账号）
 *  2. 控制台，创建应用，添加key
 *  3. 页面放置一个 地图容器
 *  4. 引入JSSDK，就是一段 script, https://map.qq.com/api/gljs?v=1.exp&key=4E2BZ-VVEW4-STIUA-K6IFY-OWKOV-BDBER   PS: 注意修改 key 的参数
 *  5. 使用 全局的 TMap 对象来创建地图实例
 */
 -->
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const container = ref<HTMLDivElement>();

//地图初始化函数，本例取名为init，开发者可根据实际情况定义
function initMap() {
  if (!container.value) return;

  //定义map变量，调用 TMap.Map() 构造函数创建地图
  const map = new TMap.Map(container.value, {
    center: [31.23958, 121.499763], // 地图中心点坐标
    zoom: 16.7, //设置地图缩放级别
    pitch: 43.5, //设置俯仰角
    rotation: 45, //设置地图旋转角度
  });
}
onMounted(() => {
  initMap();
});
</script>
<template>
  <div class="center-page">
    <div class="header">个人中心</div>
    <div class="body">
      <div ref="container" class="container"></div>
    </div>
  </div>
</template>
<style lang="scss">
.center-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.body {
  flex: 1;
  background: #ed8c8c;

  padding: 20px;
}
.container {
  height: 550px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #000;
}
</style>
