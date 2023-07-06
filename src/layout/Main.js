import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";

const Main = (props) => {
    let { uid, user } = useSelector((state) => state.authUser);
    const history = useHistory();
    if (!uid) {
        history.push("/login");
    }
    return (
        <>
            <Header />
            {props.children}
            {/* <footer>Main Footer</footer> */}
        </>
    );
};

export default Main;
