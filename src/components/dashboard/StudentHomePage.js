import { Container } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import DetailsCard from "./DetailsCard";
import NavigationCard from "./NavigationCard";


function HelloWorld() {
    }

function StudentHomePage() {
    const styleObj = {
        fontSize: 30,
        
        textAlign: "center",

      }
    const data = [
        {
            icon: <i className="fas fa-calculator fa-5x text-white">Survey<p style={styleObj}>Survey</p></i>,
            route: "/progress",
        },
        {
            icon: <i className="fas fa-5x text-white fa-graduation-cap"></i>,
            route: "/recommendation",
        },
        {
            icon: <i className="fas fa-5x text-white fa-bars"></i>,
            route: "/certifications",
        },
        {
            icon: <i className="fas fa-5x text-white fa-briefcase"></i>,
            route: "/recommended-jobs",
        },
    ];
    return (
        <>
            <Container className="dashboard">
                <DetailsCard />
                <Row className="mb-5">
                    {data.map((el, idx) => {
                        return (
                            <Col md="6" className="mt-3" key={idx}>
                                <NavigationCard
                                    icon={el.icon}
                                    route={el.route}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default StudentHomePage;
