import { IForecast } from '../../model/forecast';

export async function fetchData({ type, day, plant }: any): Promise<{ data: IForecast[] }> {
  const apiPath = `/api/forecast`;
  let query = '?time=' + Date.now();

  query += type ? '&type=' + type : '';
  query += day ? '&day=' + day : '';
  if (plant !== 'overall') {
    query += plant ? '&plant=' + plant : '';
  }

  const response = await fetch(apiPath + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: IForecast[] = (await response.json()) || [];

  return { data };
}
