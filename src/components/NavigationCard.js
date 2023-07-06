import React from "react";
import { useHistory } from "react-router-dom";
const NavigationCard = ({ icon, route, title }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(route);
    };
    return (
        <div
            onClick={() => {
                handleClick();
            }}
            className=" card-1 p-3 d-flex justify-content-center flex-column align-items-center radius-12 pointer"
        >
            {icon}
            <small className="text-white mt-4">
                <strong>{title}</strong>
            </small>
        </div>
    );
};

export default NavigationCard;
