/**
 * 获取电影列表
 */

import { httpGet } from "@/utils/request";


/**
 * 获取电影列表
 */
export function getFilmList(params:any){
    return httpGet<API.IFilmListResp>("mall.film-ticket.film.list",params)
}
