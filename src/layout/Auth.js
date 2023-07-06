import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Auth = (props) => {
    let { uid, user } = useSelector((state) => state.authUser);
    // console.log("user", user);
    // console.log("layoutID", uid);
    const history = useHistory();

    if (uid) {
        history.push("/");
    }
    return (
        <>
            {/* <header>Auth Header</header> */}
            {props.children}
            {/* <footer>Auth Footer</footer> */}
        </>
    );
};

export default Auth;
