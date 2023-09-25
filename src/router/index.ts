import { createRouter, createWebHistory } from "vue-router";
import { useCityStore } from "@/stores/city";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 主页面，里面的四个主要页面是他的子集
      path: "/",
      name: "home",
      component: () => import("@/views/home/home.vue"),
      redirect: "/films", //首页直接显示电影列表
      children: [
        {
          //电影列表
          path: "films",
          name: "films",
          component: () => import("@/views/film/film-list/index.vue"),
          //设置路由前置守卫  ,值是一个函数
          beforeEnter: () => {
            //判断是否选择城市，到仓库中判断
            const { curCity } = useCityStore();
            if (!curCity) {
              return { name: "city" }; //仓库里面没有。直接重定向
            }
          },
        },
        {
          //影院列表页面
          path: "cinemas",
          name: "cinemas",
          component: () => import("@/views/cinema/cinema-list/index.vue"),
        },
        {
          //测试用页面
          path: "test",
          name: "test",
          component: () => import("@/views/film/film-list/test.vue"),
        },
        {
          //咨询列表 页面
          path: "posts",
          name: "posts",
          component: () => import("@/views/posts/index.vue"),
          meta: {
            needLogin: true,
          },
        },
        {
          //我的页面
          path: "center",
          name: "center",
          component: () => import("@/views/center/index.vue"),
        },
      ],
    },
    {
      //城市页面
      path: "/city",
      name: "city",
      component: () => import("@/views/city/index.vue"),
    },
    {
      //电影详情
      path: "/films/:filmId",
      name: "films-detail",
      component: () => import("@/views/film/film-detail/index.vue"),
    },

    {
      //影院列表搜索
      path: "/cinemas/search",
      name: "search",
      component: () => import("@/views/cinema/cinema-search/index.vue"),
    },

    {
      //影院详情页面
      // :xxx? => ?号表示该动态参数是可选的:表示动态参数
      //http://localhost:xxxx/cinema/6269/film/6464  孤注一掷测试 深圳后瑞传奇影城
      // path: "/cinema/:cinemaId/film/asd/asd",
      path: "/cinema/:cinemaId/film/:filmId?/:showdate?",
      name: "cinema-info",
      component: () => import("@/views/cinema/cinema-info/index.vue"),
    },
  ],
});

export default router;
