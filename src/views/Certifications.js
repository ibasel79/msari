import { Button, Col, Container, Row } from "reactstrap";
import CertificateCard from "../components/certifications/CertificateCard";

function Certifications() {
    const data = [
        {
            title: "Google IT Support Professional Certificate",
            company: "Offered By Google",
            price: "39 per month",
            duration: "6 months",
        },
        {
            title: "System Administration and IT Infrastructure Services",
            company: "Offered By Google",
            price: "39 per month",
            duration: "6 months",
        },
    ];
    return (
        <>
            <Container className="my-5">
                <h4 className="text-center text-primary">
                    Recommended Certificates
                </h4>
                {data.map((info, index) => {
                    return <CertificateCard data={info} />;
                })}
            </Container>
        </>
    );
}

export default Certifications;
