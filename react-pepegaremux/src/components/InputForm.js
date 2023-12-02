import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useRef } from 'react';
import appraiseUrlFromRequest from '../controller/AppraiseController.mjs'

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
        <form className="url-submit" onSubmit={handleUrlSubmit}>
            <TextField id="outlined-basic" label="Insert URL..." variant="outlined" inputRef={inputRef}/>
            <Button type="submit" variant="contained" color="primary">Send</Button>
        </form>
    )
}

export default InputDownloadForm;