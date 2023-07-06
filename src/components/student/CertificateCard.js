import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

function CertificateCard({ duration, description, location, name, provider, websiteURL }) {
    return (
        <Row>
            <Col className="mt-3 bg-primary radius-12 text-white p-3 px-md-5">
                <h3>{name}</h3>
                <Row>
                <Col
                        className="d-flex align-items-center justify-content-center"
                        xs="12"
                        md="6"
                    >
                        
                        <p className="mt-3">{description}</p>
                    </Col>
                    <Col
                        className="d-flex align-items-center justify-content-center"
                        xs="12"
                        md="6"
                        style={{fontSize:"20px"}}
                    >
                        <i className="fas fa-building mr-2"></i>
                        <p className="mt-2">{provider}</p>
                    </Col>
                    
                </Row>
                <Row>
                    <Col
                        className="d-flex "
                        xs="6"
                        md="12"
                        style={{fontSize:"20px"}}
                    >
                        <a target="_blank" href={websiteURL}>
                            <button className="border-0 rounded-pill text-primary px-5">
                                Go to website
                            </button>
                        </a>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CertificateCard;
