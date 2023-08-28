<script lang="ts" setup>
import FilmItem from "@/components/film-item/index.vue"
const film={
    "filmId": 6464,
    "name": "孤注一掷",
    "poster": "https://pic.maizuo.com/usr/movie/6055722f845f73ab45d5d77d58fc2ea1.jpg",
    "actors": [
        {
            "name": "申奥",
            "role": "导演",
            "avatarAddress": "https://pic.maizuo.com/usr/movie/6aa3e66baa1f13870bfd8d6de81e5269.png"
        },
        {
            "name": "张艺兴",
            "role": "演员",
            "avatarAddress": "https://pic.maizuo.com/usr/movie/0f522f3e4bd18e496d97e8c17c05bfc1.png"
        },
        {
            "name": "金晨",
            "role": "演员",
            "avatarAddress": "https://pic.maizuo.com/usr/movie/789399740eb132d44325ba8c3c8d048e.jpeg"
        },
        {
            "name": "咏梅",
            "role": "演员",
            "avatarAddress": "https://pic.maizuo.com/usr/movie/390a71eaeca70de6bbeb2fb2f4dd12d7.jpg"
        },
        {
            "name": "王传君",
            "role": "演员",
            "avatarAddress": "https://pic.maizuo.com/usr/movie/770f8b42d9304c75c16cb7419eed78a0.jpg"
        }
    ],
    "director": "申奥",
    "category": "犯罪|剧情",
    "synopsis": "电影取材自上万起真实诈骗案例，境外网络诈骗全产业链骇人内幕将在大银幕上首度被揭秘。程序员潘生（张艺兴 饰）、模特安娜（金晨 饰）被海外高薪招聘吸引，出国淘金，却意外落入境外诈骗工厂的陷阱。为了离开，两人准备向赌徒阿天（王大陆 饰）和其女友小雨（周也 饰）下手，从他们身上套现、完成业绩……潘生与安娜能否逃过诈骗集团头目陆经理（王传君 饰）和阿才（孙阳 饰）的残暴折磨？面对警察（咏梅 饰）的跨国调查和追捕，他们又会何去何从？",
    "filmType": {
        "name": "2D",
        "value": 1
    },
    "nation": "中国大陆",
    "language": "",
    "videoId": "",
    "premiereAt": 1691712000,
    "timeType": 3,
    "runtime": 130,
    "grade": "7",
    "item": {
        "name": "2D",
        "type": 1
    },
    "isPresale": true,
    "isSale": false
}
</script>
<template>
  <h1>影院列表</h1>
  <FilmItem :film="film"/>
</template>
