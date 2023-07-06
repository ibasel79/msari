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

import { addQuestions, editQuestions } from "../../../store/actions/questAction";

const WriteQuestionsModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    // console.log("editData", editData);
    const dispatch = useDispatch();
    let isEditMode = editData !== null;
    let { addloader } = useSelector((state) => state.question);
    const [onAddQuestions, setOnAddQuestions] = useState({
        title: "",
        offeredBy: "",
        location: "",
        duration: "",
        websiteURL: "",
    });
    // console.log("onAddQuestions", onAddQuestions);
    const clearQuestionsData = () => {
        setOnAddQuestions({
            title: "",
            offeredBy: "",
            location: "",
            duration: "",
            websiteURL: "",
        });
    };

    const addQuestionsHandle = (e) => {
        dispatch(
            addQuestions(onAddQuestions, () => {
                setIsOpen((prevState) => !prevState);
                clearQuestionsData();
            })
        );
    };

    const editQuestionsHandle = (e) => {
        dispatch(
            editQuestions(editData.id, onAddQuestions, () => {
                setIsOpen((prevState) => !prevState);
            })
        );
    };
    const HandleChange = (e) => {
        setOnAddQuestions((obj) => ({
            ...obj,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        if (editData) {
            setOnAddQuestions({
                title: editData.title,
                offeredBy: editData.offeredBy,
                location: editData.location,
                duration: editData.duration,
                websiteURL: editData.websiteURL,
            });
        }
    }, [editData]);

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setEditData(null);
                    setIsOpen((prevState) => !prevState);
                    clearQuestionsData();
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Questions
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        isEditMode ? editQuestionsHandle() : addQuestionsHandle();
                    }}
                >
                    <Input
                        required
                        name="title"
                        placeholder="Title"
                        className="mt-2"
                        // value={editData ? editData.title : null}
                        value={onAddQuestions.title}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        name="offeredBy"
                        placeholder="Offered by"
                        className="mt-2"
                        // value={editData ? editData.offeredBy : null}
                        value={onAddQuestions.offeredBy}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        name="location"
                        placeholder="Location"
                        className="mt-2"
                        value={onAddQuestions.location}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        name="duration"
                        placeholder="Duration"
                        className="mt-2"
                        value={onAddQuestions.duration}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        name="websiteURL"
                        placeholder="Website URL"
                        className="mt-2"
                        value={onAddQuestions.websiteURL}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Button
                        className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                        type="submit"
                    >
                        {addloader ? (
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

export default WriteQuestionsModal;
