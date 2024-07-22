import { useDisclosure } from '@mantine/hooks';
import { NumberInput } from '@mantine/core';
import { useState } from 'react';
import { Button, Switch } from '@mantine/core';
import { IconDownload, IconActivityHeartbeat } from '@tabler/icons-react';
import axios from 'axios';



export function SideBardContent() {
  const [opened] = useDisclosure();
  const [ageValue, setAgeValue] = useState<string | number>('');
  const [weightValue, setWeightValue] = useState<string | number>('');
  const [heightValue, setHeightValue] = useState<string | number>('');
  const [isLiveData, { toggle }] = useDisclosure();

    const getFormattedTime = () => {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${month}/${day}/${year}_${hours}${minutes}${seconds}`;
    };

  const handleDownload = async () => {
    try {
      const response = await axios.get('https://pwm2udedib.execute-api.us-east-1.amazonaws.com/prod/downloadReport', {
        params: {
            report_name: "Alice_Brown.csv",
        },
        responseType: 'blob' // Important for file downloads
      });

      

      if (response.status === 200) {
        const formattedTime = getFormattedTime();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Health_data_${formattedTime}.csv`); // Adjust the file name and extension as needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Error: Unable to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  return (
    <>
        <NumberInput label="Age" placeholder="Please enter your age" hideControls value={ageValue} onChange={setAgeValue}/>
        <NumberInput label="Weight" placeholder="Please enter your weight" hideControls value={weightValue} onChange={setWeightValue}/>
        <NumberInput label="Height" placeholder="Please enter your height" hideControls value={heightValue} onChange={setHeightValue}/>
        <p></p>
        <Button variant="filled" onClick={() => console.log("Clicked")}>Update</Button>
        <Switch checked={isLiveData} onChange={toggle} label="If fetch real time heartbeat?" mt="md" />
        <p></p>
        <Button rightSection={<IconDownload size={14} />} onClick={handleDownload}>Download</Button>
    </>
  );
}
