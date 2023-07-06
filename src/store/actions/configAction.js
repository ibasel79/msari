import firebase from "../../config/firebase";
import { GET_GRADE_FACTOR } from "../types";

export const getGradeFactor = () => async (dispatch) => {
    let gradeFactorDoc = await firebase
        .firestore()
        .collection("__config")
        .doc("gradeFactor")
        .get();
    if (gradeFactorDoc.exists) {
        let gradeFactorData = gradeFactorDoc.data();
        dispatch({ type: GET_GRADE_FACTOR, payload: gradeFactorData });
    }
};
