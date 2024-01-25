import Button from '@mui/material/Button';
import { SocketContext } from '../grid-container/GridContainer';
import { useContext } from 'react';

const downloadAllVideosFromList = (socket) => {
  socket.emit('download-all-videos-request')
}

function DownloadButton() {
  
  const socket = useContext(SocketContext)

  return (
    <Button variant="contained" color="primary" onClick={() => downloadAllVideosFromList(socket)}>
      Download
    </Button>
  );
}

export default DownloadButton