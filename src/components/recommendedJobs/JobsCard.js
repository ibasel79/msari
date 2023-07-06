import { Button, Col, Container, Row } from "reactstrap";

function JobsCard({ data }) {
    return (
        <>
            <Row>
                <Col className="mt-3 bg-primary radius-12 text-white p-3 px-md-5">
                    <h6 className="text-center text-md-left">{data.job}</h6>
                    <Row>
                        <Col
                            className="d-flex align-items-center justify-content-center"
                            xs="12"
                            md="6"
                        >
                            <i className="fas fa-building mr-2"></i>
                            <p className="mt-3">{data.company}</p>
                        </Col>
                        <Col
                            className="d-flex align-items-center justify-content-center"
                            xs="12"
                            md="6"
                        >
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <p className="mt-3">{data.address}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="d-flex align-items-center justify-content-center"
                            xs="12"
                            md="6"
                        >
                            <button className="border-0 rounded-pill text-primary px-3">
                                Go to website
                            </button>
                        </Col>
                        <Col
                            className="d-flex align-items-center justify-content-center"
                            xs="12"
                            md="6"
                        >
                            <i className="far fa-clock mr-2"></i>
                            <p className="mt-3">{data.time}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default JobsCard;
