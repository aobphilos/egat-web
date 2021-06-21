import { IPlant } from '../../model/plant';

export async function fetchPlant(): Promise<{ data: IPlant[] }> {
  const apiPath = `api/plants`;
  const response = await fetch(apiPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const plants: IPlant[] = (await response.json()) || [];

  return { data: plants };
}
