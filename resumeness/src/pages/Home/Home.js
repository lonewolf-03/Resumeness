import './Home.css';
import resumeImg from '../../assets/resume.jpeg';
import covLetterImg from '../../assets/cover_letter.png'
import one from '../../assets/one.png';
import two from '../../assets/two.png';
import three from '../../assets/three.png';

function Home(){
    return (
        <div className="home">
            <div className="introduction">
                <div className='introHeader'><h1>Create your resume now!</h1></div>
                <div className='introParagraph'>
                    <p>
                        Resumeness allows you to create resumes and
                        cover letters with ease.
                    </p>
                </div>
                <div class='resumeImg'><img src={resumeImg} alt='resume' /></div>
                <div class='CovLetterImg'><img src={covLetterImg} alt='cover letter' /></div>
            </div>
            <div className="howto">
                <div className='step1'>
                    <div className='stepimg'><img src={one} alt='one'/></div>
                    <p className='stepP'>
                        Choose whether you would like
                        to create a resume or a cover letter.
                    </p>
                    {/* <image className='stepillustration'/> */}
                </div>
                <div className='step2'>
                    <div className='stepimg'><img src={two} alt='two'/></div>
                    <p className='stepP'>
                        Fill the provided form.
                    </p>
                    {/* <image className='stepillustration'/> */}
                </div>
                <div className='step3'>
                    <div className='stepimg'><img src={three} alt='three'/></div>
                    <p className='stepP'>
                        Click on the submit button. The resume 
                        will be available as a PDF fill for 
                        downloading.
                    </p>
                    {/* <image className='stepillustration'/> */}
                </div>
            </div>
        </div>
    );
}

export default Home;