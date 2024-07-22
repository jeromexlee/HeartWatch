import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface HeartBeatData {
  date: string;
  BPM: number;
}

interface Alert {
  id: string;
  message: string;
}

interface HeartBeatContextProps {
  heartBeatData: HeartBeatData[];
  alerts: Alert[];
  isLiveData: boolean;
  setIsLiveData: (value: boolean) => void;
  dismissAlert: (id: string) => void;
}

export const HeartBeatContext = createContext<HeartBeatContextProps | undefined>(undefined);

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

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isLiveData) {
      interval = setInterval(() => {
        axios.get<HeartBeatData[]>('https://pwm2udedib.execute-api.us-east-1.amazonaws.com/prod/heartBeatData')
          .then(response => {
            setHeartBeatData(response.data);
          })
          .catch(error => {
            console.error('Error fetching heartBeatData:', error);
          });
      }, 5000); // Adjust the interval time as needed (e.g., 5000ms = 5 seconds)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveData]);

//   useEffect(() => {
//     // const interval = setInterval(() => {
//     //   axios.get<Alert[]>('http://100.28.74.221:5000/read_undismissable_messages')
//     //     .then(response => {
//     //       setAlerts(response.data.slice(0, 3)); // Update to display the latest 3 alerts
//     //     })
//     //     .catch(error => {
//     //       console.error('Error fetching alerts:', error);
//     //     });
//     // }, 10000); // Fetch alerts every 10 seconds

//     const interval = setInterval(() => {
//         console.log("here")
//         setAlerts([{id: "1", message: "alert is here !"}])
//     }, 10000); // Fetch alerts every 10 seconds

//     return () => clearInterval(interval);
//   }, []);
    useEffect(() => {
        const interval = setInterval(() => {
        console.log('Mock fetch alerts');
        setAlerts([
            { id: '1', message: 'Mock Alert 1' },
            { id: '2', message: 'Mock Alert 2' },
            { id: '3', message: 'Mock Alert 3' },
        ]);
        }, 5000); // Mock fetch alerts every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const dismissAlert = async (id: string) => {
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
        <HeartBeatContext.Provider value={{ heartBeatData, alerts, isLiveData, setIsLiveData, dismissAlert }}>
        {children}
        </HeartBeatContext.Provider>
    );
};
