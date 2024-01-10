import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './GridContainer.css';
import Top from './cells/top/Top';
import Mid from './cells/mid/Mid';
import Bottom from './cells/bottom/Bottom';
import useMediaQuery from '@mui/material/useMediaQuery';
import io from 'socket.io-client';

export const PageHeightContext = React.createContext()
export const SocketContext = React.createContext();

const socket = io('http://localhost:3967');

function GridContainer() {
  let pageHeightIsSmall = useMediaQuery('(max-height:550px)')
      
    return (
      
        <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
        <SocketContext.Provider value={socket}>
        <Grid container spacing={0}>
        <PageHeightContext.Provider value={pageHeightIsSmall}>
          <Grid item xs={12} md={12} sx={{height: pageHeightIsSmall ? '20vh' : '15vh'}}>
            <Top pageHeightIsSmall={pageHeightIsSmall}/>
          </Grid>
          <Grid item xs={12} md={12} sx={{height: pageHeightIsSmall ? '60vh' : '72vh'}}>
           <Mid/>
          </Grid>
          </PageHeightContext.Provider>
          <Grid item xs={12} md={12} sx={{height: pageHeightIsSmall ? '20vh' : '13vh'}}>
            <Bottom/>
          </Grid>
        </Grid>
        </SocketContext.Provider>
      </Box>
      )
  };
  
  export default GridContainer;

