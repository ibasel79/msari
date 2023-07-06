import { Container } from "react-bootstrap";
import { Col, Row } from "reactstrap";

function MajorRecommendation() {
    return (
        <>
            <Container className="my-5">
                <Row>
                    <Col className="bg-primary radius-12 text-white p-3 text-center">
                        <h6>Based on your interests and academic progress</h6>
                        <h4>We recommend:</h4>
                        <h1>CIS</h1>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="bg-primary radius-12 text-white p-3 px-md-5 ">
                        <h6 className="text-center">
                            Recommended certificates
                        </h6>
                        <p className="mb-0">
                            Google IT Support Professional Certificate
                        </p>

                        <p>Certified Associate in Project Management</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="bg-primary radius-12 text-white p-3 px-md-5 text-center">
                        <h6 className="">Highest interests / Grade</h6>
                        <p className="mb-0">Physics / A+</p>
                        <p className="mb-0">Calculus / B</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MajorRecommendation;
