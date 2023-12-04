import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './GridContainer.css';
import Top from './cells/top/Top';
import Mid from './cells/mid/Mid';
import Bottom from './cells/bottom/Bottom';
import useMediaQuery from '@mui/material/useMediaQuery';
function GridContainer() {

  const matches = useMediaQuery('(max-height:550px)');

      
    return (
        <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12} sx={{height: matches ? '20vh' : '15vh'}}>
            <Top/>
          </Grid>
          <Grid item xs={12} md={12} sx={{height: matches ? '60vh' : '72vh'}}>
           <Mid/>
          </Grid>
          <Grid item xs={12} md={12} sx={{height: matches ? '20vh' : '13vh'}}>
            <Bottom/>
          </Grid>
        </Grid>
      </Box>)
  };
  
  export default GridContainer;

