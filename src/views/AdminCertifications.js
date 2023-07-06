import { TableView } from "../components/jobs/TableView";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import WriteAdminModal from "./adminModals/WriteAdminModal";
import WriteJobsModal from "../components/dashboard/adminModals/WriteJobsModal";
// import { getAdmin } from "../../store/actions/adminAction";
import { Spinner } from "reactstrap";
import { getJobs } from "../store/actions/jobsAction";
import DeleteJobsModal from "../components/jobs/DeleteJobsModal";
import CertificationsModal from "../components/adminCertifications/CertificationsModal";
import { getCertifications } from "../store/actions/AdminCertificationsAction";

const AdminCertifications = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    // console.log("editData", editData);
    const [selectedRows, setSelectedRows] = useState([]);
    // console.log("selectedRows", selectedRows);

    let { certifications, getLoading } = useSelector(
        (state) => state.certification
    );

    useEffect(() => {
        dispatch(getCertifications());
    }, []);

    return (
        <>
            <TableView
                icon={<i class="fas text-primary fa-5x fa-certificate"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                id={"certifications"}
            >
                {getLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner />
                        <small className="mt-2">
                            <strong>Loading...</strong>
                        </small>
                    </div>
                ) : certifications.length === 0 ? (
                    <div className="custom-table">
                        <small className="custom-table-row justify-content-center">
                            <strong>No Certification Found</strong>
                        </small>
                    </div>
                ) : (
                    <div className="custom-table">
                        <div className="custom-table-row  custom-table-row--jobs">
                            <input
                                type={"checkbox"}
                                onChange={(e) => {
                                    let rows = certifications?.map(
                                        (ele) => ele.id
                                    );
                                    if (e.target.checked) {
                                        setSelectedRows(rows);
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={
                                    selectedRows.length !== 0 &&
                                    selectedRows.length ===
                                        certifications.length
                                }
                            ></input>
                            <strong>Title</strong>
                            <strong>Offered by</strong>
                            <strong>Price</strong>
                            <strong>Duration</strong>
                            <strong>Website url</strong>
                        </div>
                        {certifications?.map((ele, index) => {
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
                                    <div>{ele?.price}</div>
                                    <div>{ele?.duration}</div>
                                    <div>{ele?.websiteURL}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TableView>
            <CertificationsModal
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

export default AdminCertifications;
