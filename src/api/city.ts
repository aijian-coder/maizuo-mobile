import { httpGet } from "@/utils/request";

/**
 * 获取城市列表
 * mall.film-ticket.city.list
 */
export function getCityList(){
  return httpGet<API.ICityListResp>("mall.film-ticket.city.list") 
}