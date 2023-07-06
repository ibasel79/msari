import { LOGIN, LOGIN_LOADER, LOGOUT, REGISTER_LOADER } from "../types";
import firebase from "../../config/firebase";
import { toast } from "react-toastify";

export const loginLoader = (val) => async (dispatch) => {
    dispatch({
        type: LOGIN_LOADER,
        payload: val,
    });
};
export const RegisterLoader = (val) => async (dispatch) => {
    dispatch({
        type: REGISTER_LOADER,
        payload: val,
    });
};

export const login = (payload) => async (dispatch) => {
    dispatch(loginLoader(true));
    // console.log("payload", payload);
    let userData = null;
    let studentDocs = await firebase
        .firestore()
        .collection("students")
        .where("username", "==", payload.username)
        .get();
    if (studentDocs.size !== 0) {
        userData = {
            uid: studentDocs.docs[0].id,
            ...studentDocs.docs[0].data(),
            role: "student",
        };
    }
    if (userData === null) {
        let adminDocs = await firebase
            .firestore()
            .collection("admins")
            .where("username", "==", payload.username)
            .get();
        if (adminDocs.size !== 0) {
            userData = {
                uid: adminDocs.docs[0].id,
                ...adminDocs.docs[0].data(),
                role: "admin",
            };
        }
    }
    if (userData === null) {
        dispatch(loginLoader(false));
        toast.error("User not found!!!");
        return;
    }
    let { email } = userData;
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, payload.password)
        .then(async () => {
            dispatch({
                type: LOGIN,
                payload: {
                    ...userData,
                },
            });
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(() => {
            dispatch(loginLoader(false));
        });
};
export const authRegister = (credentials, password, onSuccess = () => {}) => {
    // console.log(credentials,'credentials')
    return async (dispatch) => {
        const isUserWithUsernameAlreadyExists = async (username) => {
            return (
                (
                    await firebase
                        .firestore()
                        .collection("admins")
                        .where("username", "==", username)
                        .get()
                ).size !== 0 ||
                (
                    await firebase
                        .firestore()
                        .collection("students")
                        .where("username", "==", username)
                        .get()
                ).size !== 0
            );
        };

        dispatch(RegisterLoader(true));
        if (await isUserWithUsernameAlreadyExists(credentials.username)) {
            // alert("This username already exist, please add some new username");
            toast.warn(
                "This username already exist, please add some new username!",
                {
                    autoClose: 2000,
                }
            );

            dispatch(RegisterLoader(false));
        } else {
            try {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(credentials.email, password)
                    .then((data) => {
                        firebase
                            .firestore()
                            .collection("students")
                            .doc(data.user.uid)
                            .set({ ...credentials })
                            .then((res) => {
                                dispatch(RegisterLoader(false));
                                dispatch({ type: "REGISTER" });
                                // history.push("/admin/index");
                                dispatch({ type: "ACTION_REQUEST_END" });
                                // alert("Account Created Successfully");
                                toast.success("Account Created Successfully", {
                                    autoClose: 2000,
                                });
                                onSuccess();
                            })
                            .catch((err) => {
                                dispatch(RegisterLoader(false));
                                // alert(err, "danger");
                                toast.warn(err.message, {
                                    autoClose: 2000,
                                });
                            });
                    });
            } catch (error) {
                // alert(error.message);
                toast.warn(error.message, {
                    autoClose: 2000,
                });
                dispatch(RegisterLoader(false));
            }
        }
    };
};

export const resetPassword =
    (email, onSuccess = () => {}, onFail = () => {}) =>
    async (dispatch) => {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                toast.success(
                    `Password reset link has been sent to your email.`
                );
                onSuccess()
            })
            .catch((err) => {
                toast.error(err.message);
                onFail()
            });
    };
export const logout = () => async (dispatch) => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch({
                type: LOGOUT,
                user: "",
                uid: "",
                error: "",
            });
        });
};
