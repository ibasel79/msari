import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

function DeleteJobsModal({
    isOpen,
    setIsOpen,
    selectedRows,
    type,
    deleteMethod,
}) {
    let [deleteLoader, setDeleteLoader] = useState(false);
    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setIsOpen((prevState) => !prevState);
                }}
                className="d-flex w-100"
            >
                Delete {type}
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <h5>Are you sure you want to delete this {type}?</h5>
                <Button
                    className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                    onClick={() => {
                        setDeleteLoader(true);
                        dispatch(
                            deleteMethod(selectedRows, () => {
                                setIsOpen((prevState) => !prevState);
                                setDeleteLoader(false);
                            })
                        );
                    }}
                >
                    {deleteLoader ? (
                        <Spinner variant="primary" size="sm" />
                    ) : (
                        "Delete"
                    )}
                </Button>
            </ModalBody>
        </Modal>
    );
}

export default DeleteJobsModal;
