import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { deleteStudent, getStudent } from "../../store/actions/studentAction";
import WriteStudentModal from "../../components/admin/modals/WriteStudentModal";
import TableView from "../../components/admin/TableView";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";

const ManageStudent = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    let { student, studentLoading, editStudentLoading } = useSelector(
        (state) => state.studentReducer
    );

    useEffect(() => {
        dispatch(getStudent());
    }, []);

    return (
        <>
            {/* <TableView
                icon={<i class="fas text-primary fa-5x fa-user"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <div className="custom-table">
                    <div className="custom-table-row  custom-table-row--student">
                        <input type={"radio"}></input>
                        <strong>First name</strong>
                        <strong>Last name</strong>
                        <strong>Username</strong>
                    </div>
                    {studentLoading ? (
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <Spinner />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        student.map((ele, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        setIsOpen(true);
                                        setEditData({ ...ele, index });
                                    }}
                                    className="custom-table-row  custom-table-row--student"
                                >
                                    <input type={"radio"}></input>
                                    <div>{ele.firstname}</div>
                                    <div>{ele.lastname}</div>
                                    <div>{ele.username}</div>
                                </div>
                            );
                        })
                    )}
                </div>
            </TableView> */}
            <TableView
                icon={<i class="fas text-primary fa-5x fa-user"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedRows={selectedRows}
                id={"student"}
            >
                {studentLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner />
                        <small className="mt-2">
                            <strong>Loading...</strong>
                        </small>
                    </div>
                ) : student.length === 0 ? (
                    <div className="custom-table">
                        <small className="custom-table-row justify-content-center">
                            <strong>No Job Found</strong>
                        </small>
                    </div>
                ) : (
                    <div className="custom-table">
                        <div className="custom-table-row  custom-table-row--student">
                            <input
                                type={"checkbox"}
                                onChange={(e) => {
                                    let rows = student.map((ele) => ele.id);
                                    if (e.target.checked) {
                                        setSelectedRows(rows);
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={
                                    selectedRows.length !== 0 &&
                                    selectedRows.length === student.length
                                }
                            ></input>
                            <strong>First name</strong>
                            <strong>Last name</strong>
                            <strong>Username</strong>
                        </div>
                        {student?.map((ele, index) => {
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
                                    className="custom-table-row  custom-table-row--student"
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
                                    <div>{ele.firstname}</div>
                                    <div>{ele.lastname}</div>
                                    <div>{ele.username}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TableView>
            <WriteStudentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
            <DeleteConfirmationModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
                type="student"
                deleteMethod={deleteStudent}
            />
        </>
    );
};

export default ManageStudent;
