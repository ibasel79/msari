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
import { authRegister } from "../../../store/actions/authAction";
import { editStudent } from "../../../store/actions/studentAction";
const WriteStudentModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    let isEditMode = editData !== null;

    let { editStudentLoading } = useSelector((state) => state.studentReducer);

    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [onAddStudent, setOnAddStudent] = useState({
        email: "",
        firstname: "",
        gpa: 0.0,
        lastname: "",
        username: "",
    });

    const addStudentHandle = () => {
        dispatch(
            authRegister(onAddStudent, password, () => {
                setIsOpen((prevState) => !prevState);
                clearFields();
            })
        );
    };

    const clearFields = () => {
        setOnAddStudent({
            email: "",
            firstname: "",
            gpa: 0.0,
            lastname: "",
            username: "",
        });
        setPassword("");
        setEditData(null);
    };

    const editStudentHandle = () => {
        let { email, ...rest } = onAddStudent;
        dispatch(
            editStudent(rest, editData.id, () => {
                setIsOpen((prevState) => !prevState);
                clearFields();
            })
        );
    };
    const HandleChange = (e) => {
        if (e.target.name == "gpa") {
            setOnAddStudent((obj) => ({
                ...obj,
                [e.target.name]: Number(e.target.value),
            }));
        } else {
            setOnAddStudent((obj) => ({
                ...obj,
                [e.target.name]: e.target.value,
            }));
        }
    };
    useEffect(() => {
        if (editData) {
            setOnAddStudent({
                email: editData.email,
                firstname: editData.firstname,
                gpa: editData.gpa,
                lastname: editData.lastname,
                username: editData.username,
            });
        }
    }, [editData]);
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
                {isEditMode ? "Edit" : "Add"} Student
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();

                        isEditMode ? editStudentHandle() : addStudentHandle();
                    }}
                >
                    <Input
                        required
                        name="firstname"
                        placeholder="First Name"
                        type="name"
                        className="mt-2"
                        value={onAddStudent.firstname}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        type="name"
                        name="lastname"
                        placeholder="Last Name"
                        className="mt-2"
                        value={onAddStudent.lastname}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    {!isEditMode && (
                        <Input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="mt-2"
                            value={onAddStudent.email}
                            onChange={(e) => {
                                HandleChange(e);
                            }}
                        ></Input>
                    )}
                    <Input
                        required
                        type="number"
                        step="0.01"
                        name="gpa"
                        placeholder="Gpa"
                        className="mt-2"
                        value={onAddStudent.gpa}
                        max={5}
                        min={0}           
                        onKeyDown={(e) => {
                          // Allow all key presses
                      }}
                          onChange={(e) => {
                              const value = e.target.value;
                                if (/^\d+(\.\d{1,2})?$/.test(value) && value <= 5) {
                                    HandleChange(e);
                                    }
                                  }}
                       

                    ></Input>
                    <Input
                        required
                        type="name"
                        name="username"
                        placeholder="Username"
                        className="mt-2"
                        value={onAddStudent.username}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    {isEditMode ? (
                        ""
                    ) : (
                        <Input
                            required
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="mt-2"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></Input>
                    )}

                    <Button
                        className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                        type="submit"
                    >
                        {editStudentLoading ? (
                            <Spinner variant="primary" size="sm" />
                        ) : isEditMode ? (
                            "Save"
                        ) : (
                            "Add"
                        )}
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default WriteStudentModal;
