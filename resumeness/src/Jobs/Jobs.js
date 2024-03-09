function Jobs({ jobsNum , jobTitle, setJobTitle, company, setCompany, employmentDate, setEmploymentDate, companyLoc, setCompanyLoc, companyDescription, setDescription, responsibilities , setResponsibilities}) {
    const func = (n) => {
        const arr = [];
        for(let i = 1; i <= n; i++){
            arr.push(
                <>
                    <h1>Postion #{i}:</h1>
                    <label for='jobtitle'>Job title: </label><br/>
                    <input required type='text' id='jobtitle' name='jobtitle' value={jobTitle[i-1]} onChange={(e) => {setJobTitle((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label for='company'>Company name: </label><br/>
                    <input required type='text' id='company' name='company' value={company[i-1]} onChange={(e) => {setCompany((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label for='employmentDate'>Employment date: </label><br/>
                    <input required type='employmentDate' id='employmentDate' name='company' value={employmentDate[i-1]} onChange={(e) => {setEmploymentDate((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label>Responsibilities and acheivements : </label><br/>
                    <text>
                        <textarea value={responsibilities[i-1]} onChange={(e) => {setResponsibilities((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}></textarea>
                    </text><br/>
                    <label for='companyLoc'>Company's location: </label><br/>
                    <input required type='text' id='companyLoc' name='companyLoc' value={companyLoc[i-1]} onChange={(e) => {setCompanyLoc((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label>Company description (Optional) : </label><br/>
                    <text>
                        <textarea placeholder="a brief description of each company (industry, size, etc.)." value={companyDescription[i-1]} onChange={(e) => {setDescription((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/>
                    </text><br/>
                </>
            );
        }

        return arr;
    }
    return (
        func(jobsNum)
    );
}

export default Jobs;