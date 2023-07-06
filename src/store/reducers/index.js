// Root Reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import authUserReducer from "./authUser";
import adminReducer from "./adminReducer";
import studentReducer from "./studentReducer";
import jobsReducer from "./jobsReducer";
import certificationsReducer from "./certificationsReducer";
import coursesReducer from "./coursesReducer";
import questionsReducer from "./questionsReducer";

import academicProgressReducer from "./academicProgressReducer";
import { configReducer } from "./configReducer";

export let rootReducer = combineReducers({
    authUser: authUserReducer,
    authReducer: authReducer,
    adminReducer: adminReducer,
    studentReducer: studentReducer,
    job: jobsReducer,
    certification: certificationsReducer,
    course: coursesReducer,
    question: questionsReducer,
    academicProgress: academicProgressReducer,
    config: configReducer,
});

export default rootReducer;
