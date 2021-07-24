import { NextPage } from 'next';

import React, { useState } from 'react';

import { FaSun, FaWind } from 'react-icons/fa';

import { InputNumber } from 'primereact/inputnumber';

import { DateTime } from 'luxon';

import { summaryPowers } from '../api/forecast/summary';
import { getCurrentPlants } from '../api/plants';

import { config } from '../../app/config';

import styles from './overview.module.css';
import { ITotalGeneratedPowers } from '../../model/forecast';
import { PLANT_FUEL_TYPE } from '../../model/plant';

import ReactWeather, { useWeatherBit } from 'react-open-weather';

interface IOverviewParams {
  apiKey: string;
  summary: ITotalGeneratedPowers;
}

const OverviewPage: NextPage<IOverviewParams> = ({ apiKey, summary }) => {
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: apiKey,
    lat: '14.9965211',
    lon: '100.5951717',
    lang: 'th',
    unit: 'M',
  });

  const useDate = () => DateTime.utc().setZone('Asia/Bangkok').setLocale('th-TH').toLocaleString(DateTime.DATE_FULL);

  return (
    <div className={styles.container}>
      <div className="p-grid p-justify-center">
        <div className="p-col-12 p-sm-12 p-md-11 p-lg-10">
          <div className="p-grid p-justify-center">
            <div className="p-field">
              <h5>วันที่ {useDate()}</h5>
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-12 p-md-11 p-lg-10 p-mb-4">
          <div className="p-grid p-align-center">
            <div className="p-col-2">
              <FaSun className={styles.icon_sun} />
            </div>
            <div className="p-col-10 p-sm-5">
              <span className={styles.label_power}>ปริมาณการผลิตพลังงานไฟฟ้าจากแสงอาทิตย์</span>
            </div>
            <div className="p-col-12 p-sm-5 p-justify-end">
              <div className="p-grid ">
                <div className="p-col-8 p-sm-9 p-lg-6 p-xl-5" style={{ textAlign: 'right' }}>
                  <InputNumber
                    value={summary.totalSunPowers}
                    readOnly={true}
                    mode="decimal"
                    minFractionDigits={4}
                    maxFractionDigits={4}
                    className={styles.power}
                  />
                </div>
                <div className="p-col-3">
                  <span className={styles.label_power}>kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-12 p-md-11 p-lg-10 p-mb-4">
          <div className="p-grid p-align-center">
            <div className="p-col-2">
              <FaWind className={styles.icon_wind} />
            </div>
            <div className="p-col-10 p-sm-5">
              <span className={styles.label_power}>ปริมาณการผลิตพลังงานไฟฟ้าจากลม</span>
            </div>
            <div className="p-col-12 p-sm-5 ">
              <div className="p-grid ">
                <div className="p-col-8 p-sm-9 p-lg-6 p-xl-5" style={{ textAlign: 'right' }}>
                  <InputNumber
                    value={summary.totalWindPowers}
                    readOnly={true}
                    mode="decimal"
                    minFractionDigits={4}
                    maxFractionDigits={4}
                    className={styles.power}
                  />
                </div>
                <div className="p-col-3">
                  <span className={styles.label_power}>kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-col-12 p-sm-12 p-md-11 p-lg-10 p-mt-2">
          <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="th"
            locationLabel="พยากรณ์อากาศ"
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const plants = await getCurrentPlants();
  const sunList = plants.filter((p) => p.fuelName === PLANT_FUEL_TYPE.SOLAR).map((p) => p.ppInitial);
  const windList = plants.filter((p) => p.fuelName === PLANT_FUEL_TYPE.WIND).map((p) => p.ppInitial);
  const result = await summaryPowers(sunList, windList);

  return {
    props: {
      apiKey: config.weather.apiKey,
      summary: result,
    }, // will be passed to the page component as props
  };
}

export default OverviewPage;
