import type { NextPage } from 'next';

import { useAppSelector } from '../app/hooks';
import { selectPlants } from '../features/plant/plantSlice';

const IndexPage: NextPage = () => {
  const plants = useAppSelector(selectPlants);
  return (
    <div>
      <h3>{JSON.stringify(plants.selected, null, 2)}</h3>
    </div>
  );
};

export default IndexPage;
