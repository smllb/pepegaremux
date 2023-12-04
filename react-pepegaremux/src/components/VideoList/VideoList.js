import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './VideoList.module.css'; 
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import DownloadIcon from '@mui/icons-material/Download';

const deleteButtonTheme = createTheme({
  palette: {
    ochre: {
      main: '#8a88d0',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});
const downloadButtonTheme = createTheme({
  palette: {
    greeny: {
      main: '#a7f09c',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    }
  }
})

function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`}></ListItemText>
          <ListItemSecondaryAction>
          <ThemeProvider theme={downloadButtonTheme}>
              <IconButton edge="end" aria-label='Download' color="greeny">
                <DownloadIcon/>
              </IconButton>
            </ThemeProvider>
            <ThemeProvider theme={deleteButtonTheme}>
              <IconButton edge="end" aria-label='Delete' color="ochre">
                <DeleteIcon/>
              </IconButton>
            </ThemeProvider>
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
    );
}

function VideoList() {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          className={styles.virtualList} 
          height={height}
          width={width}
          itemSize={46}
          itemCount={20}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

export default VideoList;