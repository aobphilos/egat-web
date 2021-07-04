import { IForecast } from '../../model/forecast';

export async function fetchData({ type, day, plant, dayEnd }: any): Promise<{ data: IForecast[] }> {
  const apiPath = `/api/forecast`;
  let query = '?time=' + Date.now();

  query += type ? '&type=' + type : '';
  query += day ? '&day=' + day : '';
  if (plant !== 'overall') {
    query += plant ? '&plant=' + plant : '';
  }
  query += dayEnd ? '&dayEnd=' + dayEnd : '';

  const result = await fetch(apiPath + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('Fetch Forecast Error: ', error.message);
      return [];
    });

  // console.log('fetch prediction: ', result);
  const data: IForecast[] = result || [];

  return { data };
}
