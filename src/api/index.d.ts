/**
 * 该文件用于声明接口返回值相关的类型
 */

declare namespace API {
  // 城市对象类型
  export interface ICity {
    cityId: number;
    isHot: number;
    name: string;
    pinyin: string;
  }

  // 城市列表接口返回值类型
  export interface ICityListResp {
    cities: ICity[];
  }

  // 演员对象类型
  export interface IActor {
    name: string;
    role: string;
    avatarAddress: string;
  }

  // 电影对象类型
  export interface IFilm {
    actors: IActor[];
    category: string;
    director: string;
    filmId: number;
    filmType: { name: string; value: number };
    item: { name: string; type: number };
    grade: string;
    isPresale: boolean;
    isSale: boolean;
    language: string;
    name: string;
    nation: string;
    poster: string;
    premiereAt: number;
    runtime: number;
    synopsis: string;
    timeType: number;
    videoId: string;
  }

  // 电影列表接口返回值类型
  export interface IFilmListResp {
    films: IFilm[];
    total: number;
  }
}
