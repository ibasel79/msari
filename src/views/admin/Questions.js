import TableView from "../../components/admin/TableView";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WriteQuestionsModal from "../../components/admin/modals/WriteQuestionsModal";
import { Spinner } from "reactstrap";
import { deleteQuestions, getQuestions } from "../../store/actions/questAction";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";

const Quest = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [selectedRows, setSelectedRows] = useState([]);

    // let { questions, getLoading } = useSelector((state) => state.adminReducer);
    let { questions, getLoading } = useSelector((state) => state.question);
    // console.log("questions", questions);

    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    const getweightage = (id, idx, arr) => {
        let obj = weightage?.find((weightage) => weightage.id == id);
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
    let { weightage } = useSelector((state) => state.certification);

    return (
        <>
            <TableView
                icon={<i class="fas text-primary fa-5x fa-briefcase"></i>}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedRows={selectedRows}
                id={"questions"}
            >
                {getLoading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner />
                        <small className="mt-2">
                            <strong>Loading...</strong>
                        </small>
                    </div>
                ) : questions.length === 0 ? (
                    <div className="custom-table">
                        <small className="custom-table-row justify-content-center">
                            <strong>No Question Found</strong>
                        </small>
                    </div>
                ) : (
                    <div className="custom-table">
                        <div className="custom-table-row  custom-table-row--course">
                            <input
                                type={"checkbox"}
                                onChange={(e) => {
                                    let rows = questions.map((ele) => ele.id);
                                    if (e.target.checked) {
                                        setSelectedRows(rows);
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={
                                    selectedRows.length !== 0 &&
                                    selectedRows.length === questions.length
                                }
                            ></input>
                            <strong>description</strong>
                            <strong>Offered by</strong>
                        
                        </div>
                        {questions?.map((ele, index) => {
                            return (
                                <div class="custom-table-row  custom-table-row--course"
                                    onClick={(e) => {
                                        let checkbox = document.getElementById(
                                            `checkbox-${index}`
                                        );
                                        if (!checkbox.contains(e.target)) {
                                            setIsOpen(true);
                                            setEditData({ ...ele, index });
                                        }
                                    }}
                                    className="custom-table-row  custom-table-row--questions"
                                >
                                    <input  className=""
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

                                    
                                    <div style={{padding:20}} >{ele?.description}</div>
                                    
                                    <div className="" style={{display: 'flex', justifyContent:'flex-end'}}>
                                        <a
                                            className="btn btn-sm btn-dark"
                                            target="_blank"
                                        >
                                            <i className="fa fa-eye "></i>
                                        </a>

                                    </div>
                                    {/* <div>
                                    {ele?.weightage?.map((weightage, idx) => {
                                        return getweightage(
                                            weightage,
                                            idx,
                                            ele.weightage
                                        );
                                    })}; </div> */}
                                </div>
                            );
                        })}
                    </div>
                )}
            </TableView>
            <WriteQuestionsModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
            <DeleteConfirmationModal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                selectedRows={selectedRows}
                type="Question"
                deleteMethod={deleteQuestions}
            />
        </>
    );
};

export default Quest;
