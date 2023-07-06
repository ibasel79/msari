import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { authRegister } from "../../store/actions/authAction";

function SignUp() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gpa, setGPA] = useState("");
    const dispatch = useDispatch();

    const history = useHistory();
    const { registerLoading } = useSelector((state) => state.authReducer);

    return (
        <>
        <div style={{ marginTop:"150px"}}></div>
            <Container className="my-4 mylogin" style={{paddingBottom:50}}>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const credentials = {
                            firstname,
                            username,
                            lastname,
                            email,
                            gpa,
                        };
                        dispatch(authRegister(credentials, password));
                        history.push("/SignUp/to/Login");
                    }}
                >
                    <div className="radius-12 p-5 text-white" style={{maxwdith:100, minWidth:100}}>
                        <h3 className="text-center" style={{maxwdith:100, minWidth:100}}>Sign Up</h3>
                        <Row className="mt-4">
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label for="name">First Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="First Name"
                                        type="text"
                                        required
                                        value={firstname}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label for="name">Last Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Last Name"
                                        type="text"
                                        required
                                        value={lastname}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label for="name">Username</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Username"
                                        required
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label for="name">Password</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Password"
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label for="name">Email</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label for="name">GPA</Label>
                                    <Input
                                        id="name"
                                        name="gpa"
                                        placeholder="GPA"
                                        required
                                        type="number"
                                        step="0.01"
                                        value={gpa}
                                        max={5}
                                        min={0}
                                        
                                        onKeyDown={(e) => {
                                            // Allow all key presses
                                          }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d+(\.\d{1,2})?$/.test(value) && value <= 5) {
                                              setGPA(value);
                                            }
                                          }}

                                        // onChange={(e) => {
                                        //     setGPA(Number(e.target.value));
                                        // }}

                                        
                                   
                                   
                                   />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <Row className="my-3  ">
                        <Col className="d-flex">
                            <Button
                                color="primary"
                                className="text-white mx-auto"
                                size="lg"
                                type="submit"
                                // onClick={() => {
                                //     history.push("/");
                                // }}
                            >
                                {registerLoading ? (
                                    <Spinner size="sm" />
                                ) : (
                                    "Sign up"
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col className="d-flex">
                        <Button
                            color="primary"
                            className="mx-auto text-white"
                            size="lg"
                            onClick={() => {
                                history.push("/login");
                            }}

                            style={{maxwdith:100, minWidth:100}}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SignUp;
