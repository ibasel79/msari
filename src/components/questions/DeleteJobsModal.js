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
import { deleteJobs } from "../../store/actions/jobsAction";
function DeleteJobsModal({ isOpen, setIsOpen, selectedRows }) {
    let { addloader } = useSelector((state) => state.job);
    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    setIsOpen((prevState) => !prevState);
                }}
                className="d-flex w-100"
            >
                Delete Jobs
            </ModalHeader>
            <ModalBody className="text-center border-border-none my-3">
                <h3>Are you sure you want to delete?</h3>
                <Button
                    className="border border-none bg-primary rounded-pill w-50 text-white mt-3 p-2"
                    onClick={() => {
                        dispatch(
                            deleteJobs(selectedRows, () => {
                                setIsOpen((prevState) => !prevState);
                            })
                        );
                    }}
                >
                    {addloader ? (
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
