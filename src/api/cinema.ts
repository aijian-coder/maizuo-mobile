import { httpGet } from "@/utils/request";

/**
 * 获取影院列表
 * mall.film-ticket.cinema.list
 */
export function getCinemaList(parms: any) {
  return httpGet<API.ICinemaResp>("mall.film-ticket.cinema.list", parms);
}