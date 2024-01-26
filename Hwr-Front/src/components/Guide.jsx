import { Link } from 'react-router-dom';

import cap from '../../public/cap2.jpg';
import digit from '../../public/digits.jpg'
import small from '../../public/small_letters.jpg'
import '../styles/guide.css'
const Guide = () => {

async function download(e) {
        let imgElement = e.target;
        let response = await fetch(imgElement.src);
        let blob = await response.blob();
        let url = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = url;
        link.download = 'image.jpg';
        link.click();
        }
    return (
        <>
        <div className="bckset">

            <div className="Guidecont">
                    <h1>Hand Writing Replicator</h1>
                    
                    <h2>Hello there lets dive straight into the procedure</h2>
                    <h3>Step : 1 Take some photos</h3>
                    <p className='mrg-l'>
                            Upload a picture of aplphabets and digits of your hand writing in Dash board <Link to="/dash">Here</Link>
                    </p>

                            <ul className='mrg-l'>
                                    <li>One photo should contain all capital letters written with their handwriting.</li>
                                    <li>Another photo should contain all small letters written with their handwriting.</li>
                                    <li>A third photo should contain digits (0-9) written with their handwriting.</li>

                            </ul>
                            <h3 >Note :</h3>
                            <p className='mrg-l'>Alphabets should be spaced at least one index finger width.</p>
                            <p className='mrg-l'>It should look some thing like this</p>
                            <p className='mrg-l'>Click on the image to download and test if you have no time to write on your own</p>
                    <div className="imgcont">

                        <img className='guideImg' onClick={download} src={cap} alt="" />
                        <img className='guideImg' onClick={download} src={small} alt="" />
                        <img className='guideImg' onClick={download} src={digit} alt="" />
                    </div>
                    <h3>Step : 2 Upload</h3>
        
                    <p className='mrg-l'>Now upload and wait some time....</p>

                    <h3>Step : 3 Start writing</h3>
                            <p className='mrg-l'>Navigate to Write section and start writing on the textbox on Write section  <Link to="/write">Click here</Link></p>
                <h2>Using Generative AI</h2>
                <h3>Step : 1 Get Api Key</h3>
                      <p>
                          <a className='mrg-l' href="https://ai.google.dev/tutorials/setup">https://ai.google.dev/tutorials/setup</a>
                </p>
                <h3>Step : 2 Add Api key</h3>

                        <p className='mrg-l'>Add your key in the google gemni box in <Link to="/write">Write</Link></p>
                <h2>
                        Concern about storing Api key
                </h2>
                <p className='mrg-l'>
                        The Api key is stored inside cookies in a encrypted format and hence is secure
                </p>

                    <h4 className='credit'>Created by <a target='blank' href="https://www.linkedin.com/in/abhijith-sj-89031a243/">Abhijith sj</a> </h4>
            </div>
        </div>
        </>
    )
}

export default Guide