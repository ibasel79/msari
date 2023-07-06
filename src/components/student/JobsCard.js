import { Col, Row } from "reactstrap";

function JobsCard({ duration, location, title, offeredBy, websiteURL }) {
    return (
        <>
        <br></br>
            <div  className="joblist mt-6  radius-12 text-white p-6 px-md-12">
                <h4 className="text-center text-md-left">{title}</h4>
                <Row>
                    <Col
                        className="d-flex align-items-center justify-content-center"
                        xs="12"
                        md="6"
                        
                    >
                        <i className="fas fa-building mr-2"></i>
                        <p className="mt-3">{offeredBy}</p>
                        
                    </Col>
                    <Col
                        className="d-flex align-items-center justify-content-center"
                        xs="12"
                        md="6"
                        style={{fontSize:"20px"}}
                    >
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        <p className="mt-3">{location}</p>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="d-flex align-items-center justify-content-center"
                        xs="12"
                        md="6"
                        style={{fontSize:"20px"}}
                    >
                        <a target="_blank" href={websiteURL}>
                            <button className="border-0 rounded-pill text-primary px-3">
                                Go to website
                            </button>
                        </a>
                    </Col>
                  
                </Row>
            </div>
        </>
    );
}

export default JobsCard;
