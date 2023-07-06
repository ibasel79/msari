import { useEffect, useState } from "react";
import { Container, Form, FormGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Input, Label, Row } from "reactstrap";
import { getQuestions } from "../../store/actions/questionsAction";
import globalConst from "../../config/globalConst";
import { getCourses } from "../../store/actions/coursesActions";
import {
    saveAcademicProgress,
    getAcademicProgress,
} from "../../store/actions/academicProgressAction";
// import { useNavigate } from "react-router-dom";
import firebase from "../../config/firebase";
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom'


 
function Progress() {

   
    const history = useHistory();
    // console.log(globalConst);
   
    // const navigate = useNavigate();
    const [Questions, setQuestions] = useState({});
    console.log("Questions", Questions);
    // console.log("check", check);
    const [addProgress, setAddProgress] = useState([
        {
            courseCode: "",
            grade: "",
            interest: "",
            id: firebase.firestore().collection("courses").doc().id,
        },
    ]);
    const [deletedQuestions, setDeletedQuestions] = useState([]);
    // console.log("addProgress", addProgress);
    let { questions, getQuestionsLoader } = useSelector(
        (state) => state.question
    );
    let { courses } = useSelector((state) => state.course);
    let { progress } = useSelector((state) => state.academicProgress);
    let { user } = useSelector((state) => state.authUser);
    // console.log("user", user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestions());
        dispatch(getCourses());
        dispatch(getAcademicProgress());
    }, []);

    useEffect(() => {
        if (progress === "idle" || Object.keys(progress).length === 0) {
            return;
        }
        setQuestions(progress.questions);
        setAddProgress(progress.courses);
    }, [progress]);

    useEffect(() => {
        let temp = {};
        for (let question of questions) {
            temp[question.id] = false;
        }
        console.log(temp);
        setQuestions(temp);
    }, [questions]);


    const student_border ={
        topmargin: "20px",
        padding : "50px",
        border: "3px solid #00b0ff",
        borderRadius: '30px'
      
      };

     

    return (
        <>
    
            {progress === "idle" ? (
                <div className="d-flex align-items-center justify-content-center py-4">
                    <Spinner />
                </div>
            ) : (
                <Container style={student_border} className="my-5 Progress">
                    
                    <h4>Questions </h4>
                    <p style={{color: "gray"}}>Answer the follwing yes and no qustions </p>
                    <Form
                        onSubmit={(e) => {
                            
                            e.preventDefault();
                            dispatch(
                                saveAcademicProgress(
                                    addProgress,
                                    Questions,
                                    user.uid,
                                    deletedQuestions
                                )

                               
                            );

                        
                            history.push("/progress/to/Dashboard");
                        }}
                        
                        
                    >
                        {getQuestionsLoader ? (
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <Spinner />
                                <small className="mt-2">
                                    <strong>Loading...</strong>
                                </small>
                            </div>
                        ) : (
                            questions?.map((question, idx) => {
                                return (
                                    <Row style={{marginBottom:"20px"}}>
                                        <Col key={idx} className="">
                                            {idx + 1}: {question.description}
                                        </Col>
                                        <Col>
                                            <Form className="d-flex">
                                                <FormGroup
                                                    check
                                                    inline
                                                    className="mr-5"
                                                >
                                                    <Input
                                                        type="radio"
                                                        name={question.id}
                                                        value="true"
                                                        onChange={(e) => {
                                                            setQuestions({
                                                                ...Questions,
                                                                [question.id]: true,
                                                            });
                                                        }}
                                                        checked={
                                                            Questions[
                                                                question.id
                                                            ] === true
                                                        }
                                                    />
                                                    <Label check>Yes</Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Input
                                                        type="radio"
                                                        name={question.id}
                                                        value="false"
                                                        onChange={(e) => {
                                                            setQuestions({
                                                                ...Questions,
                                                                [question.id]: false,
                                                            });
                                                        }}
                                                        checked={
                                                            Questions[
                                                                question.id
                                                            ] === false
                                                        }
                                                    />
                                                    <Label check>No</Label>
                                                </FormGroup>
                                                
                                            </Form>
                                            <br/>
                                        </Col>
                                        
                                    </Row>
                                   
                                );
                                 
                            })
                        )}

                        <br></br>
                        <Container >
                        <h4>Add Courses</h4>
                        <p style={{color: "gray"}}>Add each course that you have passed with the grade, then select your interest level from the list  </p>

                        {addProgress.map((el, idx) => {
                            return (
                                <Row
                                    className="mt-5 d-md-flex justify-content-center align-items-center"
                                    key={idx}
                                >
                                    <Col
                                        xs="12"
                                        md="3"
                                        className="mt-3 mt-md-0"
                                    >
                                        <FormGroup>
                                            <Label for="exampleSelect">
                                                Courses
                                            </Label>

                                            <Input
                                                id="exampleSelect"
                                                name="courseCode"
                                                required
                                                type="select"
                                                value={el.courseCode}
                                                onChange={(e) => {
                                                    setAddProgress(
                                                        (pervState) => {
                                                            pervState[idx][
                                                                e.target.name
                                                            ] = e.target.value;
                                                            return [
                                                                ...pervState,
                                                            ];
                                                        }
                                                    );
                                                }}
                                            >
                                                <option selected>
                                                    Please select
                                                </option>
                                                {courses
                                                    ?.filter(
                                                        (course) =>
                                                            !(
                                                                addProgress
                                                                    .map(
                                                                        (
                                                                            progress
                                                                        ) =>
                                                                            progress.courseCode
                                                                    )
                                                                    .includes(
                                                                        course.courseCode
                                                                    ) &&
                                                                el.courseCode !==
                                                                    course.courseCode
                                                            )
                                                    )
                                                    .map((el, idx) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    el.courseCode
                                                                }
                                                                key={idx}
                                                            >
                                                                {el.courseCode}{" "}
                                                                {el.courseName}
                                                            </option>
                                                        );
                                                    })}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col
                                        xs="12"
                                        md="3"
                                        className="mt-3 mt-md-0"
                                    >
                                        <FormGroup>
                                            <Label for="exampleSelect">
                                                Grades
                                            </Label>
                                            <Input
                                                id="exampleSelect"
                                                required
                                                name="grade"
                                                type="select"
                                                value={el.grade}
                                                onChange={(e) => {
                                                    setAddProgress(
                                                        (prevState) => {
                                                            prevState[idx][
                                                                e.target.name
                                                            ] = e.target.value;
                                                            return [
                                                                ...prevState,
                                                            ];
                                                        }
                                                    );
                                                }}
                                            >
                                                <option selected>
                                                    Please select
                                                </option>
                                                {globalConst.grades.map(
                                                    (el, idx) => {
                                                        return (
                                                            <option
                                                                value={el.value}
                                                            >
                                                                {el.label}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col
                                        xs="12"
                                        md="3"
                                        className="mt-3 mt-md-0"
                                    >
                                        <FormGroup>
                                            <Label for="exampleSelect">
                                                Interest
                                            </Label>
                                            <Input
                                                id="exampleSelect"
                                                name="interest"
                                                required
                                                type="select"
                                                value={el.interest}
                                                onChange={(e) => {
                                                    setAddProgress(
                                                        (prevState) => {
                                                            prevState[idx][
                                                                e.target.name
                                                            ] = e.target.value;
                                                            return [
                                                                ...prevState,
                                                            ];
                                                        }
                                                    );
                                                }}
                                            >
                                                <option selected>
                                                    Please select
                                                </option>
                                                {globalConst.interestLevel.map(
                                                    (el, idx) => {
                                                        return (
                                                            <option
                                                                value={el.value}
                                                            >
                                                                {el.label}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    {addProgress.length > 1 ? (
                                        <Col
                                            className="d-flex align-items-center justify-content-center"
                                            xs="1"
                                        >
                                            <button
                                                className=" border border-none bg-primary rounded-pill px-2 text-white"
                                                onClick={() => {
                                                    setAddProgress(
                                                        (prevState) => {
                                                            prevState =
                                                                prevState.filter(
                                                                    (_, _idx) =>
                                                                        _idx !==
                                                                        idx
                                                                );
                                                            return [
                                                                ...prevState,
                                                            ];
                                                        }
                                                    );
                                                    setDeletedQuestions(
                                                        (prevState) => [
                                                            ...prevState,
                                                            el.id,
                                                        ]
                                                    );
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
                                    type="button"
                                    onClick={() => {
                                        addProgress[0].courseCode &&
                                        addProgress[0].grade &&
                                        addProgress[0].interest
                                            ? setAddProgress([
                                                  ...addProgress,
                                                  {
                                                      courseCode: "",
                                                      grade: "",
                                                      interest: "",
                                                      id: firebase
                                                          .firestore()
                                                          .collection("courses")
                                                          .doc().id,
                                                  },
                                              ])
                                            : toast.warn(
                                                  "Please select all fields first",
                                                  {
                                                      autoClose: 2000,
                                                  }
                                              );
                                    }}
                                >
                                    <i className="fas fa-plus text-white "></i>
                                </button>
                            </Col>
                        </Row>
                      
                        <Row className="mt-3">
                            <Col className="d-flex justify-content-center align-items-center">
                                <button onSubmit={<Redirect to='/StudentDashboard' />}
                                    className="border border-none bg-primary rounded-pill px-5 text-white"
                                    type="submit"
                                >
                                    SAVE
                                </button>
                                
                            </Col>
                        </Row>
                        </Container>
                    </Form>
                </Container>
                
            )}
        </>
    );
}

export default Progress;
