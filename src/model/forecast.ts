export interface IForecast {
  R2: number;
  RMSE: number;
  dataList: IForecastUnit[];
}

export interface IForecastUnit {
  predicted: number;
  timeStamp: string;
  diff: number;
  value: number;
}

export const DefaultForecast: IForecast = { R2: 0, RMSE: 0, dataList: [] };

export enum GENERATED_POWER_STATUS {
  NONE = 'none',
  VALID = 'valid',
  EXPIRED = 'expired',
}

export interface IGeneratedPowers {
  sunPowers: Map<string, number>;
  windPowers: Map<string, number>;
}
export interface ITotalGeneratedPowers {
  totalSunPowers: number;
  totalWindPowers: number;
  status: GENERATED_POWER_STATUS;
}
