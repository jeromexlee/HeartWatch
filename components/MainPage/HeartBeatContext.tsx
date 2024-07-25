import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface HeartBeatData {
  date: string;
  BPM: number;
}

interface Alert {
  id: string;
  content: string;
}

interface HeartBeatContextProps {
  heartBeatData: HeartBeatData[];
  alerts: Alert[];
  isLiveData: boolean;
  setIsLiveData: (value: boolean) => void;
  dismissAlert: (id: string) => void;
  fetchHeartBeatData: (start: number, end: number) => void;
}

export const HeartBeatContext = createContext<HeartBeatContextProps | undefined>(undefined);

export const convertEpochToDate = (epoch: number): string => {
  const date = new Date(epoch * 1000); // Convert to milliseconds
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const HeartBeatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heartBeatData, setHeartBeatData] = useState<HeartBeatData[]>([
    { date: 'Mar 22', BPM: 80 },
    { date: 'Mar 23', BPM: 81 },
    { date: 'Mar 24', BPM: 120 },
    { date: 'Mar 25', BPM: 100 },
    { date: 'Mar 26', BPM: 91 },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLiveData, setIsLiveData] = useState<boolean>(false);

  const fetchHeartBeatData = (start: number, end: number) => {
    axios.get<{ hr_data: { time: number; data: number }[] }>(`http://100.28.74.221:8002/api/v1/hbs/report?name=test&begin=${start}&end=${end}`)
      .then(response => {
        console.log(response);
        const formattedData = response.data.hr_data.map(d => ({
          date: convertEpochToDate(d.time),
          BPM: d.data,
        }));
        console.log(formattedData);
        setHeartBeatData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching heartBeatData:', error);
      });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isLiveData) {
      interval = setInterval(() => {
        fetchHeartBeatData(0, 1721869663);
      }, 5000); // Adjust the interval time as needed (e.g., 5000ms = 5 seconds)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveData]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Mock fetch alerts');
      axios.get<Alert[]>('http://100.28.74.221:5000/read_undismissable_messages')
        .then(response => {
          setAlerts(response.data.slice(0, 3)); // Update to display the latest 3 alerts
        })
        .catch(error => {
          setAlerts([
            { id: '1', content: 'Mock Alert 1' },
            { id: '2', content: 'Mock Alert 2' },
            { id: '3', content: 'Mock Alert 3' },
          ]);
          console.error('Error fetching alerts:', error);
        });
    }, 10000); // Mock fetch alerts every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = async (id: string) => {
    console.log('Dismiss alert with id:', id); // Debug log
    try {
      await axios.post('http://100.28.74.221:5000/toggle_dismissable', {
        msg_id: id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  return (
    <HeartBeatContext.Provider value={{ heartBeatData, alerts, isLiveData, setIsLiveData, dismissAlert, fetchHeartBeatData }}>
      {children}
    </HeartBeatContext.Provider>
  );
};
