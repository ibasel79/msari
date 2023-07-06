import TableView from "../../components/admin/TableView";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin, getAdmin } from "../../store/actions/adminAction";
import { Spinner } from "reactstrap";

import WriteAdminModal from "../../components/admin/modals/WriteAdminModal";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";

const Admins = () => {
    const dispatch = useDispatch();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    let { admin, adminLoading } = useSelector((state) => state.adminReducer);

    const { user } = useSelector((state) => state.authUser);

    const filterData = (id) => {
        const data = admin.filter((element) => element.id !== id);
        return data;
    };

    useEffect(() => {
        dispatch(getAdmin());
    }, []);

    return (
        <>
            <TableView
                icon={<i class="fas text-primary fa-5x fa-user-cog"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedRows={selectedRows}
                id={"admin"}
            >
                {adminLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner />
                        <small className="mt-2">
                            <strong>Loading...</strong>
                        </small>
                    </div>
                ) : (
                    <div className="custom-table">
                        <div className="custom-table-row  custom-table-row--admins">
                            <input
                                type={"checkbox"}
                                onChange={(e) => {
                                    let rows = admin.map((ele) => ele.id);
                                    if (e.target.checked) {
                                        setSelectedRows(rows);
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={
                                    selectedRows.length !== 0 &&
                                    selectedRows.length === admin.length
                                }
                            ></input>
                            <strong>First name</strong>
                            <strong>Last name</strong>
                            <strong>Username</strong>
                        </div>
                        {filterData(user?.uid)?.map((ele, index) => {
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
                                    className="custom-table-row  custom-table-row--admins"
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
                                    <div>{ele?.firstname}</div>
                                    <div>{ele?.lastname}</div>
                                    <div>{ele?.username}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TableView>
            <WriteAdminModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
            <DeleteConfirmationModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
                type="Admin"
                deleteMethod={deleteAdmin}
            />
        </>
    );
};

export default Admins;
