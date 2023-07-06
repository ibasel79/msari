import { Col, Container, FormGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Input, Label } from "reactstrap";

function DetailsCard() {
    const { user } = useSelector((state) => state.authUser);
    // console.log("role", user);
    return (
        <>
            <Container className="mt-5">
                <Row className="bg-primary p-5 dashboard__details-card radius-12">
                    <Col>
                        <FormGroup className="text-white d-flex">
                            <Label for="name" className="mr-3">
                                Name :
                            </Label>

                            <Label>
                                {user?.firstname} {user?.lastname}
                            </Label>
                        </FormGroup>
                        <FormGroup className="mt-3 text-white d-flex">
                            <Label className="mr-3">Email :</Label>
                            <Label>{user?.email}</Label>
                        </FormGroup>
                        <FormGroup className="mt-3 text-white d-flex">
                            <Label className="mr-3" l>
                                CGPA :
                            </Label>
                            <Label>{user?.gpa}</Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DetailsCard;
