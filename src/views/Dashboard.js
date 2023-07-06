import { useSelector } from "react-redux";
import AdminDashboard from "../components/admin/AdminDashboard";
import StudentDashboard from "../components/student/StudentDashboard";
import StudentDashboardtest from "../components/student/StudentDashboardtest";

const Dashboard = (props) => {
    const { user } = useSelector((state) => state.authUser);
    return (
        <>
            {user && user.role === "admin" ? (
                <AdminDashboard />
            ) : (
                <StudentDashboardtest/>
            )}
        </>
    );
};

export default Dashboard;
