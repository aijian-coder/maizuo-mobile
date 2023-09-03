import { getCinemaInfo, getCinemaList } from "@/api/cinema";
import { defineStore } from "pinia";

/**
 * 影院仓库
 */

export const useCinemaStore = defineStore("cinema", {
  state: () => ({
    cinemas: null as API.Cinema[] | null,
    cinemaInfo: null as API.CinemaInfo | null,
    searchKey: "",
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
     * 设置当前影院
     */
    setCurCinema(val: API.CinemaInfo) {
      this.cinemaInfo = val;
    },

    /**
     * 
     */
  },

  // persist: {
  //   paths: ["cinemas", "cinemaInfo"],
  // },
});
