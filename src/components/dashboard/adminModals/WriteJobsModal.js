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

import { addJobs, editJobs } from "../../../store/actions/jobsAction";

const WriteJobsModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    // console.log("editData", editData);
    const dispatch = useDispatch();
    let isEditMode = editData !== null;
    let { addloader } = useSelector((state) => state.job);
    const [onAddJobs, setOnAddJobs] = useState({
        title: "",
        offeredBy: "",
        location: "",
        duration: "",
        websiteURL: "",
    });
    // console.log("onAddJobs", onAddJobs);
    const clearJobsData = () => {
        setOnAddJobs({
            title: "",
            offeredBy: "",
            location: "",
            duration: "",
            websiteURL: "",
        });
    };

    const addJobsHandle = (e) => {
        dispatch(
            addJobs(onAddJobs, () => {
                setIsOpen((prevState) => !prevState);
                clearJobsData();
            })
        );
    };

    const editJobsHandle = (e) => {
        dispatch(
            editJobs(editData.id, onAddJobs, () => {
                setIsOpen((prevState) => !prevState);
            })
        );
    };
    const HandleChange = (e) => {
        setOnAddJobs((obj) => ({
            ...obj,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        if (editData) {
            setOnAddJobs({
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
                    clearJobsData();
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Jobs
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <Input
                    required
                    name="title"
                    placeholder="Title"
                    className="mt-2"
                    // value={editData ? editData.title : null}
                    value={onAddJobs.title}
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
                    value={onAddJobs.offeredBy}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="location"
                    placeholder="Location"
                    className="mt-2"
                    value={onAddJobs.location}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="duration"
                    placeholder="Duration"
                    className="mt-2"
                    value={onAddJobs.duration}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Input
                    required
                    name="websiteURL"
                    placeholder="Website URL"
                    className="mt-2"
                    value={onAddJobs.websiteURL}
                    onChange={(e) => {
                        HandleChange(e);
                    }}
                ></Input>
                <Button
                    className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                    onClick={
                        isEditMode
                            ? (e) => editJobsHandle(e)
                            : (e) => addJobsHandle(e)
                    }
                >
                    {addloader ? (
                        <Spinner variant="primary" size="sm" />
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

export default WriteJobsModal;
