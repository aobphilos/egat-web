import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

import ReactMapboxGl, { Popup, Marker } from 'react-mapbox-gl';
import { Point } from 'mapbox-gl';

import { PLANT_FUEL_TYPE } from '../../model/plant';
import { config } from '../../app/config';
import classNames from 'classnames';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaSun, FaWater, FaWind, FaLeaf, FaRecycle, FaSubscript, FaVial } from 'react-icons/fa';
import styles from './location.module.css';
import { getCurrentPlants } from '../api/plants';

const LocationPage: NextPage = ({ token, plots }: any) => {
  const defaultProps: any = {
    center: [100.5951717, 14.9965211],
    zoom: [8],
  };

  // const [popupVisible, setPopupVisible] = useState(false);
  // const [popupLocation, setPopupLocation] = useState([0, 0]);
  let popupLocation = [0, 0];
  let popupVisible = false;

  const onMarkerClick: any = (event: any, location: any) => {
    console.log('open popup');
    // setPopupLocation(location);
    // setPopupVisible(true);
    popupLocation = location;
    popupVisible = true;
  };

  const onMapClick: any = (map: any, event: any) => {
    console.log('close popup');
    popupVisible = false;
  };

  const MapBox = ReactMapboxGl({
    accessToken: token,
  });

  const iconStyle = classNames(styles.icon, { 'p-mt-1': true });

  return (
    <div>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <MapBox
        style="mapbox://styles/mapbox/streets-v8"
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onClick={onMapClick}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}>
        <div>
          <div style={{ display: popupVisible ? 'inline' : 'none' }}>
            <Popup
              coordinates={popupLocation}
              offset={new Point(0, -57)}
              anchor="center"
              className={styles.popup}
              style={{ zIndex: 1000 }}>
              <h2>{'Title'}</h2>
              <span>{'prod name'}</span>
              <div className={styles.link}>
                <a href="#">&gt;&gt; View Dashboard &lt;&lt;</a>
              </div>
            </Popup>
          </div>
          {plots.map((plot: number[], idx: number) => {
            return (
              <Marker
                coordinates={plot}
                anchor="bottom"
                onClick={(e) => onMarkerClick(e, plot)}
                tabIndex={idx + 1}
                key={`marker_${idx}`}>
                <div className="flex">
                  <FaWind className={iconStyle} />
                  <img src={'/marker-editor.svg'} width={50} />
                </div>
              </Marker>
            );
          })}
        </div>
      </MapBox>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const plants = await getCurrentPlants();
  const filteredPlots = plants
    .filter((e) => e.fuelName === PLANT_FUEL_TYPE.WIND || e.fuelName === PLANT_FUEL_TYPE.SOLAR)
    .map((e) => [Number(e.ppLongtitude), Number(e.ppLatitude)]);
  const plots = [...(filteredPlots || [])];

  return {
    props: {
      token: config.mapbox.apiKey,
      plots: plots,
    }, // will be passed to the page component as props
  };
}

export default LocationPage;
