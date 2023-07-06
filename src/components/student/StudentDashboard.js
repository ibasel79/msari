import { Container } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import DetailsCard from "./DetailsCard";
import NavigationCard from "../NavigationCard";
import "D:/coding/msari-course-platform-main/msari-course-platform-main/src/assets/css/style.css";
import { Link } from "react-router-dom";

function StudentDashboard() {
    const data = [
        {
            icon: <i className="fas fa-5x text-white fa-bars"></i>,
            route: "/progress",
            title: "Survey",
        },
        {
            icon: <i className=" fas fa-calculator fa-5x text-white "></i>,
            route: "/recommendation",
            title: "Result",
        },
        {
            icon: <i className="fas fa-5x text-white fa-graduation-cap"></i>,
            route: "/certifications",
            title: "Certifications",
        },
        {
            icon: <i className="fas fa-5x text-white fa-briefcase"></i>,
            route: "/recommended-jobs",
            title: "Jobs"
        },
        
    ];
    return (
        <>
            <Container className="dashboard">
                <DetailsCard />
                    <Row className=" justify-content-center align-items-center mb-5">
                        {data.map((el, idx) => {
                            return (
                                <Col xs="6" lg="5" className="card card-1" key={idx}>
                                    <NavigationCard
                                        icon={el.icon}
                                        route={el.route}
                                        title={el.title}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
            </Container>
        </>
    );
}

export default StudentDashboard;
