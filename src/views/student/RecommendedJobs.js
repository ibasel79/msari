import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, Spinner } from "reactstrap";
import JobsCard from "../../components/student/JobsCard";
import { getJobs } from "../../store/actions/jobsAction";

function RecommendedJObs() {
    let dispatch = useDispatch();
    let { jobs } = useSelector((state) => state.job);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            dispatch(
                getJobs(() => {
                    setLoading(false);
                })
            );
        }
        fetchData();
    }, []);
    return (
        <>
        <h4  style={{marginTop:40}} className="text-center text-primary">Recommended Jobs</h4>
            <Container className="my-2 d-flex flex-wrap justify-content-center align-items-start" style={{marginTop:40}}>
                <br></br>
                
                
                {loading ? (
                    <div  style={{marginTop:40}} className="joblist d-flex align-items-center justify-content-center">
                        <Spinner />
                    </div>
                ) : (
                    jobs.map((job, index) => <JobsCard {...job} key={index} style={{ display: 'inline-block', marginRight: '10px' }} />)
                )}
            </Container>
        </>
    );
}

export default RecommendedJObs;
