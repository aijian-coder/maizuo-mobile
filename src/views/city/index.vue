<script lang="ts" setup>
import { showDialog } from "vant";
import { ref, onMounted } from "vue";
import { useCityStore } from "@/stores/city";

const keyword = ref("");
const CityStore = useCityStore();
const search = ref(<API.ICity[]>[]);
// let search = computed(() => {
//   return CityStore.cities.filter((city) => {
//     if (!keyword.value) return;
//     return (
//       city.pinyin.includes(keyword.value) || city.name.includes(keyword.value)
//     );
//   });
// });

function onClickLeft() {
  showDialog({ message: "请选择城市" });
}
function handeldown(city: any) {
  //点击城市
  console.log(city);
}

function handelSearch() {
  // 在输入框输入，触发此处
  console.log(keyword.value);
  search.value = CityStore.cities.filter((city) => {
    if (!keyword.value) return;
    return (
      city.pinyin.includes(keyword.value) || city.name.includes(keyword.value)
    );
  });
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
        placeholder="请输入搜索关键词"
        clearable
        maxlength="10"
        @update:model-value="handelSearch()"
      >
      </van-search>
    </div>
    <div class="body">
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
  overflow-y: auto;
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
