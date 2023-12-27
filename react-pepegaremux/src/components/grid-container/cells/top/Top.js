import InputDownloadForm from '../../../InputForm/InputForm';
import DownloadButton from '../../../DownloadButton/DownloadButton';
import pepeLogo from '../../../../static/images/pepega.png';

function Top() {
    return (
        <div style={{  display: 'flex', backgroundColor: "#1e2024", height: '100%', justifyContent: 'center', alignItems: 'center'} }>
            <img src={pepeLogo} style={{height: '40px'}}></img>
            <InputDownloadForm/>
            <DownloadButton/> 
        </div>
    );
}
  
export default Top;