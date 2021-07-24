export enum PLANT_FUEL_TYPE {
  WIND = 'ลม',
  HYDRO = 'น้ำ',
  SOLAR = 'แสงอาทิตย์',
  NATURAL_GAS = 'ก๊าซธรรมชาติ',
  COAL = 'ถ่านหิน',
  BIOMASS = 'ชีวมวล',
  BIOGAS = 'ก๊าซชีวภาพ',
}
export interface IPlant {
  ppInitial: string;
  ppThaiName: string;
  provinceName: string;
  ppLatitude: string;
  ppLongtitude: string;
  fuelName: string;
  ppaPowerInstall: number;
  ppaPowerContracted: number;
  codDate: string;
}
