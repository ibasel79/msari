import React, { useState } from "react";
import WriteCoursesModal from "./adminModals/WriteCoursesModal";
import { TableView } from "./TableView";

const ManageCourses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    let courses = [
        {
            course_name: "AI",
            department: "BSCS",
            credit_hr: "4",
            course_code: "CS-24",
        },
        {
            course_name: "OOP",
            department: "BSCS",
            credit_hr: "4",
            course_code: "CS-24",
        },
        {
            course_name: "PF",
            department: "BSCS",
            credit_hr: "4",
            course_code: "CS-24",
        },
    ];
    return (
        <>
            <TableView
                icon={<i class="fas text-primary fa-5x fa-book-open"></i>}
                records={courses}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <div className="custom-table">
                    <div className="custom-table-row  custom-table-row--course">
                        <input type={"radio"}></input>
                        <strong>Course Name</strong>
                        <strong>Department</strong>
                        <strong>Credit Hrs</strong>
                        <strong>Course Code</strong>
                    </div>
                    {courses.map((ele, index) => {
                        return (
                            <div
                                onClick={() => {
                                    setIsOpen(true);
                                    setEditData({ ...ele, index });
                                }}
                                className="custom-table-row  custom-table-row--course"
                            >
                                <input type={"radio"}></input>
                                <div>{ele.course_name}</div>
                                <div>{ele.department}</div>
                                <div>{ele.credit_hr}</div>
                                <div>{ele.course_code}</div>
                            </div>
                        );
                    })}
                </div>
            </TableView>
            <WriteCoursesModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                setEditData={setEditData}
            />
        </>
    );
};

export default ManageCourses;
