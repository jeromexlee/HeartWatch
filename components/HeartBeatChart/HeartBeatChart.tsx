import React, { useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { HeartBeatContext } from '../MainPage/HeartBeatContext';

export const HeartBeatChart: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const { heartBeatData, fetchHeartBeatData, setIsLiveData } = useContext(HeartBeatContext)!;

  const maxYValue = Math.max(...heartBeatData.map(d => d.BPM));

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setDateRange(range);
    if (range[0] && range[1]) {
      const startEpoch = Math.floor(range[0].getTime() / 1000);
      const endEpoch = Math.floor(range[1].getTime() / 1000);
      setIsLiveData(false); // Turn off real-time fetching
      fetchHeartBeatData(startEpoch, endEpoch);
    }
  };

  return (
    <>
      <DatePickerInput
        clearable
        type="range"
        label="Pick dates range"
        placeholder="Pick dates range"
        value={dateRange}
        onChange={handleDateRangeChange}
        w={300}
      />
      <Group justify="center" mt="xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={heartBeatData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: 'Timestamp', position: 'insideBottomRight', offset: -5 }} />
            <YAxis domain={[0, maxYValue + 10]} label={{ value: 'BPM', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {/* <Legend /> */}
            <Line type="monotone" dataKey="BPM" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Group>
    </>
  );
};
