import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPlants, setSelectedPlant, getFilteredPlantAsync } from './plantSlice';
import { IPlant, PLANT_FUEL_TYPE } from '../../model/plant';

import { FaSun, FaWater, FaWind, FaLeaf, FaRecycle, FaSubscript, FaVial } from 'react-icons/fa';

import { escapeRegExp } from '../../app/tools';

function Plant() {
  const dispatch = useAppDispatch();

  const [plantValue, setPlantValue] = useState<string>('');

  const plants = useAppSelector(selectPlants);

  const [filteredPlants, setFilteredPlants] = useState<IPlant[]>(plants.data);

  useEffect(() => {
    if (!plants.data || !Array.isArray(plants.data) || plants.data.length === 0) {
      console.log('---- LOAD PLANT LIST----');
      /**
       * Load Plant Data
       */
      dispatch(getFilteredPlantAsync());
    }

    return () => {};
  }, [0]);

  const getFuelTypeIcon = (name: string | undefined) => {
    let icon = <FaVial />;
    switch (name) {
      case PLANT_FUEL_TYPE.HYDRO:
        icon = <FaWater className="p-mt-1" />;
        break;
      case PLANT_FUEL_TYPE.SOLAR:
        icon = <FaSun className="p-mt-1" />;
        break;
      case PLANT_FUEL_TYPE.WIND:
        icon = <FaWind className="p-mt-1" />;
        break;
      case PLANT_FUEL_TYPE.BIOGAS:
        icon = <FaRecycle className="p-mt-1" />;
        break;
      case PLANT_FUEL_TYPE.NATURAL_GAS:
        icon = <FaLeaf className="p-mt-1" />;
        break;
      case PLANT_FUEL_TYPE.BIOMASS:
        icon = <FaSubscript className="p-mt-1" />;
        break;
      default:
        break;
    }
    return icon;
  };

  const itemTemplate = (item: IPlant) => {
    return (
      <div className="p-d-inline-flex">
        {getFuelTypeIcon(item.fuelName)}
        <div className="p-ml-4 p-mb-1">{`${item.ppInitial} - ${item.ppThaiName}`}</div>
      </div>
    );
  };

  const searchCountry = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredPlants;
      if (!event.query.trim().length) {
        _filteredPlants = [...plants.data];
      } else {
        const keyword = event.query.trim();
        const rexKeyword = new RegExp(escapeRegExp(keyword), 'i');
        _filteredPlants = plants.data.filter((plant) => {
          const { ppInitial, ppThaiName, provinceName, fuelName } = plant;
          return rexKeyword.test(`${ppInitial}-${ppThaiName}-${provinceName}-${fuelName}`);
        });
      }
      setFilteredPlants(_filteredPlants);
    }, 250);
  };

  const router = useRouter();

  const onAutocompleteChange = (event: any) => {
    event.preventDefault();
    setPlantValue(event.value);

    if (typeof event.value === 'object') {
      const { ppInitial = 'overall' } = event.value || {};
      dispatch(setSelectedPlant(ppInitial));
      console.log('redirect: ', ppInitial);
      router.push(`/dashboard/${ppInitial}`);
    }
  };

  return (
    <div>
      <div>
        <AutoComplete
          field="ppInitial"
          disabled={plants.status !== 'idle'}
          value={plantValue}
          suggestions={filteredPlants}
          completeMethod={searchCountry}
          dropdown
          scrollHeight={'226px'}
          forceSelection
          itemTemplate={itemTemplate}
          onChange={onAutocompleteChange}
          placeholder="เลือกโรงงาน"
        />
      </div>
    </div>
  );
}

export default Plant;
