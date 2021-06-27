import { IPlant, PLANT_FUEL_TYPE } from '../../model/plant';

export async function fetchPlant(filtered: PLANT_FUEL_TYPE[] = []): Promise<{ data: IPlant[] }> {
  const apiPath = `api/plants`;
  const response = await fetch(apiPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const plants: IPlant[] = (await response.json()) || [];

  if (filtered.length > 0) {
    const filteredPlots = plants.filter((e) => filtered.some((f) => e.fuelName === f));
    const plots = [...(filteredPlots || [])];
    return { data: filteredPlots };
  }

  return { data: plants };
}
