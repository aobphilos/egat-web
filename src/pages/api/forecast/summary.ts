import type { NextApiHandler } from 'next';
import { config } from '../../../app/config';

import { GENERATED_POWER_STATUS, ITotalGeneratedPowers } from '../../../model/forecast';
import { fetchData } from '.';

import { DateTime } from 'luxon';
import { Promise } from 'bluebird';

let totalGeneratedPowers: ITotalGeneratedPowers = {
  totalSunPowers: 0,
  totalWindPowers: 0,

  status: GENERATED_POWER_STATUS.NONE,
};

export async function summaryPowers(sunList: string[] = [], windList: string[] = []) {
  console.log('Call -> ', totalGeneratedPowers.status);

  if (totalGeneratedPowers.status !== GENERATED_POWER_STATUS.VALID) {
    console.log('[server-call][forecast][generate-power]: ', 'sun -', sunList.length, 'wind -', windList.length);
    const { egat } = config;
    const options = {
      type: 'D',
      day: DateTime.utc().setZone('Asia/Bangkok').toFormat('yyyy-LL-dd'),
    };

    const getPower = async (plant: string) => {
      const params: any = { ...options, plant };
      const data = await fetchData(params);
      return data.map((e) => e.predicted).reduce((k, v) => k + v, 0);
    };

    const sunPowers = await Promise.map(sunList, getPower, { concurrency: 8 });
    const windPowers = await Promise.map(windList, getPower, { concurrency: 8 });

    Object.assign(totalGeneratedPowers, {
      totalSunPowers: sunPowers.reduce((k, v) => k + v, 0),
      totalWindPowers: windPowers.reduce((k, v) => k + v, 0),
      status: GENERATED_POWER_STATUS.VALID,
    });

    console.log('[server-call][forecast][generate-power]: completed ');

    setTimeout(() => {
      console.log('set expires for total powers data');
      Object.assign(totalGeneratedPowers, { status: GENERATED_POWER_STATUS.EXPIRED });
    }, egat.forecast.totalPowersExpires);
  }
  return totalGeneratedPowers;
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
