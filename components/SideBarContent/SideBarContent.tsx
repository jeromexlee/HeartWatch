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

  const handleDownload = async () => {
    try {
      // Replace this with your actual API endpoint
      const response = await axios.get('http://100.28.74.221:5000/read_undismissable_messages', {
        params: {
          age: ageValue,
          weight: weightValue,
          height: heightValue,
          liveData: isLiveData,
        }
      });

    //   if (response.data && response.data.url) {
    //     const link = document.createElement('a');
    //     link.href = response.data.url;
    //     link.download = 'file.pdf'; // Adjust the file name and extension as needed
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   } else {
    //     console.error('URL not found in response payload');
    //   }
      console.log("XCXC")
      console.log(response)
    } catch (error) {
        console.log("XCXC: ERROR")
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
