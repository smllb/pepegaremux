import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import React, { useRef } from 'react';
import './InputForm.css'
import UrlError from './UrlError/UrlError';
import { Box } from '@mui/material';
import { PageHeightContext } from '../grid-container/GridContainer';
import { useContext } from 'react';
import { SocketContext } from '../grid-container/GridContainer';
import * as ytdlpController from '../../controller/ytdlpController.mjs';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';


function InputDownloadForm() {

    const pageHeightIsSmall = React.useContext(PageHeightContext)
    const inputRef = useRef();

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [textFieldValue, setTextFieldValue] = React.useState('');
    const [isFetching, setisFetching] = React.useState(false)
    const socket = useContext(SocketContext);

    socket.on('video-list-length-response', () => {
        setisFetching(false)

    })

    const handleUrlSubmit = async (event) => {
        event.preventDefault(); 
        let url = inputRef.current.value;
        setisFetching(true)

        if (url.match(/\./g)) {
            setTextFieldValue('')
            let urlType = await ytdlpController.appraiseUrlFromRequest(encodeURIComponent(inputRef.current.value))
            socket.emit('video', urlType)

            if (urlType === 'YOUTUBE') {
                ytdlpController.sendVideoMetadataToVideoList(url, socket)
                return
            }
            ytdlpController.sendGenericVideoToVideoList(url, socket) 
            return

        } 
        else if (url.length === 0) {
            console.log(url)
            setErrorMessage('Empty URL')
            
        } else {
            setErrorMessage('Invalid URL')

        }

        setisFetching(false)
        setError(true)

        setTimeout(() => {
            setError(false)
        }, 1000)
        setTextFieldValue('')

    }

    return(
        <form className="url-submit" id="inputForm" onSubmit={handleUrlSubmit}>
            <Box
            sx={{
                position: 'fixed',
                top: pageHeightIsSmall ? '32vh' : '21vh',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10000,
            }}>
                <UrlError 
                    error={error}
                    errorMessage={errorMessage}
                    className="url-error"          
                />
            </Box>
            <TextField 
                id="standard-basic" 
                label="Insert URL...." 
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                variant="standard" 
                inputRef={inputRef} 
                sx={{width: '40vw', color: 'white'}}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                InputProps={{
                    style: {color: 'white'}
                }}
            />
            <LoadingButton loading={isFetching} type="submit" variant="contained" color="primary" loadingPosition="end" endIcon={<SendIcon />} 
            sx={{margin: '0px 10px 0px 10px', height: '100%', 
            '&.Mui-disabled': {
                backgroundColor: '#1976d2', opacity: 0.3, color: 'white'
            }}}>
            <span>ADD TO QUEUE</span>
            </LoadingButton>
            
        </form>
    )
}

export default InputDownloadForm;