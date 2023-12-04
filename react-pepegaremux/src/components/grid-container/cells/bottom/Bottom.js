import FormatSelect from "../../../GenericSelect/FormatSelect";
import CustomArgsTextField from "../../../GenericSelect/CustomArgsTextField/CustomArgsTextField";
import Box from '@mui/material/Box';
import FolderSelectionButton from "./FolderSelectionButton/FolderSelectionButton";
import SettingsButton from "./SettingsButton/SettingsButton";
const Bottom = () => {
    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexDirection: 'row',
            padding: '10px', 
            alignItems: 'center', 
            height: '100%', 
            backgroundColor: "#1e2024", 
            boxSizing: 'border-box',
        }}>

            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                }}>
            <Box sx={{width:'20%', minWidth: '100px'}}>
                <FormatSelect/>
            </Box>
            <Box sx={{ marginLeft: '5px' }}>
                <CustomArgsTextField/>
            </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Box>
                    <SettingsButton/>
                </Box>
                <Box sx={{ marginLeft: '5px' }}>
                    <FolderSelectionButton/>
                </Box>   
            </Box> 
        </Box>
    );

}

export default Bottom;