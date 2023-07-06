import TableView from "../../components/admin/TableView";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WriteJobsModal from "../../components/admin/modals/WriteJobsModal";
import { Spinner } from "reactstrap";
import { deleteJobs, getJobs } from "../../store/actions/jobsAction";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";

const Jobs = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [selectedRows, setSelectedRows] = useState([]);

    // let { jobs, getLoading } = useSelector((state) => state.adminReducer);
    let { jobs, getLoading } = useSelector((state) => state.job);
    // console.log("jobs", jobs);

    useEffect(() => {
        dispatch(getJobs());
    }, []);

    return (
        <>
            <TableView
                icon={<i class="fas text-primary fa-5x fa-briefcase"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedRows={selectedRows}
                id={"jobs"}
            >
                {getLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner />
                        <small className="mt-2">
                            <strong>Loading...</strong>
                        </small>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="custom-table">
                        <small className="custom-table-row justify-content-center">
                            <strong>No Job Found</strong>
                        </small>
                    </div>
                ) : (
                    <div className="custom-table">
                        <div className="custom-table-row  custom-table-row--jobs">
                            <input
                                type={"checkbox"}
                                onChange={(e) => {
                                    let rows = jobs.map((ele) => ele.id);
                                    if (e.target.checked) {
                                        setSelectedRows(rows);
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={
                                    selectedRows.length !== 0 &&
                                    selectedRows.length === jobs.length
                                }
                            ></input>
                            <strong>Title</strong>
                            <strong>Offered by</strong>
                            <strong>Location</strong>
                            <strong>Duration</strong>
                            <strong>Website url</strong>
                        </div>
                        {jobs?.map((ele, index) => {
                            return (
                                <div
                                    onClick={(e) => {
                                        let checkbox = document.getElementById(
                                            `checkbox-${index}`
                                        );
                                        if (!checkbox.contains(e.target)) {
                                            setIsOpen(true);
                                            setEditData({ ...ele, index });
                                        }
                                    }}
                                    className="custom-table-row  custom-table-row--jobs"
                                >
                                    <input
                                        id={`checkbox-${index}`}
                                        type={"checkbox"}
                                        checked={selectedRows.includes(ele.id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            if (
                                                selectedRows.findIndex(
                                                    (row) => row === ele.id
                                                ) === -1
                                            )
                                                setSelectedRows((prevState) => [
                                                    ...prevState,
                                                    ele.id,
                                                ]);
                                            else
                                                setSelectedRows((prevState) =>
                                                    prevState.filter(
                                                        (row) => row !== ele.id
                                                    )
                                                );
                                        }}
                                    ></input>
                                    <div>{ele?.title}</div>
                                    <div>{ele?.offeredBy}</div>
                                    <div>{ele?.location}</div>
                                    <div>{ele?.duration}</div>
                                    <div className="d-flex">
                                        <a
                                            href={ele.websiteURL}
                                            className="btn btn-sm btn-dark"
                                            target="_blank"
                                        >
                                            <i className="fa fa-eye"></i>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TableView>
            <WriteJobsModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
            <DeleteConfirmationModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
                type="Job"
                deleteMethod={deleteJobs}
            />
        </>
    );
};

export default Jobs;
