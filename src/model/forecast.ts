export interface IForecast {
  predicted: number;
  timeStamp: string;
}

export enum GENERATED_POWER_STATUS {
  NONE = 'none',
  VALID = 'valid',
  EXPIRED = 'expired',
}
export interface ITotalGeneratedPowers {
  totalSunPowers: number;
  totalWindPowers: number;

  status: GENERATED_POWER_STATUS;
}
