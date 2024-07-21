import { LineChart } from '@mantine/charts';
import { heartBeatData } from './HeartBeatChartData';
import { Group } from '@mantine/core';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

export function HeartBeatChart() {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]); 
    return (
        <>
            <DatePickerInput
                clearable
                type="range"
                label="Pick dates range"
                placeholder="Pick dates range"
                value={dateRange}
                onChange={setDateRange}
                w={300}
            />
            <Group justify="center" mt="xl">
                <LineChart
                    id='chart'
                    h={400}
                    w={2000}
                    data={heartBeatData}
                    dataKey="date"
                    series={[
                        { name: 'Apples', color: 'indigo.6' },
                    ]}
                    xAxisLabel='Timestamp'
                    yAxisLabel='BPM'
                    curveType="natural"
                />
            </Group>
        </>
    );
}
