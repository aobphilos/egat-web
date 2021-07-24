import axios from 'axios';
import type { NextApiHandler } from 'next';
import { config } from '../../../app/config';
import { IPlant } from '../../../model/plant';

const currentPlants = new Array<IPlant>();

async function fetchToken(): Promise<string> {
  const { egat } = config;
  const apiPath = `${egat.ppa.url}/auth/gettoken`;
  const data = { username: egat.ppa.username, password: egat.ppa.password };

  console.log('[server-call][plants] - Token API');

  const response = await axios(apiPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  const { tokenString } = response.data || { tokenString: '' };

  return tokenString || '';
}

async function fetchPlant(token: string): Promise<IPlant[]> {
  const { egat } = config;
  const apiPath = `${egat.ppa.url}/plant`;

  console.log('[server-call][plants] - Plans API', token);

  const response = await axios(apiPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  const plants: IPlant[] = response.data || [];

  return plants;
}

export async function getCurrentPlants() {
  console.log('currentPlants: ', currentPlants.length);
  if (currentPlants.length === 0) {
    const { egat } = config;
    const token = await fetchToken();
    const plants = await fetchPlant(token);
    currentPlants.splice(0, currentPlants.length, ...plants);
    setTimeout(() => {
      console.log('clear plants data');
      currentPlants.splice(0);
    }, egat.ppa.tokenExpires);
  }
  return currentPlants;
}

const plantHandler: NextApiHandler = async (request, response) => {
  response.json(await getCurrentPlants());
};

export default plantHandler;
