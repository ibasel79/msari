import React from "react";
import { Col, Container, Row } from "reactstrap";
import NavigationCard from "../NavigationCard";

const AdminDashboard = () => {
    let options = [
        {
            icon: <i class="fas text-white fa-5x fa-user-cog"></i>,
            route: "/admins",
            title: "Admin",
        },
        {
            icon: <i class="fas text-white fa-5x fa-book-open"></i>,
            route: "/courses",
            title: "Course",
        },
        {
            icon: <i class="fas text-white fa-5x fa-user"></i>,
            route: "/students",
            title: "Student",
        },
        {
            icon: <i class="fas text-white fa-5x fa-certificate"></i>,
            route: "/admin-certifications",
            title: "Certifications",
        },
        {
            icon: <i class="fas text-white fa-5x fa-briefcase"></i>,
            route: "/jobs",
            title: "Jobs",
        },
       
    ];

    return (
        <Container>
            <Row className=" d-flex rows-lg-5 justify-content-center">
                {options.map((ele, index) => {
                    return (
                        <Col xs="6" lg="4" className="mt-4">
                            <NavigationCard 
                            
                                icon={options[index].icon}
                                route={options[index].route}
                                title={options[index].title}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default AdminDashboard;
