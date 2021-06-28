import axios from 'axios';
import type { NextApiHandler } from 'next';
import { config } from '../../../app/config';
import { IForecast } from '../../../model/forecast';

interface IForecastParams {
  type: 'D' | 'M' | 'Y';
  day: string;
  plant: string;
}

async function fetchData({ type, day, plant }: IForecastParams): Promise<IForecast[]> {
  const { egat } = config;
  const apiPath = `${egat.forecast.url}/forecast`;
  const params = {
    type,
    day,
    plant,
  };

  console.log('[server-call][forecast] - API');

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
  const data: IForecast[] = response.data || [];

  return data;
}

const plantHandler: NextApiHandler = async (request, response) => {
  const { type, day, plant }: any = request.query;
  response.json(await fetchData({ type, day, plant }));
};

export default plantHandler;
