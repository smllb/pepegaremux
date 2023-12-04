import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button } from '@mui/material';

const FolderSelectionButton = () => {
     
    return (

        <Button variant="contained" startIcon={<CreateNewFolderIcon />}>
        Output folder
        </Button>
            
    )    
}

export default FolderSelectionButton