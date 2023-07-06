import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row } from "reactstrap";

export default function TableView({
    icon,
    isOpen,
    setIsOpen,
    children,
    deleteOpen,
    setDeleteOpen,
    selectedRows,
}) {
    // console.log("selectedRows", selectedRows);
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-5 pb-5">
            {icon}

            <div className=" card-2 radius-12  w-100 p-3 p-sm-5 mt-3 manage-admin">
                <div className="radius-12 bg-white px-1 px-sm-3 manage-admin__records py-3">
                    {children}
                </div>
                <div className="d-flex mt-3 justify-content-between ">
                    {" "}
                    <div>
                        <button
                            className="border border-none bg-white rounded-pill  text-primary"
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                        >
                            Add
                        </button>{" "}
                        <button
                            className="border border-none bg-white rounded-pill  text-primary"
                            onClick={() => {
                                if (selectedRows.length > 0) {
                                    setDeleteOpen(!deleteOpen);
                                } else {
                                    toast.warn("Please select some data !", {
                                        autoClose: 2000,
                                    });
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>{" "}
                    <button className="border border-none bg-white rounded-pill  text-primary">
                        Save
                    </button>{" "}
                </div>
            </div>
        </Container>
    );
}
