import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useRef } from 'react';
import appraiseUrlFromRequest from '../../controller/AppraiseController.mjs'
import './InputForm.css'

function InputDownloadForm() {

    const inputRef = useRef();


    const handleUrlSubmit = async (event) => {
        event.preventDefault();
        let element = document.getElementById("link");

        if (element) {
            element.textContent = await appraiseUrlFromRequest(inputRef.current.value);
            
          }
    }

    return(
        <form className="url-submit" id="inputForm" onSubmit={handleUrlSubmit}>
            <TextField 
                id="standard-basic" 
                label="Insert URL...." 
                variant="standard" 
                inputRef={inputRef} 
                sx={{width: '80vw', color: 'white'}}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
                InputProps={{
                    style: {color: 'white'}
                }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{margin: '0px 10px 0px 10px', height: '100%'}}>Send</Button>
        </form>
    )
}

export default InputDownloadForm;