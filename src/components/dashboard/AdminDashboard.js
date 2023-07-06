import React from "react";
import { Col, Container, Row } from "reactstrap";
import NavigationCard from "./NavigationCard";

const AdminDashboard = () => {
    let options = [
        {
            icon: <i style={{marginTop: 5,paddingButtom: 3, textAlign: 'center'}} class="fas text-white fa-5x fa-user-cog"><lable style={{fontSize:35,fontFamily: 'System-ui', textAlign: 'center'}}><br></br>survey</lable></i>,
            route: "/admins",
        },
        {
            icon: <i class="fas text-white fa-5x fa-book-open"></i>,
            route: "/courses",
        },
        {
            icon: <i class="fas text-white fa-5x fa-user"><lable className={labl} style={{fontSize:35,fontFamily: 'System-ui', textAlign: 'center'}}><br></br>survey</lable></i>,
            route: "/students",
        },
        {
            icon: <i class="fas text-white fa-5x fa-certificate"></i>,
            route: "/admin-certifications",
        },
        {
            icon: <i class="fas text-white fa-5x fa-briefcase"></i>,
            route: "/jobs",
        },
    ];

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                {options.map((ele, index) => {
                    return (
                        <Col lg={4}>
                            <NavigationCard
                                icon={options[index].icon}
                                route={options[index].route}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default AdminDashboard;
