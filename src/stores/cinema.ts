import {
  getCinemaInfo,
  getCinemaList,
  getCurCinemaFilmList,
  getSchedules,
} from "@/api/cinema";
import { defineStore } from "pinia";

/**
 * 影院仓库
 */

export const useCinemaStore = defineStore("cinema", {
  state: () => ({
    searchKey: "",
    cinemas: null as API.Cinema[] | null,
    cinemaInfo: null as API.CinemaInfo | null,
    cinemaFilms: null as API.IFilm[] | null,
    cinemaSchedule: null as API.ISchedule[] | null,
  }),
  getters: {
    searchCinemaList: (state) => {
      if (!state.searchKey) return;
      return state.cinemas?.filter((cinema) =>
        cinema.name.includes(state.searchKey)
      );
    },
  },
  actions: {
    /**
     * 设置searchKey
     */
    setSearchKey(val: any) {
      this.searchKey = val;
    },

    /**
     * 获取影院列表
     */
    getCinemas(parms: { cityId: number; type: 1 | 2 }) {
      getCinemaList(parms).then((resp) => {
        this.cinemas = resp.cinemas;
      });
    },

    /**
     * 获取影院信息
     */
    getCinemaInfo(params: { cinemaId: string }) {
      getCinemaInfo(params).then((resp) => {
        this.cinemaInfo = resp.cinema;
      });
    },

    /**
     * 获取影院电影列表
     */
    getCinemaFlimsList(params: { cinemaId: string }) {
      getCurCinemaFilmList(params).then((resp) => {
        this.cinemaFilms = resp.films;
      });
    },

    /**
     * 获取影院电影排期
     */
    getCinemaScheduleList(params: {
      cinemaId: number;
      filmId: number;
      date: number;
    }) {
      getSchedules(params).then((resp) => {
        this.cinemaSchedule = resp.schedules;
      });
    },

    /**
     *
     */

    setCurCinema(val: API.CinemaInfo) {
      this.cinemaInfo = val;
    },

    /**
     * 清除仓库
     */
    clearInfo() {
      this.cinemaFilms = null;
      this.cinemaInfo = null;
      this.cinemaSchedule = null;
    },
  },

  // persist: {
  //   paths: ["cinemas", "cinemaInfo"],
  // },
});
