import React from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../store/actions/authAction";

const Logout = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(logout());
        history.push("/");
    }, []);
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Spinner />
            <span>Loading...</span>
        </div>
    );
};

export default Logout;
