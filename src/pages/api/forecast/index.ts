import axios from 'axios';
import type { NextApiHandler } from 'next';
import { config } from '../../../app/config';
import { IForecast } from '../../../model/forecast';

interface IForecastParams {
  type: 'D' | 'M' | 'Y';
  day: string;
  plant: string;
  dayEnd: string;
}

async function fetchData({ type, day, plant, dayEnd }: IForecastParams): Promise<IForecast[]> {
  const { egat } = config;
  const apiPath = `${egat.forecast.url}/forecast`;
  const params = {
    f_type: type,
    f_day: day,
    f_plant: plant,
    f_day_end: dayEnd,
  };

  console.log('[server-call][forecast] - API ', params);

  const response = await axios(apiPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  }).catch((err) => {
    console.log('[server-call][forecast] - ERROR ', err.message);
    return { data: [] };
  });
  const data: IForecast[] = (response.data && response.data.dataList) || [];

  console.log('[server-call][forecast] - API', data);
  return data;
}

const plantHandler: NextApiHandler = async (request, response) => {
  const { type, day, plant, dayEnd }: any = request.query;
  response.json(await fetchData({ type, day, plant, dayEnd }));
};

export default plantHandler;
