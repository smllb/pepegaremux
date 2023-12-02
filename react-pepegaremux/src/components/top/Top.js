
import DownloadButton from '../DownloadButton'
import InputDownloadForm from '../InputForm';

function Top() {
    return (
      <div className="top">
          <div className='linkForm'>
            <p>url sent by user:</p>
            <p id="link"></p>
              <InputDownloadForm/>
          </div>
      </div>
    );
  }
  
  export default Top;

