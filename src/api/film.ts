/**
 * 获取电影列表
 */

import { httpGet } from "@/utils/request";

/**
 * 获取全量电影列表
 */
export function getFilmList(params: any) {
  return httpGet<API.IFilmListResp>("mall.film-ticket.film.list", params);
}

/**
 * 获取目标电影详情
 * mall.film-ticket.film.info
 */
export function getFilmDetail(params: any) {
  return httpGet<API.IFilmDetailResp>("mall.film-ticket.film.info", params);
}

