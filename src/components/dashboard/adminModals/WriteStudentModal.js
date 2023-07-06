import React, { useState } from "react";
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
const WriteStudentModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    let isEditMode = editData !== null;
    let { registerLoading } = useSelector((state) => state.authReducer);
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
        console.log(onAddStudent, "setOnAddStudent");
        dispatch(
            authRegister(onAddStudent, password, () => {
                setIsOpen((prevState) => !prevState);
            })
        );
    };

    const editStudentHandle = () => {};
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
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setEditData(null);
                    setIsOpen((prevState) => !prevState);
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Student
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <Input
                    required
                    name="firstname"
                    placeholder="FIRST NAME"
                    className="mt-2"
                    value={editData ? editData.firstname : null}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="lastname"
                    placeholder="LAST NAME"
                    className="mt-2"
                    value={editData ? editData.lastname : null}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="email"
                    placeholder="Email"
                    className="mt-2"
                    value={editData ? editData.email : null}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="gpa"
                    placeholder="GPA"
                    className="mt-2"
                    value={editData ? editData.gpa : null}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="username"
                    placeholder="USERNAME"
                    className="mt-2"
                    value={editData ? editData.username : null}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="password"
                    placeholder="PASSWORD"
                    className="mt-2"
                    value={editData ? editData.password : null}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></Input>
                <Button
                    className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                    onClick={
                        isEditMode
                            ? (e) => editStudentHandle()
                            : (e) => addStudentHandle()
                    }
                >
                    {registerLoading ? (
                        <Spinner variant="primary" />
                    ) : isEditMode ? (
                        "Save"
                    ) : (
                        "Add"
                    )}
                </Button>
            </ModalBody>
        </Modal>
    );
};

export default WriteStudentModal;
