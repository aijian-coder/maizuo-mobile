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

  //电影详情接口返回值类型
  export interface IFilmDetailResp {
    film: IFilm;
  }

  //影院列表值对象类型
  export interface Cinema {
    cinemaId: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    gpsAddress: string;
    cityId: number;
    cityName: string;
    districtId: number;
    districtName: string;
    district: District;
    phone: string;
    telephones: string[];
    logoUrl: string;
    businessTime: string;
    notice: string;
    isVisited: number;
    lowPrice: number;
    distance: number;
    eTicketFlag: number;
    seatFlag: number;
    ticketTypes?: any;
  }

  //影院区县位置对象类型
  export interface District {
    districtId: number;
    name: string;
  }

  //影院列表返回值类型
  export interface ICinemaResp {
    cinemas: Cinema[];
  }

  // 当前影院上线电影列表接口返回值类型
  export interface ICurCinemaFilmListResp {
    films: IFilm[];
  }

  //影院服务支持
  export interface Service {
    name: string;
    description: string;
  }

  //影院详情info
  export interface CinemaInfo {
    cinemaId: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    gpsAddress: string;
    cityId: number;
    cityName: string;
    districtId: number;
    districtName: string;
    district: District;
    phone: string;
    telephones: string[];
    logoUrl: string;
    businessTime: string;
    notice: string;
    isVisited: number;
    services: Service[];
    lowPrice: number;
    distance: number;
    eTicketFlag: number;
    seatFlag: number;
    ticketTypes?: any;
  }

  //影院详情接口返回值类型
  export interface ICinemaInfoResp {
    cinema: CinemaInfo;
  }

  //影院当前电影放映列表返回值
  export interface ICinemaFilmsResp {
    films: API.IFilm[];
  }

  //电影排期列表对象类型
  export interface ISchedule {
    advanceStopMins: number;
    endAt: number;
    filmLanguage: string;
    hallName: string;
    imagery: string;
    isOnsell: boolean;
    marketPrice: number;
    maxSalePrice: number;
    minSalePrice: number;
    salePrice: number;
    scheduleId: number;
    showAt: number;
  }

  //影院当前电影排期列表返回值
  export interface ICinemaSchedulesResp {
    schedules: API.ISchedule[];
  }
}
