import React from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

const WriteCoursesModal = ({ isOpen, setIsOpen, editData, setEditData }) => {
    let isEditMode = editData !== null;
   // console.log(editData, "editData");
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setEditData(null);
                    setIsOpen((prevState) => !prevState);
                }}
                className="d-flex w-100"
            >
                {isEditMode ? "Edit" : "Add"} Course
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <Input
                    placeholder="COURSE NAME"
                    className="mt-2"
                    value={editData ? editData.course_name : null}
                ></Input>
                <Input
                    placeholder="DEPARTMENT"
                    className="mt-2"
                    value={editData ? editData.department : null}
                ></Input>
                <Input
                    placeholder="CREDIT HOURS"
                    className="mt-2"
                    value={editData ? editData.credit_hr : null}
                ></Input>
                <Input
                    placeholder="COURSE CODE"
                    className="mt-2"
                    value={editData ? editData.course_code : null}
                ></Input>

                <Button className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2">
                    {isEditMode ? "Save" : "Add"}
                </Button>
            </ModalBody>
        </Modal>
    );
};

export default WriteCoursesModal;
