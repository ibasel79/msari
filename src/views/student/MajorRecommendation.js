import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
import { getAcademicProgress } from "../../store/actions/academicProgressAction";
import { getCourses } from "../../store/actions/coursesActions";
import { getQuestions } from "../../store/actions/questionsAction";
import globalConst from "../../config/globalConst";
import { getGradeFactor } from "../../store/actions/configAction";

function MajorRecommendation() {
    let dispatch = useDispatch();
    let { progress } = useSelector((state) => state.academicProgress);
    let { questions } = useSelector((state) => state.question);
    let { courses } = useSelector((state) => state.course);
    let { gradeFactor } = useSelector((state) => state.config);
    let [majorRecommendation, setMajorRecommendation] = useState("");
    let [otherMajors, setOtherMajors] = useState([]);
    let [highInterest, setHighInterest] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getQuestions());
            await dispatch(getAcademicProgress());
            await dispatch(getCourses());
            await dispatch(getGradeFactor());
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (progress !== "idle") {
            let trueQuestions = [];
            if (Object.keys(progress).length === 0) return;
            for (let [questionId, value] of Object.entries(
                progress.questions
            )) {
                if (value === true) {
                    trueQuestions.push(
                        questions.find((question) => question.id === questionId)
                    );
                }
            }
            let majorBasedCalculation = {};
            for (let { weightage } of trueQuestions) {
                for (let _weightage of Object.entries(weightage)) {
                    let [major, weight] = _weightage;
                    if (!majorBasedCalculation[major]) {
                        majorBasedCalculation[major] = 0;
                    }
                    majorBasedCalculation[major] += Number(weight);
                }
            }
            let temp = {};
            for (let course of progress.courses) {
                let courseDetail = courses.find(
                    (_course) => _course.id === course.courseCode
                );
                let value = Number(course.grade) + Number(course.interest);
                temp[courseDetail.courseName] = {
                    value,
                    grade: globalConst.grades.find(
                        (grade) => grade.value === Number(course.grade)
                    ).label,
                };
                for (let major of courseDetail.majors) {
                    if (!majorBasedCalculation[major]) {
                        majorBasedCalculation[major] = 0;
                    }

                    if (Object.keys(gradeFactor).includes(major)) {
                        let { operation, value, appliedGrade } =
                            gradeFactor[major];
                        switch (operation) {
                            case "*":
                                if (
                                    appliedGrade.includes(                                        globalConst.grades.find(
                                            (grade) =>
                                                grade.value ===
                                                Number(course.grade)
                                        ).label
                                    )
                                ) {
                                    majorBasedCalculation[major] +=
                                    Number(course.grade) * value + Number(course.interest);
                                }
                                break;
                            case "+":
                                if (
                                    appliedGrade.includes(
                                        globalConst.grades.find(
                                            (grade) =>
                                                grade.value ===
                                                Number(course.grade)
                                        ).label
                                    )
                                ) {
                                    majorBasedCalculation[major] +=
                                    Number(course.grade) + value + Number(course.interest);
                                };
                                
                                break;
                            case "-":
                                if (
                                    appliedGrade.includes(
                                        globalConst.grades.find(
                                            (grade) =>
                                                grade.value ===
                                                Number(course.grade)
                                        ).label
                                    )
                                ) {
                                    majorBasedCalculation[major] +=
                                    Number(course.grade) * value - Number(course.interest);
                                }
                                break;
                            case "/":
                                if (
                                    appliedGrade.includes(
                                        globalConst.grades.find(
                                            (grade) =>
                                                grade.value ===
                                                Number(course.grade)
                                        ).label
                                    )
                                ) {
                                    majorBasedCalculation[major] +=
                                    Number(course.grade) / value + Number(course.interest);
                                }
                                break;
                        }
                    } else {
                        majorBasedCalculation[major] +=
                            Number(course.grade) + Number(course.interest);
                    }
                }
            }
            let entries = Object.entries(temp);
            entries.sort((a, b) => b[1].value - a[1].value);

            setHighInterest(entries);

            if (Object.keys(majorBasedCalculation).length !== 0) {
                // for (let [major, weight] of Object.entries(
                //     majorBasedCalculation
                // )) {
                //     if (Object.keys(gradeFactor).includes(major)) {
                //         let { operation, value } = gradeFactor[major];
                //         switch (operation) {
                //             case "x":
                //                 majorBasedCalculation[major] = weight * value;
                //                 break;
                //             case "+":
                //                 majorBasedCalculation[major] = weight + value;
                //                 break;
                //             case "-":
                //                 majorBasedCalculation[major] = weight - value;
                //                 break;
                //             case "/":
                //                 majorBasedCalculation[major] = weight - value;
                //                 break;
                //         }
                //     }
                // }

                let majorCalculationToArr = Object.entries(
                    majorBasedCalculation
                );
                majorCalculationToArr.sort((a, b) => b[1] - a[1]);
                let [_majorRecommendation, ..._otherMajors] =
                    majorCalculationToArr;
                setMajorRecommendation(_majorRecommendation[0]);
                setOtherMajors(_otherMajors.map((otherMajor) => otherMajor[0]));
            }
            console.log("majorBasedCalculation", majorBasedCalculation);
        }
    }, [progress]);
    return (
        <>
            {progress === "idle" ? (
                <div className="d-flex align-items-center py-5 justify-content-center">
                    <Spinner />
                </div>
            ) : progress === null || Object.keys(progress).length === 0 ? (
                <div className="d-flex align-items-center py-5 justify-content-center">
                    Submit data to get recommendation
                </div>
            ) : (
                <Container className="my-5">
                    <h3 className=" radius-12 text-primary p-3 text-center">
                            </h3>
                            <h3 className="radius-12 text-primary p-3 text-center" >Results</h3>
                    <Row className="bestmajor">
                        <Col className="bestmajor radius-12 text-white p-3 text-center" style={{}}>
                        <h3 className="radius-12 text-white p-3 text-center">Best major</h3>
                            <h1>{majorRecommendation}</h1>
                        </Col>
                    </Row>

                    <Row className="mt-3 justify-content-center" >
                        <Col className="res radius-12 text-white p-5 px-md-3 text-center" style={{marginRight:"10px",maxHeight:200,minHeight:200,maxWidth:550,minWidth:550}}>
                            <h3 className="">Other Majors in order</h3>
                            {otherMajors.map((otherMajor) => (
                                <p className="mb-0">{otherMajor}</p>
                            ))}
                        </Col>
                        <Col className= "res radius-12 text-white p-3 px-md-3 text-center" style={{marginLeft:"10px",maxHeight:200,minHeight:200,maxWidth:550,minWidth:550}}>
                            <h3 className="">Highest interests / Grade</h3>
                            {highInterest.slice(0, 3).map((_highInterest) => (
                                <p className="mb-0">
                                    {_highInterest[0]} /{" "}
                                    {_highInterest[1].grade}
                                </p>
                            ))}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                       
                    </Row>
                </Container>
            )}
        </>
    );
}

export default MajorRecommendation;
