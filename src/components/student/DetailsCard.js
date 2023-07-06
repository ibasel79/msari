import { Col, Container, FormGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Input, Label } from "reactstrap";

function DetailsCard() {
    const { user } = useSelector((state) => state.authUser);
    // console.log("role", user);
    return (
        <>
            <Container className="phonecard flex" style={{marginBottom:"300px", position:"relative"}} >
                
                <Row className="card-s  radius-12" style={{width:400, height:440}}>
                <h2 className="text-center" style={{color:"white",alignContent:"center",paddingLeft:80,paddingTop:10}}>Student card</h2>
                    <Col>
                        <FormGroup className="text-white d-flex" style={{}}>
                            <Label for="name" className="mr-2 "><img src="/person.svg" style={{width:50, height:50}} />
                            </Label>

                            <Label style={{fontSize:20, paddingTop:5}}>
                                {user?.firstname} {user?.lastname}
                            </Label>
                        </FormGroup>
                        <br></br>
                        <FormGroup className="mt-3 text-white d-flex" style={{paddingTop:10}}>
                            <Label className="mr-3" style={{fontSize:20}}>
                            <img src="/email.svg" style={{width:50, height:50}} />
                            </Label >
                            <Label style={{fontSize:20, paddingTop:6}} >{user?.email}</Label>
                        </FormGroup>
                        <FormGroup className="mt-3 text-white d-flex" style={{paddingTop:20}}>
                            <Label className="mr-3" style={{fontSize:20}} ><img src="/GPA.png" style={{width:50, height:50}} />
                            </Label>
                            <Label style={{fontSize:30, paddingTop:2,paddingLeft:10}}>{user?.gpa}</Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DetailsCard;
