import * as React from 'react';
import TextField from '@mui/material/TextField';

const CustomArgsTextField = () => {
    const [customArguments, setCustomArguments] = React.useState('');
    
    const handleChange = (event) => {
        setCustomArguments(event.target.value);

    }

    return <TextField id="custom-args-text-field" label="ffmpeg custom arguments" autoComplete='off'  InputLabelProps={{style: {color: 'white'}}} inputProps={{ style: {color:'white'}}} value={customArguments} onChange={handleChange}/>

}

export default CustomArgsTextField;