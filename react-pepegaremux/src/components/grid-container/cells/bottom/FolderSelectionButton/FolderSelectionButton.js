import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button } from '@mui/material';

const selectFolder = () => {
    if (window.Electron && window.Electron.ipcRenderer) {
        window.Electron.ipcRenderer.send('select-output-folder');
    } else {
        console.error('window.Electron or window.Electron.ipcRenderer is undefined');
    }
}


const FolderSelectionButton = () => {
     
    return (

        <Button variant="contained" startIcon={<CreateNewFolderIcon />} onClick={selectFolder}>
        Output folder
        </Button>
            
    )    
}

export default FolderSelectionButton


// ;