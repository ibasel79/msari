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
import { addAdmin, editAdmin } from "../../../store/actions/adminAction";

const WriteAdminModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    const dispatch = useDispatch();
    let isEditMode = editData !== null;
    let [writeLoading, setWriteLoading] = useState(false);
    let [editLoading, setEditLoading] = useState(false);
    // let { addloader } = useSelector((state) => state.adminReducer);
    const [onAddAdmin, setOnAddAmin] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
    });

    const addAdminHandle = () => {
        setWriteLoading(true);
        dispatch(
            addAdmin(onAddAdmin, ({ success }) => {
                if (success === true) {
                    setIsOpen((prevState) => !prevState);
                    clearFields();
                }
                setWriteLoading(false);
            })
        );
    };
    const editAdminHandle = () => {
        setEditLoading(true);
        dispatch(
            editAdmin(onAddAdmin, editData.id, ({ success }) => {
                if (success == true) {
                    setIsOpen((prevState) => !prevState);
                    setEditLoading(false);
                    clearFields();
                }
                setEditLoading(false);
            })
        );
    };
    const clearFields = () => {
        setOnAddAmin({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
        });
    };

    const HandleChange = (e) => {
        setOnAddAmin((obj) => ({
            ...obj,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        if (editData) {
            setOnAddAmin({
                firstname: editData.firstname,
                lastname: editData.lastname,
                username: editData.username,
                password: editData.password,
            });
        }
    }, [editData]);
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setEditData(null);
                    setIsOpen((prevState) => !prevState);
                    clearFields();
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Admin
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();

                        isEditMode ? editAdminHandle() : addAdminHandle();
                    }}
                >
                    <Input
                        required
                        name="firstname"
                        type="name"
                        placeholder="First Name"
                        className="mt-2"
                        value={onAddAdmin.firstname}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        name="lastname"
                        type="name"
                        placeholder="Last Name"
                        className="mt-2"
                        value={onAddAdmin.lastname}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        name="username"
                        type="name"
                        placeholder="Username"
                        className="mt-2"
                        value={onAddAdmin.username}
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
                            value={onAddAdmin.password}
                            onChange={(e) => {
                                HandleChange(e);
                            }}
                        ></Input>
                    )}

                    <Button
                        className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                        type="submit"
                    >
                        {writeLoading || editLoading ? (
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

export default WriteAdminModal;
