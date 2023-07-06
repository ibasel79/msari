import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
} from "reactstrap";
import { resetPassword } from "../../store/actions/authAction";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    return (
        <>
            <Container className="my-4">
                <Form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        dispatch(
                            resetPassword(email, () => {
                                setLoading(false);
                            }, () => {
                                setLoading(false);
                            })
                        );
                        // dispatch(login(data));
                    }}
                >
                    <div className="d-flex justify-content-center">
                        <div className="bg-primary radius-12 p-5 text-white ">
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <i className="fas fa-4x text-white fa-graduation-cap"></i>
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col
                                    xs="12"
                                    className="d-flex justify-content-center"
                                >
                                    <FormGroup>
                                        <Label for="name">Email</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Email"
                                            type="text"
                                            required
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Row className="my-3 ">
                        <Col className="d-flex">
                            <Button
                                color="primary"
                                className="text-white mx-auto"
                                size="lg"
                                type="submit"
                            >
                                {loading ? <Spinner size="sm" /> : "Send Link"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default ForgotPassword;
