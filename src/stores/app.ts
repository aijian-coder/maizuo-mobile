import { defineStore } from "pinia";

export const useApp = defineStore("app", {
  //options,选项式创建状态数据
  state: () => ({
    msg: "hello",
    token: "123456",
  }),
  getters: {
    //反转函数，返回数据
    reverseMsg(state) {
      return state.msg.split("").reverse().join("");
    },
  },
  actions: {
    changeMsg(payload: string) {
      this.msg = payload;
    },
  },
  // persist:true
  persist: {
    // 可以设置需要缓存的数据，缓存的模式
    paths: ["msg"],
    // storage: localStorage,
    storage: sessionStorage,
  },
});
