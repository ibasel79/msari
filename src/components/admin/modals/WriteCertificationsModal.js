import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Spinner,
} from "reactstrap";

import {
    addCertifications,
    editCertifications,
    getMajors,
} from "../../../store/actions/AdminCertificationsAction";

const CertificationsModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    // console.log("editData", editData);
    const dispatch = useDispatch();
    let isEditMode = editData !== null;
    let { addloader, majors } = useSelector((state) => state.certification);
    // console.log("majors", majors);
    const [provider, setProvider] = useState([]);
    // console.log("provider", provider);
    const [Majors, setMajors] = useState([]);
    // console.log("Majors", Majors);

    const [certificationsDetails, setCertificationsDetails] = useState({
        name: "",
        description: "",

        websiteURL: "",
    });
    function handleSelectGroup(provider) {
        setProvider(provider);
    }
    const majorsHandle = (Majors) => {
        setMajors(Majors);
    };
    const clearJobsData = () => {
        setCertificationsDetails({
            name: "",
            description: "",
            websiteURL: "",
        });
        setProvider([]);
        setMajors([]);
    };
    const options = [
        {
            value: "Microsoft",
            label: "Microsoft",
        },
        { value: "CompTIA", label: "CompTIA" },
        { value: "Oracle", label: "Oracle" },
        { value: "Cisco", label: "Cisco" },
        { value: "Python Institute", label: "Python Institute" },
        { value: "Coursera", label: "Coursera" },
        { value: "(ISC)²", label: "(ISC)²" },
        { value: "EC-Council", label: "EC-Council" },
    ];
    const CollectMajors = () => {
        let tempArr = [];
        majors.forEach((element) => {
            tempArr.push({ value: element.id, label: element.name });
        });
        return tempArr;
    };
    // console.log("collectMajors", CollectMajors());
    const addJobsHandle = () => {
        dispatch(
            addCertifications(certificationsDetails, provider, Majors, () => {
                setIsOpen((prevState) => !prevState);
                clearJobsData();
            })
        );
    };

    const editJobsHandle = () => {
        dispatch(
            editCertifications(
                editData.id,
                certificationsDetails,
                provider,
                Majors,
                () => {
                    setIsOpen((prevState) => !prevState);
                }
            )
        );
    };
    const HandleChange = (e) => {
        setCertificationsDetails((obj) => ({
            ...obj,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        if (editData) {
            setCertificationsDetails({
                name: editData.name,
                description: editData.description,

                websiteURL: editData.websiteURL,
            });
            let temp = [];
            editData.majors?.forEach((el) =>
                temp.push({
                    value: el,
                    label: collectMajors(el),
                })
            );
            setMajors(temp);
            setProvider({ value: editData.provider, label: editData.provider });
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
                    setIsOpen((prevState) => !prevState);
                    clearJobsData();
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Certifications
            </ModalHeader>
            <ModalBody className=" border-border-none my-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();

                        isEditMode ? editJobsHandle() : addJobsHandle();
                    }}
                >
                    <Input
                        required
                        name="name"
                        placeholder="Name"
                        type="name"
                        className="mt-2"
                        value={certificationsDetails.name}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Select
                        options={options}
                        className="mt-2"
                        placeholder="Provider"
                        value={provider}
                        onChange={handleSelectGroup}
                    />
                    <Select
                        options={CollectMajors()}
                        className="mt-2"
                        isMulti
                        placeholder="Majors"
                        value={Majors}
                        onChange={majorsHandle}
                    />

                    <Input
                        required
                        type="textarea"
                        name="description"
                        placeholder="Description"
                        className="mt-2"
                        value={certificationsDetails.description}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>

                    <Input
                        required
                        type="name"
                        name="websiteURL"
                        placeholder="Website URL"
                        className="mt-2"
                        value={certificationsDetails.websiteURL}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        type="name"
                        name="location"
                        placeholder="Location"
                        className="mt-2"
                        value={certificationsDetails.location}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <Input
                        required
                        type="name"
                        name="duration"
                        placeholder="Duration"
                        className="mt-2"
                        value={certificationsDetails.duration}
                        onChange={(e) => {
                            HandleChange(e);
                        }}
                    ></Input>
                    <div className="text-center">
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
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default CertificationsModal;
