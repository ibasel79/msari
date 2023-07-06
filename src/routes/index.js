import Admins from "../views/admin/Admins";
import AdminCertifications from "../views/admin/Certifications";
import Courses from "../views/admin/Courses";
import Question from "../views/admin/Questions";
import Jobs from "../views/admin/Jobs";
import Students from "../views/admin/Students";

import Certifications from "../views/student/Certifications";
import Aboutus from "../views/student/Aboutus";
import FAQ from "../views/student/FAQ";
import MajorRecommendation from "../views/student/MajorRecommendation";
import Progress from "../views/student/ProgressInformation";
import RecommendedJobs from "../views/student/RecommendedJobs";

import Dashboard from "../views/Dashboard";

import SignUp from "../views/auth/SignUp";
import Login from "../views/auth/Login";
import Logout from "../views/Logout";
import ForgotPassword from "../views/auth/ForgotPassword";
import tessting from "../views/tessting";

let routes = [
    {
        path: "/sign-up",
        component: SignUp,
        layout: "auth",
    },
    {
        path: "/login",
        component: Login,
        layout: "auth",
    },
    {
        path: "/forgot-password",
        component: ForgotPassword,
        layout: "auth",
    },
    {
        path: "/logout",
        component: Logout,
        layout: "main",
    },
    {
        path: "/",
        component: Dashboard,
        layout: "main",
    },
    {
        path: "/progress",
        component: Progress,
        layout: "main",
    },
    {
        path: "/recommendation",
        component: MajorRecommendation,
        layout: "main",
    },
    {
        path: "/admins",
        component: Admins,
        layout: "main",
    },
    {
        path: "/courses",
        component: Courses,
        layout: "main",
    },
    {
        path: "/students",
        component: Students,
        layout: "main",
    },
    {
        path: "/certifications",
        component: Certifications,
        layout: "main",
    },
    {
        path: "/recommended-jobs",
        component: RecommendedJobs,
        layout: "main",
    },
    {
        path: "/jobs",
        component: Jobs,
        layout: "main",
    },
    {
        path: "/questions",
        component: Question,
        layout: "main",
    },
    {
        path: "/admin-certifications",
        component: AdminCertifications,
        layout: "main",
    },
    {
        path: "/aboutus",
        component: Aboutus,
        layout: "main",
    },
    {
        path: "/FAQ",
        component: FAQ,
        layout: "main",
    },
    {
        path: "/tessting",
        component: tessting,
        layout: "main",
    },
];
export default routes;
