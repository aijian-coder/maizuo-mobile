import { httpGet } from "@/utils/request";

/**
 * 获取影院列表
 * mall.film-ticket.cinema.list
 */
export function getCinemaList(parms: { cityId: number; type: 1 | 2 }) {
  return httpGet<API.ICinemaResp>("mall.film-ticket.cinema.list", parms);
}

/**
 * 获取目标影院放映电影列表
 * mall.film-ticket.film.cinema-show-film
 */
export function getCurCinemaFilmList(params: { cinemaId: string }) {
  return httpGet<API.ICurCinemaFilmListResp>(
    "mall.film-ticket.film.cinema-show-film",
    params
  );
}

/**
 * 获取影院详情
 * mall.film-ticket.cinema.info
 */
export function getCinemaInfo(params: { cinemaId: string }) {
  return httpGet<API.ICinemaInfoResp>("mall.film-ticket.cinema.info", params);
}

/**
 * 获取影院当前排期
  filmId: 6464
  cinemaId: 6269
  date: 1693497600
 * mall.film-ticket.schedule.list
 */
export function getSchedules(params: {
  cinemaId: string;
  filmId: string;
  date: string;
}) {
  return httpGet<API.ICinemaSchedulesResp>(
    "mall.film-ticket.schedule.list",
    params
  );
}
