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
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';

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
  socket.emit('remove-video-request', videoId)
  
}

const downloadVideoFromList = (videoId, socket, downloadPointer) => {
  socket.emit('download-single-video-request', {videoId: videoId, socketId: socket.id, downloadPointer: downloadPointer})

}

let renderRow = (props) => {
  
  const { index, style, socket, videoList} = props;
  const video = videoList[index];

  const videoLabel = video.title ? `${video.title} (${video.duration_string}) uploaded by ${video.uploader}` : `Item ${index+1}`;
  let videoStatus = video.status;
  let successfulStatus = ['Ready to Download', 'Downloading...', 'Downloaded']
  let secondaryTextColor = successfulStatus.includes(videoStatus) ? '#5c8e37' : 'red';

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Avatar alt="video thumb" src={video.thumbnail}></Avatar>
        </ListItemIcon>
        <ListItemText primary={videoLabel} secondary={videoStatus} sx ={{ '& .MuiListItemText-secondary': {color: secondaryTextColor}}}></ListItemText>
        <ListItemSecondaryAction>
        <ThemeProvider theme={downloadButtonTheme}>
            <IconButton edge="end" aria-label='Download' sx={{color:secondaryTextColor}} >
              {(() => {
                if (videoStatus === 'Ready to Download') {
                  let downloadPointer = '';
                  if (video.type === 'YOUTUBE') {
                    downloadPointer = video.id;
                   
                  } else {
                    downloadPointer = video.url;

                  }
                  return <DownloadIcon onClick={() => downloadVideoFromList(video.id, socket, downloadPointer)}/>

                } else if (videoStatus === 'Downloading...') {
                  return<CircularProgress size={16}/>

                } else if (videoStatus === 'Downloaded'){
                  return <DoneIcon/>

                } else {
                  return <ErrorOutlineIcon/>
                }
              })()}
            </IconButton>
          </ThemeProvider>
          <ThemeProvider theme={deleteButtonTheme}>
            <IconButton edge="end" aria-label='Delete' color="ochre" >
            {(()=> {
              if (videoStatus === 'Downloading...') {
                return <DoNotTouchIcon style={{ pointerEvents: 'none'}}/>
              } else {
                return <DeleteIcon onClick={() => removeVideoFromList(index, socket)}/>
              }
            })()}
                       
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
      //console.log(videoList)

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
          itemSize={90}
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