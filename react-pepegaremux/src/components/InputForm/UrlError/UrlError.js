import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';


export default function UrlError({error, errorMessage}) {

    return (
      <Box sx={{width: '150px', height: '50px' }}>
        <Collapse in={error}>
          <Alert 
          severity="warning"
          >
            <AlertTitle>URL Error</AlertTitle>
            {errorMessage}
            </Alert>
        </Collapse>
      </Box>
    );
  }