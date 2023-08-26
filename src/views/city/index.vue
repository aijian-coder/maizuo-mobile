<script lang="ts" setup>
import { showDialog } from "vant";
import { ref, onMounted, computed } from "vue";
import { useCityStore } from "@/stores/city";

const keyword = ref("");
const CityStore = useCityStore();

//使用计算属性搜索城市列表结果
const searchCompute = computed(() => {
  return CityStore.cities.filter((city) => {
    if (!keyword.value) return;
    return (
      city.pinyin.includes(keyword.value) || city.name.includes(keyword.value)
    );
  });
});

// const search = ref(<API.ICity[]>[]); //搜索城市列表结果
// //使用函数计算搜索城市列表结果
// function searchCitys() {
//   search.value = CityStore.cities.filter((city) => {
//     if (!keyword.value) return;
//     return (
//       city.pinyin.includes(keyword.value) || city.name.includes(keyword.value)
//     );
//   });
// }

//点击顶部左侧小叉叉
function onClickLeft() {
  showDialog({ message: "请选择城市" });
  //TODO
}

//点击选择城市
function handeldown(city: API.ICity) {
  //TODO
  console.log(city);
  CityStore.setCurrentcity(city);
}

// 在输入框输入，触发此处
function handelSearch() {
  // console.log(keyword.value);
  // searchCitys()
}

onMounted(() => {
  CityStore.getLIst();
});
</script>

<template>
  <div class="page-city">
    <div class="header">
      <van-nav-bar title="当前城市-深圳" left-arrow @click-left="onClickLeft">
        <template #left>
          <van-icon name="cross" size="20" />
        </template>
      </van-nav-bar>
      <van-search
        v-model="keyword"
        placeholder="输入城市名或者拼音"
        clearable
        maxlength="10"
        @update:model-value="handelSearch()"
      >
      </van-search>
    </div>
    <div class="body" v-show="searchCompute.length">
      <van-index-bar :index-list="[]">
        <van-cell
          v-for="item in searchCompute"
          :title="item.name"
          :key="item.cityId"
          @click="handeldown(item)"
          style="cursor: pointer"
        />
      </van-index-bar>
    </div>
    <div class="body" v-show="!searchCompute.length">
      <div class="recommend-city">
        <div class="gprs-city">
          <div class="city-index-title">GPS定位你所在城市</div>
          <van-row gutter="20">
            <van-col span="8"
              ><van-tag
                type="primary"
                size="large"
                color="#f4f4f4"
                text-color="#000"
                >深圳</van-tag
              ></van-col
            ></van-row
          >
        </div>
        <div class="hot-city">
          <div class="city-index-title">热门城市</div>
          <template v-for="item in CityStore.hotCity" :key="item.cityId">
            <van-space :size="20">
              <van-tag
                type="primary"
                size="large"
                color="#f4f4f4"
                text-color="#000"
                @click="handeldown(item)"
                >{{ item.name }}</van-tag
              ></van-space
            >
          </template>
        </div>
      </div>
      <van-index-bar :index-list="CityStore.indexList" :sticky-offset-top="90">
        <template v-for="group in CityStore.cityGroup" :key="group.groupName">
          <van-index-anchor :index="group.groupName" />
          <van-cell
            v-for="item in group.groupList"
            :title="item.name"
            :key="item.cityId"
            @click="handeldown(item)"
            style="cursor: pointer"
          />
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-city {
  ::v-deep(.van-nav-bar__content) {
    height: 44px;
    color: #191a1b;
  }
  .van-icon {
    color: #191a1b;
  }
}
.header {
  height: 90px;
  // background: #000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 300;
}

.body {
  background: #797d82;
  padding-top: 90px;
  box-sizing: border-box;
  position: relative;
  overflow-y: hidden;
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
  height: 25px;
  width: 80px;
  background-color: #f4f4f4;
  justify-content: center;
  line-height: 30px;
  margin: 5px 7.5px;
  font-size: 16px;
  color: #191a1b;
  cursor: pointer;
}
.city-item-detail {
  height: 45px;
}
.van-index-bar {
  ::v-deep(.van-index-anchor) {
    background-color: #f4f4f4;
    color: #797d82;
    padding: 0 0 0 15px;
    height: 30px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
