import { useState } from "react";
import { Container, FormGroup } from "react-bootstrap";
import { Button, Col, Input, Label, Row } from "reactstrap";

function Progress() {
    const [addProgress, setAddProgress] = useState([
        {
            course: "",
            grade: "",
            interest: "",
        },
    ]);
    // console.log("addProgress", addProgress);
    return (
        <>
            <Container className="my-5 Progress">
                {addProgress.map((el, idx) => {
                    console.log("el", el);
                    return (
                        <Row
                            className="mt-3 d-md-flex justify-content-center align-items-center"
                            key={idx}
                        >
                            <Col xs="12" md="3" className="mt-3 mt-md-0">
                                <FormGroup>
                                    <Label for="exampleSelect">Courses</Label>
                                    <Input
                                        id="exampleSelect"
                                        name="course"
                                        type="select"
                                        value={el.course}
                                        onChange={(e) => {
                                            setAddProgress((pervState) => {
                                                pervState[idx][e.target.name] =
                                                    e.target.value;
                                                return [...pervState];
                                            });
                                        }}
                                    >
                                        <option selected>Pleae select</option>

                                        <option>physics</option>
                                        <option>math</option>
                                        <option>computer</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3" className="mt-3 mt-md-0">
                                <FormGroup>
                                    <Label for="exampleSelect">Grades</Label>
                                    <Input
                                        id="exampleSelect"
                                        name="grade"
                                        type="select"
                                        value={el.grade}
                                        onChange={(e) => {
                                            setAddProgress((prevState) => {
                                                prevState[idx][e.target.name] =
                                                    e.target.value;
                                                return [...prevState];
                                            });
                                        }}
                                    >
                                        <option selected>Pleae select</option>

                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3" className="mt-3 mt-md-0">
                                <FormGroup>
                                    <Label for="exampleSelect">Interest</Label>
                                    <Input
                                        id="exampleSelect"
                                        name="interest"
                                        type="select"
                                        value={el.interest}
                                        onChange={(e) => {
                                            setAddProgress((prevState) => {
                                                prevState[idx][e.target.name] =
                                                    e.target.value;
                                                return [...prevState];
                                            });
                                        }}
                                    >
                                        <option selected>Pleae select</option>

                                        <option>Interest</option>
                                        <option>Not Interest</option>
                                        <option>Neutral</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            {addProgress.length > 1 ? (
                                <Col
                                    className="d-flex align-items-center justify-content-center"
                                    xs="1"
                                >
                                    <button
                                        className="border border-none bg-primary rounded-pill mt-4"
                                        onClick={() => {
                                            addProgress.splice(idx, 1);
                                            setAddProgress([...addProgress]);
                                        }}
                                    >
                                        <i className="fas fa-minus text-white "></i>
                                    </button>
                                </Col>
                            ) : (
                                ""
                            )}
                        </Row>
                    );
                })}

                <Row className="mt-5 rounded">
                    <Col className="d-flex justify-content-center align-items-center">
                        <button
                            className="border border-none bg-primary rounded-pill Progress__add-btn"
                            onClick={() => {
                                addProgress[0].course &&
                                addProgress[0].grade &&
                                addProgress[0].interest
                                    ? setAddProgress([
                                          ...addProgress,
                                          {
                                              course: "",
                                              grade: "",
                                              interest: "",
                                          },
                                      ])
                                    : alert("Please select all fields first");
                            }}
                        >
                            <i className="fas fa-plus text-white "></i>
                        </button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center align-items-center">
                        <button className="border border-none bg-primary rounded-pill px-5 text-white">
                            SAVE
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Progress;
