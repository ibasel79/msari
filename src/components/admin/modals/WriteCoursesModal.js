import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Spinner,
} from "reactstrap";
import Select from "react-select";
import { addCourses, editCourses } from "../../../store/actions/coursesActions";
import { getMajors } from "../../../store/actions/AdminCertificationsAction";

const WriteCoursesModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    let isEditMode = editData !== null;
    // console.log(editData, "editData");
    const [coursesData, setCoursesData] = useState({
        courseName: "",
        courseCode: "",
    });
    const [Majors, setMajors] = useState([]);
    let { addloader } = useSelector((state) => state.course);
    let { majors } = useSelector((state) => state.certification);

    const dispatch = useDispatch();
    const majorsHandle = (Majors) => {
        setMajors(Majors);
    };
    const CollectMajors = () => {
        let tempArr = [];
        majors.forEach((element) => {
            tempArr.push({ value: element.id, label: element.name });
        });
        return tempArr;
    };
    const addAdminHandle = (e) => {
        dispatch(
            addCourses(coursesData, Majors, () => {
                setIsOpen((prevState) => !prevState);
                clearFields();
                setEditData(null);
            })
        );
    };
    const clearFields = () => {
        console.log("clearFields");
        setCoursesData({
            courseName: "",
            courseCode: "",
        });
        setMajors([]);
    };

    const editCourseHandle = () => {
        dispatch(
            editCourses(coursesData, editData.id, Majors, () => {
                setIsOpen((prevState) => !prevState);
                clearFields();
                setEditData(null);
            })
        );
    };
    const handleChange = (e) => {
        setCoursesData((obj) => ({
            ...obj,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        console.log(editData);
        if (editData) {
            setCoursesData({
                courseName: editData.courseName,

                courseCode: editData.courseCode,
            });
            let temp = [];
            editData.majors?.forEach((el) =>
                temp.push({
                    value: el,
                    label: collectMajors(el),
                })
            );
            setMajors(temp);
        }
    }, [editData]);
    const collectMajors = (id) => {
        let obj = majors?.find((major) => major.id == id);
        if (obj) {
            return obj.name;
        } else {
            return "N/A";
        }
    };
    useEffect(() => {
        dispatch(getMajors());
    }, []);
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setEditData(null);
                    clearFields();
                    setIsOpen((prevState) => !prevState);
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Course
            </ModalHeader>
            <ModalBody className=" border-border-none my-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        isEditMode ? editCourseHandle() : addAdminHandle();
                    }}
                >
                    <Input
                        placeholder="Course Name"
                        required
                        className="mt-2"
                        name="courseName"
                        value={coursesData.courseName}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    ></Input>
                    {!isEditMode && (
                        <Input
                            placeholder="Course Code"
                            required
                            className="mt-2"
                            name="courseCode"
                            value={coursesData.courseCode}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        ></Input>
                    )}
                    <Select
                        options={CollectMajors()}
                        className="mt-2"
                        isMulti
                        placeholder="Majors"
                        value={Majors}
                        onChange={majorsHandle}
                    />
                    <div className="text-center">
                        <Button
                            className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                            type="submit"
                        >
                            {/* {isEditMode ? "Save" : "Add"} */}
                            {addloader ? (
                                <Spinner variant="primary" size="sm" />
                            ) : isEditMode ? (
                                "Save"
                            ) : (
                                "Add"
                            )}
                        </Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default WriteCoursesModal;
