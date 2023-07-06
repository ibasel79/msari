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
import { addAdmin } from "../../../store/actions/adminAction";

const WriteAdminModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    const dispatch = useDispatch();
    let isEditMode = editData !== null;
    let { addloader } = useSelector((state) => state.adminReducer);
    const [onAddAdmin, setOnAddAmin] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
    });

    const addAdminHandle = (e) => {
        //  console.log(onAddAdmin, "onAddAdmin");
        dispatch(
            addAdmin(onAddAdmin, () => {
                setIsOpen((prevState) => !prevState);
            })
        );
    };

    const editAdminHandle = () => {};
    const HandleChange = (e) => {
        setOnAddAmin((obj) => ({
            ...obj,
            [e.target.name]: e.target.value,
        }));
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
                {isEditMode ? "Edit" : "Add"} Admin
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
                        HandleChange(e);
                    }}
                ></Input>
                <Button
                    className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                    onClick={
                        isEditMode
                            ? (e) => editAdminHandle(e)
                            : (e) => addAdminHandle(e)
                    }
                >
                    {addloader ? (
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

export default WriteAdminModal;
