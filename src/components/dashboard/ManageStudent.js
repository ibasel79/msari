import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { getStudent } from "../../store/actions/studentAction";
import WriteStudentModal from "./adminModals/WriteStudentModal";
import { TableView } from "./TableView";

const ManageStudent = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    let { student, loginLoading } = useSelector(
        (state) => state.studentReducer
    );

    useEffect(() => {
        dispatch(getStudent());
    }, []);

    return (
        <>
            <TableView
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
                    {loginLoading ? (
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
            </TableView>
            <WriteStudentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
        </>
    );
};

export default ManageStudent;
