import React, { useEffect } from 'react';
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
import { SocketContext } from '../grid-container/GridContainer';
import { useContext } from 'react';
import { useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';

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

const removeVideoFromList = (videoId, socket) => {
  console.log("REMOVE VIDEO")
  console.log("Socket connected:", socket.connected);
  socket.emit('remove-video-request', videoId)
  
}
let renderRow = (props) => {
  
  const { index, style, socket, videoList} = props;
  console.log(`Current index on renderRow: ${index}`)
  const video = videoList[index];
  console.log(`${JSON.stringify(videoList,2,null)}`)
  const videoLabel = video.title ? `${video.title} (${video.duration_string}) uploaded by ${video.uploader}` : `Item ${index+1}`;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Avatar alt="video thumb" src={video.thumbnail}></Avatar>
        </ListItemIcon>
        <ListItemText primary={videoLabel}></ListItemText>
        <ListItemSecondaryAction>
        <ThemeProvider theme={downloadButtonTheme}>
            <IconButton edge="end" aria-label='Download' color="greeny">
              <DownloadIcon/>
            </IconButton>
          </ThemeProvider>
          <ThemeProvider theme={deleteButtonTheme}>
            <IconButton edge="end" aria-label='Delete' color="ochre" onClick={() => removeVideoFromList(video.id, socket)}>
              <DeleteIcon/>
            </IconButton>
          </ThemeProvider>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
} 

function VideoList() {

  const socket = useContext(SocketContext)
  const  [amountOfVideos, setAmountOfVideos] = useState(0);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    socket.on('video-list-length-response', () => {
      socket.emit('video-list-update-request')

    }); 

    
    socket.on('video-list-update-response', videoList => {
      setVideoList(videoList);
      setAmountOfVideos(videoList.length)
      console.log(videoList)

    });

    return () => {
      socket.off('video-list-length-response');
      socket.off('video-list-update-response');

    };
  }, [socket]);


  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          className={styles.virtualList} 
          height={height}
          width={width}
          itemSize={46}
          itemCount={amountOfVideos}
          overscanCount={5}
        >
          {props => renderRow({...props, socket, videoList})}

        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

export default VideoList;