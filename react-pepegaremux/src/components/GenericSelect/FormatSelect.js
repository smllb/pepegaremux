import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import { SocketContext } from '../grid-container/GridContainer';

const FormatSelect = () => {

    const matches = useMediaQuery('(max-height:600px')
    const [format, setFormat] = React.useState('mp3'); 
    const label = 'Video format';
    const socket = React.useContext(SocketContext)

    const updateSelectedFileType = (filetype) => {
        socket.emit('update-filetype-request', filetype);
    }

    const handleChange = (event) => {
        let filetype = event.target.value
        setFormat(filetype);
        updateSelectedFileType(filetype)

    }

    return <Box sx={{ minWidth: 70, }}>
        <FormControl fullWidth>  
            <InputLabel id='format-select-id' sx={{color: 'white'}}>{label}</InputLabel>
            <Select
                labelId='format-select-label-id'
                id={`format-select-id`}
                value={format}
                label={label}
                onChange={handleChange}
                sx={{color:'white'}}
            >
                
                    <MenuItem value={'mp3'}>Mp3</MenuItem>
                    <MenuItem value={'mp4'}>Mp4</MenuItem>
                    <MenuItem value={'ogg'}>Ogg</MenuItem>
                    <MenuItem value={'vorbis'}>Vorbis</MenuItem>
                    <MenuItem value={'webm'}>Webm</MenuItem>
            

            </Select>
        </FormControl>
    </Box>
}

export default FormatSelect