import Image from 'next/image'
import { Inter } from 'next/font/google'
import {Header} from '../components/ui/header';
import {SectionHeader} from '../components/ui/SectionHeader'
// import { Grid, Col, Card, Text, Metric, TextInput } from '@tremor/react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Textarea from '@mui/joy/Textarea';
import Divider from '@mui/joy/Divider';
import React, { useState, useCallback } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [inputPrompt, setInputPrompt] = useState('');

  const handleSubmit = async (event: { preventDefault:() => void }) => {

  }

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputPrompt(event.target.value);
    },
    []
  );



  return (
    <div>
      
      <Grid container spacing={2} columns = {{ xs: 1, md: 1, lg: 2, xl: 2 }} className="px-8 pt-4">
        <Grid item xs={1} md={1} lg={1} xl={1} className="px-8 space-y-4">

        <Tabs defaultValue={0}>
      <TabList>
        <Tab value={0}>Prompt to Chart</Tab>
        <Tab value={1} disabled>Table to Chart</Tab>
        <Tab value={2} disabled>Chart to Table</Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 2 }}>
      <form id="chart-generation" onSubmit={handleSubmit} className="space-y-4">
          <SectionHeader stepNumber={1} headerTitle={"Enter a prompt to visualize your data"}/>
            <Textarea minRows={5} maxRows={5} placeholder="Type anything…" value={inputPrompt} required autoFocus onChange={handleInputChange} />
            <Divider />
            <SectionHeader stepNumber={2} headerTitle={"Upload custom data sources (Optional)"}/>
            <Divider />
            <SectionHeader stepNumber={3} headerTitle={"Customize your Chart"}/>
      </form>
      </TabPanel>
      <TabPanel value={1} sx={{ p: 2 }}>
        <b>Coming Soon!</b>
      </TabPanel>
      <TabPanel value={2} sx={{ p: 2 }}>
        <b>Coming Soon!</b>
      </TabPanel>
    </Tabs>
        </Grid>
        <Grid item xs={1} md={1} lg={1} xl={1}>
          <div className="pattern-cross pattern-blue-500 pattern-bg-white pattern-size-6 pattern-opacity-20 w-full h-full ">Test
          </div>
        </Grid>

      </Grid>


    </div>
    
  )
}
