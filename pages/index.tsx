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
import Switch from '@mui/joy/Switch';
import Chip from '@mui/material/Chip';
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [inputPrompt, setInputPrompt] = useState('');
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (event: { preventDefault:() => void }) => {

  }

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputPrompt(event.target.value);
    },
    []
  );


  console.log(session);
  return (
    <div>
      
      <Grid container spacing={2} columns = {{ xs: 1, md: 1, lg: 2, xl: 2 }} className="pt-4 px-4">
        <Grid item xs={1} md={1} lg={1} xl={1} className="space-y-4 px-4">

          <Tabs size="md" defaultValue={0}>
          <TabList>
            <Tab value={0}>Prompt</Tab>
            <Tab value={1} disabled>Table</Tab>
            <Tab value={2} disabled>Image</Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 2 }} className="">
            <form id="chart-generation" onSubmit={handleSubmit} className="space-y-4">
              <SectionHeader stepNumber={1} headerTitle={"Enter a prompt to visualize your data"}/>
              <Textarea minRows={5} maxRows={5} placeholder="Type anything…" value={inputPrompt} required autoFocus onChange={handleInputChange} />
              <Divider />
              <Grid container columns={3}>
                <Grid item xs={2}>
                  <SectionHeader stepNumber={2} headerTitle={"Upload custom data sources (Optional)"}/>
                </Grid>
                <Grid item xs={1} className="flex items-end justify-end">
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                  />
                </Grid>
              </Grid>
              <Divider />
              <SectionHeader stepNumber={3} headerTitle={"Customize your Chart"}/>
            </form>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-0 right-0">
              Generate
            </button>
          </TabPanel>
          <TabPanel value={1} sx={{ p: 2 }}>
            <b>Coming Soon!</b>
          </TabPanel>
          <TabPanel value={2} sx={{ p: 2 }}>
            <b>Coming Soon!</b>
          </TabPanel>
        </Tabs>
      </Grid>
      <Grid item xs={1} md={1} lg={1} xl={1} className="bg-zinc-100 rounded-xl"> 
      </Grid>
      </Grid>


    </div>
    
  )
}
