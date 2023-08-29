import { defineStore } from "pinia";
import { getFilmDetail } from "@/api/film";

/**
 * 电影仓库
 */
export const useFilmStore = defineStore("film", {
  state: () => ({
    film: null as API.IFilm | null,
  }),
  getters: {},
  actions: {
    /**
     * 获取电影详情
     */
    getFilm(params: any) {
      getFilmDetail(params).then((resp) => {
        this.film = resp.film;
      });
    },
  },
  persist: {
    paths: ["film"],
  },
});
