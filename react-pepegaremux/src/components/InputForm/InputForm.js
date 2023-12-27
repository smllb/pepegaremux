import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useRef } from 'react';
import appraiseUrlFromRequest from '../../controller/ytdlpController.mjs'
import './InputForm.css'
import UrlError from './UrlError/UrlError';
import { Box } from '@mui/material';
import { PageHeightContext } from '../grid-container/GridContainer';
import { useContext } from 'react';
import { SocketContext } from '../grid-container/GridContainer';

function InputDownloadForm(vwHeight) {

    const pageHeightIsSmall = React.useContext(PageHeightContext)
    const inputRef = useRef();

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [textFieldValue, setTextFieldValue] = React.useState('');
    const socket = useContext(SocketContext);

    const handleUrlSubmit = async (event) => {

        event.preventDefault(); 
        let url = inputRef.current.value;

        if (url.match(/\./g)) {
            setTextFieldValue('')
            let urlType = await appraiseUrlFromRequest(encodeURIComponent(inputRef.current.value))
            console.log(urlType)
                if (urlType == 'YOUTUBE') {
                    
                    return
                }
            
            return

        } else if (url.length === 0) {
            console.log(url)
            setErrorMessage('Empty URL')
            
        } else {
            setErrorMessage('Invalid URL')

        }
        
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
            <Button type="submit" variant="contained" color="primary" sx={{margin: '0px 10px 0px 10px', height: '100%'}}>ADD TO QUEUE</Button>
        </form>
    )
}

export default InputDownloadForm;