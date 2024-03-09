import { useParams } from "react-router-dom";
import { useRef } from "react";
import  useFetchResumes from '../../hooks/useFetchResumes';
import './CurrentResume.css'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function CurrentResume() {
    const { id } = useParams();
    const {resumes , isPending, error} = useFetchResumes('http://localhost:8000/resumes/' + id);
    const pdfRef = useRef();

    const Resume = () => (<div ref={pdfRef}>
        <div className="header">
        <div className="Img"><img src={(resumes.personalImg === '')?'../../assets/nobody.jpeg':resumes.personalImg}/></div>
            <div className="personal">
               <div className="name"><h1>{resumes.full_name}</h1></div>
               <div className="jobTitle"><h4>{resumes.objective}</h4></div>
            </div>
            <div className="contact">
                <h1>Contact</h1>
                <p>{resumes.address}</p>
                <p>{resumes.phone}</p>
                <p>{resumes.email}</p>
                <p>{resumes.linkedin}</p>
                <p>{resumes.portfolio}</p>
            </div>
        </div>
        <hr/>
        <div className="main">
            <div className="education">
                {resumes.bachelorCheck &&
                <>
                <h1>Education </h1>
                <p> Bachelor's degree in {resumes.bachelor}</p>
                <p>{resumes.bachelorInstitution}, {resumes.bachelorLoc}</p>
                <p>{resumes.bachelorGradDate}</p>
                <p>Awards and honors</p>
                <p>{resumes.bachelorAwards}</p>
                </> 
                }
                <br/>
                {resumes.masterCheck &&
                <>
                <h1> Master's degree in {resumes.master}</h1>
                <p>{resumes.masterInstitution}, {resumes.masterLoc}</p>
                <p>{resumes.masterGradDate}</p>
                <p>Awards and honors</p>
                <p>{resumes.masterAwards}</p>
                </> 
                }
                <br/>
                {resumes.phdCheck &&
                <>
                <h1> PhD degree in {resumes.phd}</h1>
                <p>{resumes.phdInstitution}, {resumes.phdLoc}</p>
                <p>{resumes.phdGradDate}</p>
                <p>Awards and honors</p>
                <p>{resumes.phdAwards}</p>
                </> 
                }
                <br/>
            </div>
    
            <div className="professionalExperience">
                <h1>Professional Experience</h1>
                <ul>
                {Array.from({length : resumes.jobsNum} , (value, index) => (
                    <li>
                        <p>Worked at {resumes.company[index]}, {resumes.companyLoc[index]}</p>
                        <p>Company Description:  {resumes.companyDescription[index]}</p>
                        <p>Worked as {resumes.jobTitle[index]}</p>
                        <p>Responsibilities: {resumes.responsibilities}</p>
                        <p>Employment Date: {resumes.employmentDate[index]}/</p>
                    </li>
                    )
                )}
                </ul>
            </div>
    
            <div className="skills">
                {resumes.skills &&
                <>
                <h1>Skills</h1>
                <p>{resumes.skills}</p>
                </> 
                }
            </div>
    
            <div className="volunteer">
                {resumes.volunteer &&
                <>
                <h1>Volunteering experience</h1>
                <p>{resumes.volunteer}</p>
                </> 
                }
            </div>
    
            <div className="hobbies">
                {resumes.hobbies &&
                <>
                <h1>Hobbies</h1>
                <p>{resumes.hobbies}</p>
                </> 
                }
            </div>
        </div>
        </div>); 

    function handleClick() {
        const input = pdfRef.current;
        html2canvas(input).then(
            (canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 30;
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                console.log(imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save(`${resumes.full_name}.pdf`);

            }
        );
    }
    

    return(
        <>
        {isPending && <div>Loading resumes ...</div>}
        {error && <div>Experienced an error: {error}</div>}
        {resumes && <Resume/>}
        <button onClick={handleClick}>Download</button>
        </>
    );
}

export default CurrentResume;