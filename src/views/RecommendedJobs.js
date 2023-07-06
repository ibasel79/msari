import { Button, Col, Container, Row } from "reactstrap";
import JobsCard from "../components/recommendedJobs/JobsCard";

function RecommendedJObs() {
    const jobsData = [
        {
            job: "Data Scientist",
            address: "Riyadh, Saudi Arabia",
            company: "MSE Technology",
            time: "Full-time",
        },
        {
            job: "Programmer",
            address: " Arabia",
            company: "Nada",
            time: "Full-time",
        },
    ];
    return (
        <>
            <Container className="my-5">
                <h4 className="text-center text-primary">Recommended Jobs</h4>
                {jobsData.map((info, index) => {
                    return <JobsCard data={info} />;
                })}
            </Container>
        </>
    );
}

export default RecommendedJObs;
