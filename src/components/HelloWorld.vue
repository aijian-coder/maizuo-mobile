<template>
  <h1>hello</h1>
  <button @click="handelset">点击</button>
  <button @click="handelset1">点击2</button>
</template>
<script setup lang="ts">
import request, { httpGet } from "@/utils/request";
function handelset() {
  request("https://m.maizuo.com/gateway", {
    headers: {
      "X-Host": "mall.film-ticket.film.list",
    },
    params: {
      cityId: 440300,
      pageNum: 1,
      pageSize: 10,
      type: 1,
    },
  }).then((res:any) => {
    console.log(res);
  });
}
// interface IActor {
//   name: string;
//   role: string;
//   avatarAddress: string;
// }
// interface IFilm {
//   actors: IActor[];
//   category: string;
//   director: string;
//   filmId: number;
//   filmType: { name: string; value: number };
//   item: { name: string; type: number };
//   grade: string;
//   isPresale: boolean;
//   isSale: boolean;
//   language: string;
//   name: string;
//   nation: string;
//   poster: string;
//   premiereAt: number;
//   runtime: number;
//   synopsis: string;
//   timeType: number;
//   videoId: string;
// }
// interface IFilmListResp {
//   films: IFilm[];
//   total: number;
// }
function handelset1() {
  httpGet<API.IFilmListResp >("mall.film-ticket.film.list", {
    cityId: 440300,
    pageNum: 1,
    pageSize: 10,
    type: 1,
  }).then((res:any) => {
    console.log(res.films);
    
  });
}
</script>
