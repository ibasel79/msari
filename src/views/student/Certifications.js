import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, Spinner } from "reactstrap";
import CertificateCard from "../../components/student/CertificateCard";
import globalConst from "../../config/globalConst";
import { getAcademicProgress } from "../../store/actions/academicProgressAction";
import { getCertifications } from "../../store/actions/AdminCertificationsAction";
import { getGradeFactor } from "../../store/actions/configAction";
import { getCourses } from "../../store/actions/coursesActions";
import { getQuestions } from "../../store/actions/questionsAction";

function Certifications() {
    let dispatch = useDispatch();
    let { certifications } = useSelector((state) => state.certification);
    let [majorRecommendation, setMajorRecommendation] = useState("");
    let [highInterest, setHighInterest] = useState("");
    let { progress } = useSelector((state) => state.academicProgress);
    let [loading, setLoading] = useState(true);
    
    let { questions } = useSelector((state) => state.question);
    let { courses } = useSelector((state) => state.course);
    let { gradeFactor } = useSelector((state) => state.config);

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
                            case "x":
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
                                        Number(course.grade) * value +
                                        Number(course.interest);
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
                                        Number(course.grade) +
                                        value +
                                        Number(course.interest);
                                }

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
                                        Number(course.grade) * value -
                                        Number(course.interest);
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
                                        Number(course.grade) / value +
                                        Number(course.interest);
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
            }
        }
    }, [progress]);
    useEffect(() => {
        async function fetchData() {
            dispatch(
                getCertifications(majorRecommendation, () => {
                    setLoading(false);
                })
            );
        }
        fetchData();
    }, [majorRecommendation]);
    return (
        <>
            <Container className="my-5">
                <h4 className="text-center text-primary">
                    Recommended Certificates
                </h4>
                {loading ? (
                    <div className="d-flex align-items-center mt-5 justify-content-center">
                        <Spinner />
                    </div>
                ) : (
                    certifications.map((certification) => (
                        <CertificateCard {...certification} />
                    ))
                )}
            </Container>
        </>
    );
}

export default Certifications;
