import { RepositoryFactory } from "../../repository/RepositoryFactory";
import firebase from "../../config/firebase";
import { LOGIN_LOADER, ADD_LOADER, ADMIN_LOADING } from "../types";
import { toast } from "react-toastify";

var admin = RepositoryFactory.get("admin");

// export const addLoader = (val) => async (dispatch) => {
//     dispatch({
//         type: ADD_LOADER,
//         payload: val,
//     });
// };
export const adminLoading = (val) => async (dispatch) => {
    dispatch({
        type: ADMIN_LOADING,
        payload: val,
    });
};
export const addAdmin =
    (payload, onComplete = () => {}) =>
    async (dispatch) => {
        try {
            let { data } = await admin.addAdmin(payload);

            if (data.success) {
                toast.success("Admin added successfully !", {
                    autoClose: 2000,
                });
                onComplete({ success: true });
            } else {
                toast.error(data.message, {
                    autoClose: 2000,
                });
                onComplete({ success: false });
            }
        } catch (e) {
            toast.error(e.message, {
                autoClose: 2000,
            });
            onComplete({ success: false });
        }
    };
export const editAdmin =
    (payload, id, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            let { data } = await admin.updateAdmin(payload, id);

            if (data.success) {
                toast.success("Admin updated successfully !", {
                    autoClose: 2000,
                });
                onSuccess({ success: true });
            } else {
                toast.error(data.message, {
                    autoClose: 2000,
                });
                onSuccess({ success: false });
            }
        } catch (e) {
            toast.error(e.message, {
                autoClose: 2000,
            });
        }
    };
export const deleteAdmin =
    (selectedRows, onSuccess = () => {}) =>
    async (dispatch) => {
        try {
            // dispatch(addLoader(true));
            let deleteIssueArray = [];
            for (let i = 0; i < selectedRows.length; i++) {
                let { data } = await admin.deleteAdmin(selectedRows[i]);
                if (!data.success) {
                    deleteIssueArray.push(selectedRows[i]);
                }
            }
            if (deleteIssueArray.length === 0) {
                // if (data.data.success) {
                toast.success("Admin deleted successfully !", {
                    autoClose: 2000,
                });
                onSuccess();
                // dispatch(addLoader(false));
            } else {
                toast.error(
                    `${
                        selectedRows.length - deleteIssueArray.length
                    } admins deleted, but there are issues with ${
                        deleteIssueArray.length
                    }`,
                    {
                        autoClose: 2000,
                    }
                );
                onSuccess();
            }
            // }
        } catch (e) {
            toast.error(e.message, {
                autoClose: 2000,
            });
            // dispatch(addLoader(false));
            onSuccess();
        }
    };
export const getAdmin = () => async (dispatch) => {
    dispatch(adminLoading(true));
    try {
        await firebase
            .firestore()
            .collection("admins")
            .onSnapshot(async (query) => {
                let tempdata = [];
                query.forEach((doc) => {
                    tempdata.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                dispatch({
                    type: "GET_ADMIN",
                    payload: tempdata,
                });
                dispatch(adminLoading(false));
            });
    } catch (error) {
        dispatch(adminLoading(false));

        toast.error(error.response.data.message, {
            autoClose: 2000,
        });
    }
};
