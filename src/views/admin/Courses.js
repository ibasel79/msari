import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import WriteCoursesModal from "../../components/admin/modals/WriteCoursesModal";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";
import TableView from "../../components/admin/TableView";
import { deleteCourses, getCourses } from "../../store/actions/coursesActions";
import { getCertifications } from "../../store/actions/AdminCertificationsAction";

const ManageCourses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedRows, setSelectedRows] = useState([]);
    let { courses, courseLoading } = useSelector((state) => state.course);

    const dispatch = useDispatch();
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
    let { majors } = useSelector((state) => state.certification);

    useEffect(() => {
        dispatch(getCourses());
        dispatch(getCertifications());
    }, []);

    return (
        <>
            <TableView
                icon={<i class="fas text-primary fa-5x fa-book-open"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedRows={selectedRows}
                id={"jobs"}
            >
                {courseLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner />
                        <small className="mt-2">
                            <strong>Loading...</strong>
                        </small>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="custom-table">
                        <small className="custom-table-row justify-content-center">
                            <strong>No Courses Found</strong>
                        </small>
                    </div>
                ) : (
                    <div className="custom-table">
                        <div className="custom-table-row  custom-table-row--course">
                            <input
                                type={"checkbox"}
                                onChange={(e) => {
                                    let rows = courses.map((ele) => ele.id);
                                    if (e.target.checked) {
                                        setSelectedRows(rows);
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={
                                    selectedRows.length !== 0 &&
                                    selectedRows.length === courses.length
                                }
                            ></input>

                            <strong>Course Name</strong>
                            <strong>Course Code</strong>
                            <strong>Majors</strong>
                        </div>
                        {courses?.map((ele, index) => {
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
                                    className="custom-table-row  custom-table-row--course"
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
                                    <div>{ele.courseName}</div>
                                    <div>{ele.courseCode}</div>

                                    {ele?.majors?.map((major, idx) => {
                                        return getMajorName(
                                            major,
                                            idx,
                                            ele.majors
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                )}
            </TableView>
            <WriteCoursesModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
            <DeleteConfirmationModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
                deleteMethod={deleteCourses}
                type="Course"
            />
        </>
    );
};

export default ManageCourses;
