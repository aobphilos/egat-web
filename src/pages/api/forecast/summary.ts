import type { NextApiHandler } from 'next';
import { config } from '../../../app/config';

import { GENERATED_POWER_STATUS, ITotalGeneratedPowers, IGeneratedPowers } from '../../../model/forecast';
import { fetchData } from '.';

import { DateTime } from 'luxon';
import { Promise } from 'bluebird';

let generatedPowers: IGeneratedPowers = {
  sunPowers: new Map<string, number>(),
  windPowers: new Map<string, number>(),
};

let totalGeneratedPowers: ITotalGeneratedPowers = {
  totalSunPowers: 0,
  totalWindPowers: 0,
  status: GENERATED_POWER_STATUS.NONE,
};

export async function summaryPowers(sunList: string[] = [], windList: string[] = []) {
  if (totalGeneratedPowers.status !== GENERATED_POWER_STATUS.VALID) {
    console.log('[server-call][forecast][generate-power]: ', 'sun -', sunList.length, 'wind -', windList.length);
    const { egat } = config;
    const options = {
      type: 'D',
      day: DateTime.utc().setZone('Asia/Bangkok').toFormat('yyyy-LL-dd'),
    };

    const sunBlankList: string[] = [];
    const windBlankList: string[] = [];

    const getPower = async (plant: string, blankList: string[], generateItem: Map<string, number>) => {
      const params: any = { ...options, plant };
      const data = await fetchData(params);

      if (data.dataList.length === 0) {
        blankList.push(plant);
      }
      const powers = data.dataList.map((e) => e.predicted).reduce((k, v) => k + v, 0);
      generateItem.set(plant, powers);
      return powers;
    };

    const sunPowers = await Promise.map(sunList, (plant) => getPower(plant, sunBlankList, generatedPowers.sunPowers), {
      concurrency: 8,
    });

    const windPowers = await Promise.map(
      windList,
      (plant) => getPower(plant, windBlankList, generatedPowers.windPowers),
      { concurrency: 8 }
    );

    const allSunPowers = sunPowers.reduce((k, v) => k + v, 0);
    const allWindPowers = windPowers.reduce((k, v) => k + v, 0);
    const sunBase = sunList.length - sunBlankList.length;
    const windBase = windList.length - windBlankList.length;
    const totalSunPowers = sunBase > 0 ? allSunPowers / sunBase : 0;
    const totalWindPowers = windBase > 0 ? allWindPowers / windBase : 0;

    console.log('Blank Data (Sun): ', sunBlankList);
    console.log('Blank Data (Wind): ', windBlankList);

    Object.assign(totalGeneratedPowers, { totalSunPowers, totalWindPowers, status: GENERATED_POWER_STATUS.VALID });

    console.log('[server-call][forecast][generate-power]: completed ');

    setTimeout(() => {
      console.log('set expires for total powers data');
      Object.assign(totalGeneratedPowers, { status: GENERATED_POWER_STATUS.EXPIRED });
    }, egat.forecast.totalPowersExpires);
  }
  return { totalGeneratedPowers, generatedPowers };
}

const summaryForecastHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    // Process a POST request
    const { sunList, windList }: any = request.body;
    const result = await summaryPowers(sunList, windList);
    response.json(result);
  } else {
    // Handle any other HTTP method
    response.status(405).send('Method Not Allowed');
  }
};

export default summaryForecastHandler;
