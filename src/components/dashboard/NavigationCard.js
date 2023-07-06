import React from "react";
import { useHistory } from "react-router-dom";
const NavigationCard = ({ icon, route }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(route);
    };
    return (
        <div
            onClick={()=>{handleClick()}}
            className="m-3 bg-primary p-3 d-flex justify-content-center align-items-center radius-12 pointer"
        >
            {icon}
        </div>
    );
};

export default NavigationCard;
