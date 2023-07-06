import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import { login } from "../../store/actions/authAction";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const { loginLoading } = useSelector((state) => state.authReducer);
    // console.log("loader", loginLoading);
    return (
        <>


            

            <Container className="laylog" style={{marginBottom:-300000}} >
                           <img clasname="laylogbg" src="/back.jpg" style={{width:2000, height:1100,marginLeft:-600,marginRight:-200}}/>
                           {/* <iframe src="https://scribehow.com/embed/Web_Workflow__2_b8YblGSmuvcuCnqJfj9A?as=scrollable" width="100%" height="680" allowfullscreen frameborder="0"></iframe> */}

                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = {
                            username,
                            password,
                        };
                        dispatch(login(data));
                    }}
                >
                    
                    <div className=" d-flex">
                   
                        <div className=" mylogin    p-5 text-white " style={{height:1100,marginRight:0,width:400 ,marginLeft:1150}}>
                            <Row>
                                
                                <Col className="d-flex justify-content-center align-items-center ">
                                    <i className="fas fa-4x text-white"><img src="/Picture1.png" style={{width:150,height:100}}/></i>
                                </Col>
                            </Row>

                            <Row className="mt-4" >
                                <Col
                                    xs="12"
                                    className="d-flex justify-content-center"
                                >
                                    <FormGroup>
                                        <Label for="name">Username</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Username"
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    xs="12"
                                    className="d-flex justify-content-center"
                                >
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
                            <div className="d-flex justify-content-center mt-4">
                                <Link className="text-white small" to="/forgot-password">
                                    Forgot Password
                                </Link>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                            <Button
                                color="primary"
                                className="text-white d-flex justify-content-center "
                                size="lg"
                                type="submit"
                                style={{margin:30,width:"120px"}}
                            >
                                {loginLoading ? <Spinner size="sm" /> : "Login"}
                            </Button>
                            <Button
                            color="primary"
                            className="text-white d-flex justify-content-center "
                            size="lg"
                            onClick={() => {
                                history.push("/sign-up");
                            }}
                            style={{margin:30,fontSize:17,width:"120px"}}
                        >
                            Sign up
                        </Button>
                        </div>
                        </div>
                    </div>
                    <Row className="my-3 ">
                        
                        <Col className="d-flex">
                            
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col className="d-flex">
                        
                    </Col>
                </Row>
            </Container>
            </>
        
    );
}

export default Login;
