import TableView from "../../components/admin/TableView";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "reactstrap";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";
import CertificationsModal from "../../components/admin/modals/WriteCertificationsModal";
import {
    deleteCertifications,
    getCertifications,
} from "../../store/actions/AdminCertificationsAction";

const AdminCertifications = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [selectedRows, setSelectedRows] = useState([]);

    let { certifications, getLoading, majors } = useSelector(
        (state) => state.certification
    );
    // console.log("certifications", certifications);
    const getMajorName = (id, idx, arr) => {
        let obj = majors?.find((major) => major.id == id);
        let temp = arr?.length - 1 > idx;

        if (obj) {
            if (temp) {
                return obj.name + ", ";
            } else {
                return obj.name;
            }
        } else {
            return "N/A";
        }
    };

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
                selectedRows={selectedRows}
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
                        <div className="custom-table-row  custom-table-row--certifications">
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
                            <strong>Name</strong>
                            <strong>Description</strong>
                            <strong>Provider</strong>
                            <strong>Majors</strong>
                            <strong>Website url</strong>
                        </div>
                        {certifications?.map((ele, index) => {
                            // console.log("ids", ele?.majors);
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
                                    className="custom-table-row  custom-table-row--certifications certification"
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
                                    <div>{ele?.name}</div>
                                    <div
                                        title={ele.description}
                                        className="certification__description"
                                    >
                                        {ele?.description}
                                    </div>
                                    <div>{ele?.provider}</div>
                                    <div>
                                        {ele?.majors?.map((major, idx) => {
                                            return getMajorName(
                                                major,
                                                idx,
                                                ele?.majors
                                            );
                                        })}
                                    </div>
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
            <CertificationsModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
            <DeleteConfirmationModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
                type="Certifications"
                deleteMethod={deleteCertifications}
            />
        </>
    );
};

export default AdminCertifications;
