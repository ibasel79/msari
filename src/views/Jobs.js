import { TableView } from "../components/jobs/TableView";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import WriteAdminModal from "./adminModals/WriteAdminModal";
import WriteJobsModal from "../components/dashboard/adminModals/WriteJobsModal";
// import { getAdmin } from "../../store/actions/adminAction";
import { Spinner } from "reactstrap";
import { getJobs } from "../store/actions/jobsAction";
import DeleteJobsModal from "../components/jobs/DeleteJobsModal";

const Jobs = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    // console.log("editData", editData);
    const [selectedRows, setSelectedRows] = useState([]);
    console.log("selectedRows", selectedRows);

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
                    <div className="custom-table joblist">
                        <div className="custom-table-row  custom-table-row--jobs joblist">
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
                                    <div>{ele?.websiteURL}</div>
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
            <DeleteJobsModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
            />
        </>
    );
};

export default Jobs;
