<script lang="ts" setup>
import { showDialog } from "vant";
import { ref, onMounted } from "vue";
import { useCityStore } from "@/stores/city";

const CityStore = useCityStore();

function onClickLeft() {
  showDialog({ message: "请选择城市" });
}

/* function handelget(){
  CityStore.getLIst()
} */

onMounted(() => {
  CityStore.getLIst();
});
const keyword = ref("");
</script>

<template>
  <div class="page-city">
    <van-nav-bar title="当前城市-深圳" left-arrow @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" size="20" />
      </template>
    </van-nav-bar>
    <van-search v-model="keyword" placeholder="请输入搜索关键词" />
    <!-- <van-button @click="handelget">点击获取城市</van-button> -->
    <div class="body">
      <div class="recommend-city">
        <div class="gprs-city">
          <div class="city-index-title">GPS定位你所在城市</div>
          <ul class="city-index-detail cleanfix">
            <li class="city-item-detail city-item-detail-gprs">
              <van-tag
                type="primary"
                size="large"
                color="#f4f4f4"
                text-color="#000"
                >定位失败</van-tag
              >
            </li>
          </ul>
        </div>
        <div class="hot-city">
          <div class="city-index-title">热门城市</div>
          <ul class="city-index-detail cleanfix">
            <li class="city-item-detail">
              <van-tag
                type="primary"
                size="large"
                color="#f4f4f4"
                text-color="#000"
                >深圳</van-tag
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-city {
  height: 44px;
  display: flex;
  flex-direction: column;
  ::v-deep(.van-nav-bar__content) {
    height: 44px;
    color: #191a1b;
  }
  .van-icon {
    color: #191a1b;
  }
}
.body {
  background: #797d82;
  .recommend-city {
    background-color: #fff;
    padding-left: 15px;
    padding-top: 15px;
    .gprs-city {
      height: 80px;
    }
    .hot-city {
      height: 120px;
    }
  }
}
.city-index-title {
  margin-bottom: 10px;
  color: #797d82;
}
.van-tag {
  height: 30px;
  width: 100px;
  background-color: #f4f4f4;
  justify-content: center;
  line-height: 30px;
  margin: 0 7.5px;
  font-size: 16px;
  color: #191a1b;
}
.city-item-detail {
  height: 45px;
}
</style>
