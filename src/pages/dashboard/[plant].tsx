import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';
import { Calendar } from 'primereact/calendar';

import { DateTime } from 'luxon';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectForecast, getForecastAsync } from '../../features/forecast/forecastSlice';
import { selectPlants } from '../../features/plant/plantSlice';

import styles from './dashboard.module.css';

const initCharData = {
  labels: [],
  datasets: [
    {
      label: 'Energy Forecast (kW)',
      data: [],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.4,
    },
  ],
};

const initChartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '#ebedef',
      },
    },
    y: {
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '#ebedef',
      },
    },
  },
};

const DashboardPage: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [dateFrom, setDateFrom] = useState<Date | Date[] | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | Date[] | undefined>(undefined);
  const [disableDateTo, setDisableDateTo] = useState(true);
  const [minDate, setMinDate] = useState<Date | undefined>(undefined);

  const [dayData, setDayData] = useState<any>(initCharData);
  const [monthData, setMonthData] = useState<any>(initCharData);
  const [yearData, setYearData] = useState<any>(initCharData);

  const router = useRouter();
  const useQuery = () => router.query;
  const { plant } = useQuery();

  const dispatch = useAppDispatch();
  const forecast = useAppSelector(selectForecast);
  const selectPlant = useAppSelector(selectPlants);

  useEffect(() => {
    if (plant) {
      changeParamForecast();
    }

    return () => {};
  }, [activeIndex, dateFrom, dateTo, selectPlant.selected]);

  useEffect(() => {
    setChartData();

    return () => {};
  }, [forecast]);

  const setChartData = () => {
    const updatedData = {
      labels: getTimestamps(),
      datasets: [
        {
          label: 'Energy Forecast (kW)',
          data: getForecastData('predicted'),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.5,
        },
        {
          label: 'Error',
          data: getForecastData('diff'),
          fill: true,
          borderColor: '#ff5638',
          borderDash: [5, 5],
          backgroundColor: 'rgba(255, 86, 56, 0.4)',
          tension: 0.5,
        },
        {
          label: 'Actual',
          data: getForecastData('value'),
          fill: true,
          borderColor: '#ffd271',
          borderDash: [5, 5],
          backgroundColor: 'rgba(255, 192, 56, 0.3)',
          tension: 0.5,
        },
      ],
    };

    const type = getCurrentType();
    if (type === 'D') {
      setDayData(updatedData);
    } else if (type === 'M') {
      setMonthData(updatedData);
    } else {
      setYearData(updatedData);
    }
  };

  const changeParamForecast = () => {
    const type = getCurrentType();

    const startDate = dateFrom as Date;
    const endDate = dateTo as Date;

    const day = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : '';
    const dayEnd = endDate ? `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}` : '';
    const params = { type, day, plant, dayEnd };

    dispatch(getForecastAsync(params));
  };

  const changeDateFromHandler = (event: any) => {
    setDateFrom(event.value);
    setDisableDateTo(!event.value);
    setMinDate(event.value);

    if (!event.value) {
      setDateTo(undefined);
    } else {
      const startDate = event.value as Date;
      const endDate = dateTo as Date;

      if (startDate && endDate) {
        console.log('Date Diff: ', endDate.getTime() - startDate.getTime());
        if (endDate.getTime() - startDate.getTime() <= 0) {
          setDateTo(event.value);
        }
      }
    }
  };

  const changeDateToHandler = (event: any) => {
    setDateTo(event.value);
  };

  const getCurrentType = () => {
    let type = 'D';
    if (activeIndex === 1) type = 'M';
    else if (activeIndex === 2) type = 'Y';
    return type;
  };

  const getForecastData = (type: string) => {
    const result = (forecast.data || []).map((f: any) => f[type]);
    return result;
  };

  const getTimestamps = () => {
    const type = getCurrentType();

    const result = (forecast.data || []).map((f) => {
      const date = DateTime.fromISO(f.timeStamp, { zone: 'Asian/Bangkok', setZone: true });
      if (date.isValid) {
        if (type === 'D') {
          return date.toFormat('LLL d, HH:mm');
        } else if (type === 'M') {
          return date.toFormat('LLL-dd');
        } else {
          return date.toFormat('LLL');
        }
      }
      return '';
    });
    return result;
  };

  return (
    <div className={styles.container}>
      <div className="p-grid p-justify-center">
        <div className="p-col-12 p-sm-12 p-md-11 p-lg-10">
          <div className="p-grid p-fluid p-justify-between">
            <div className="p-col-3 p-sm-2 p-pt-5 p-mx-auto p-mx-sm-0">
              <h4 style={{ color: '#42a5f5', fontWeight: 'bolder' }}>{plant}</h4>
            </div>
            <div className="p-col-11 p-sm-7 p-md-6 p-lg-5 p-xl-4">
              <div className="p-grid ">
                <div className="p-col-6">
                  <label htmlFor="dateFrom">วันที่เริ่มต้น</label>
                  <Calendar
                    id="dateFrom"
                    value={dateFrom}
                    onChange={changeDateFromHandler}
                    showIcon={true}
                    className={styles.calendar}
                    dateFormat="dd/mm/yy"
                  />
                </div>
                <div className="p-col-6">
                  <label htmlFor="dateTo">วันที่สิ้นสุด</label>
                  <Calendar
                    id="dateTo"
                    value={dateTo}
                    onChange={changeDateToHandler}
                    showIcon={true}
                    className={styles.calendar}
                    dateFormat="dd/mm/yy"
                    minDate={minDate}
                    disabled={disableDateTo}
                  />
                </div>
              </div>
            </div>
            <div className="p-col-1 "></div>
          </div>
        </div>
        <div className="p-col-12 p-sm-12 p-md-11 p-lg-10">
          <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Day">
              <div className="card">
                <h5>Basic</h5>
                <Chart type="line" data={dayData} options={initChartOptions} style={{ height: '50vh' }} />
              </div>
            </TabPanel>
            <TabPanel header="Month">
              <div className="card">
                <h5>Multi Axis</h5>
                <Chart type="line" data={monthData} options={initChartOptions} style={{ height: '50vh' }} />
              </div>
            </TabPanel>
            <TabPanel header="Year">
              <div className="card">
                <h5>Multi Axis</h5>
                <Chart type="line" data={yearData} options={initChartOptions} style={{ height: '50vh' }} />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
