import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';
import { Calendar } from 'primereact/calendar';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './dashboard.module.css';

const DashboardPage: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentPlant, setCurrentPlant] = useState<any>('overall');

  const router = useRouter();
  const { plant } = router.query;

  const basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#FFA726',
        tension: 0.4,
      },
    ],
  };

  const multiAxisData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y',
        tension: 0.4,
        data: [65, 59, 80, 81, 56, 55, 10],
      },
      {
        label: 'Dataset 2',
        fill: false,
        borderColor: '#00bb7e',
        yAxisID: 'y1',
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };

  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
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

  let multiAxisOptions = {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
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
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#495057',
        },
        grid: {
          drawOnChartArea: false,
          color: '#ebedef',
        },
      },
    },
  };

  const dateTemplate = (date: any) => {
    if (date.day > 10 && date.day < 15) {
      return <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>;
    }

    return date.day;
  };

  const [date1, setDate1] = useState<Date | Date[] | undefined>(undefined);

  return (
    <div className={styles.container}>
      <div className="p-grid p-justify-center">
        <div className="p-col-10 p-fluid">
          <div className="p-field p-col-12 p-md-4" style={{ margin: 0 }}>
            <br />
            <Calendar
              id="datetemplate"
              value={date1}
              onChange={(e) => setDate1(e.value)}
              dateTemplate={dateTemplate}
              showIcon={true}
              className={styles.calendar}
            />
          </div>
        </div>
        <div className="p-col-12 p-sm-12 p-md-10">
          <TabView>
            <TabPanel header="Day">
              <div className="card">
                <h5>Basic</h5>
                <Chart type="line" data={basicData} options={basicOptions} style={{ height: '350px' }} />
              </div>
            </TabPanel>
            <TabPanel header="Month">
              <div className="card">
                <h5>Multi Axis</h5>
                <Chart type="line" data={multiAxisData} options={multiAxisOptions} style={{ height: '350px' }} />
              </div>
            </TabPanel>
            <TabPanel header="Year">
              <div className="card">
                <h5>Multi Axis</h5>
                <Chart type="line" data={multiAxisData} options={multiAxisOptions} style={{ height: '350px' }} />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
