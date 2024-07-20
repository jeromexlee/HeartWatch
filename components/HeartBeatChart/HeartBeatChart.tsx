import { LineChart } from '@mantine/charts';
import { heartBeatData } from './HeartBeatChartData';
import { Group } from '@mantine/core';


export function HeartBeatChart() {
  return (
    <>
        <Group justify="center" mt="xl">
            <LineChart
                id='chart'
                h={400}
                w={1100}
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
