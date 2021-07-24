import axios from 'axios';
import type { NextApiHandler } from 'next';
import { config } from '../../../app/config';
import { IForecast, DefaultForecast } from '../../../model/forecast';

interface IForecastParams {
  type: 'D' | 'M' | 'Y';
  day: string;
  plant: string;
  dayEnd: string;
}

export async function fetchData({ type, day, plant, dayEnd }: IForecastParams): Promise<IForecast> {
  const { egat } = config;
  const apiPath = `${egat.forecast.url}/forecast`;
  const params = {
    f_type: type,
    f_day: day,
    f_plant: plant,
    f_day_end: dayEnd,
  };

  const response = await axios(apiPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  }).catch((err) => {
    console.log('[server-call][forecast] - ERROR ', err.message);
    return { data: DefaultForecast };
  });

  if (response.data.status !== 200) {
    return DefaultForecast;
  }

  const data: IForecast = response.data || DefaultForecast;

  return data;
}

const forecastHandler: NextApiHandler = async (request, response) => {
  const { type, day, plant, dayEnd }: any = request.query;
  response.json(await fetchData({ type, day, plant, dayEnd }));
};

export default forecastHandler;
