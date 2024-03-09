import { useEffect, useState } from "react";

const useFetchResumes = (url) => {
    const [resumes, setResumes] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect( () => {

    const fetchData = async () => {
        try{
            const res = await fetch(url);
            if(!res.ok) {throw new Error("Couldn't fetch from that url");}
            setResumes(await res.json());
            setIsPending(false);
        } catch(err){
            setIsPending(false);
            setError(err.message);
        }
    }

    setTimeout(fetchData, 1000);
    }, [url]);

    

    return {resumes, isPending, error};
}

export default useFetchResumes;