const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { addAdminSchema, updateAdminSchema } = require("./validations/Admin");
const {
    addStudentSchema,
    updateStudentSchema,
} = require("./validations/Student");

const app = express();
app.use(cors({ origin: "*" }));

const studentRoute = express.Router();
const adminRoute = express.Router();

studentRoute.use(cors({ origin: "*" }));
adminRoute.use(cors({ origin: "*" }));

const firebaseConfig = {
    apiKey: "AIzaSyAsirmZ-II2NFNSGUSf9-kdVoa0yaH_j-8",
    authDomain: "course-platform-6bd85.firebaseapp.com",
    projectId: "course-platform-6bd85",
    storageBucket: "course-platform-6bd85.appspot.com",
    messagingSenderId: "457460266841",
    appId: "1:457460266841:web:8e84cbb70b91666128be48",
    measurementId: "G-RDF8JFR122",
};

admin.initializeApp(firebaseConfig);

const successResponse = (message) => {
    return {
        success: true,
        message,
    };
};

const errorResponse = (message) => {
    return {
        success: false,
        message,
    };
};

const isUserWithUsernameAlreadyExists = async (username) => {
    return (
        (
            await admin
                .firestore()
                .collection("admins")
                .where("username", "==", username)
                .get()
        ).size !== 0 ||
        (
            await admin
                .firestore()
                .collection("students")
                .where("username", "==", username)
                .get()
        ).size !== 0
    );
};

// Student Routes
studentRoute.post("/", async (request, response) => {
    try {
        let validatedPayload = addStudentSchema.validate(request.body);
        if (validatedPayload.error) {
            let error = validatedPayload.error.details.map(
                (detail) => detail.message
            );
            return response.json(errorResponse(error.join(",")));
        }
        let { password, ...rest } = request.body;
        if (await isUserWithUsernameAlreadyExists(rest.username)) {
            return response.json(
                errorResponse(
                    `User with username:${rest.username} already exist.`
                )
            );
        }
        admin
            .auth()
            .createUser({
                email: rest.email,
                password,
                displayName: rest.username,
                disabled: false,
                emailVerified: false,
            })
            .then((userRecord) => {
                admin
                    .firestore()
                    .collection("students")
                    .doc(userRecord.uid)
                    .set({ ...rest })
                    .then(() => {
                        response.json(
                            successResponse("Student created successfully.")
                        );
                    })
                    .catch((err) => {
                        response.json(errorResponse(err.message));
                    });
            })
            .catch((err) => {
                response.json(errorResponse(err.message));
            });
    } catch (err) {
        response.json(errorResponse(err.message));
    }
});
studentRoute.put("/:id", async (request, response) => {
    try {
        let validatedPayload = updateStudentSchema.validate(request.body);
        if (validatedPayload.error) {
            let error = validatedPayload.error.details.map(
                (detail) => detail.message
            );
            return response.json(errorResponse(error.join(",")));
        }
        let { email, password, ...rest } = request.body;
        let { id } = request.params;
        let studentDoc = await admin
            .firestore()
            .collection("students")
            .doc(id)
            .get();
        if (!studentDoc.exists) {
            return response.json(errorResponse("Student doesn't exists"));
        }
        let studentData = studentDoc.data();
        if (studentData.username !== rest.username) {
            if (await isUserWithUsernameAlreadyExists(rest.username)) {
                return response.json(
                    errorResponse(
                        `User with username:${rest.username} already exist.`
                    )
                );
            }
        }
        admin
            .firestore()
            .collection("students")
            .doc(id)
            .update({ ...rest })
            .then(() => {
                response.json(successResponse("Student updated successfully."));
            })
            .catch((err) => {
                response.json(errorResponse(err.message));
            });
    } catch (err) {
        response.json(errorResponse(err.message));
    }
});
studentRoute.delete("/:id", (request, response) => {
    try {
        let { id } = request.params;
        admin
            .auth()
            .deleteUser(id)
            .then(() => {
                admin
                    .firestore()
                    .collection("students")
                    .doc(id)
                    .delete()
                    .then(() => {
                        response.json(
                            successResponse("Student deleted successfully.")
                        );
                    })
                    .catch((err) => {
                        response.json(errorResponse(err.message));
                    });
            })
            .catch((err) => {
                response.json(errorResponse(err.message));
            });
    } catch (err) {
        response.json(errorResponse(err.message));
    }
});

// Admin Routes
adminRoute.post("/", async (request, response) => {
    try {
        let validatedPayload = addAdminSchema.validate(request.body);
        if (validatedPayload.error) {
            let error = validatedPayload.error.details.map(
                (detail) => detail.message
            );
            return response.json(errorResponse(error.join(",")));
        }
        let { password, ...rest } = request.body;
        if (await isUserWithUsernameAlreadyExists(rest.username)) {
            return response.json(
                errorResponse(
                    `User with username:${rest.username} already exist.`
                )
            );
        }
        let adminDoc = await admin
            .firestore()
            .collection("__config")
            .doc("admin")
            .get();
        let { id } = adminDoc.data();

        let email = `admin${String(id).padStart("7", "0")}@gmail.com`;

        admin
            .auth()
            .createUser({
                email: email,
                password,
                displayName: rest.username,
                disabled: false,
                emailVerified: true,
            })
            .then(async (userRecord) => {
                await admin
                    .firestore()
                    .collection("__config")
                    .doc("admin")
                    .update({
                        id: admin.firestore.FieldValue.increment(1),
                    });
                admin
                    .firestore()
                    .collection("admins")
                    .doc(userRecord.uid)
                    .set({ ...rest, email })
                    .then(() => {
                        response.json(
                            successResponse("Admin created successfully.")
                        );
                    })
                    .catch((err) => {
                        response.json(errorResponse(err.message));
                    });
            })
            .catch((err) => {
                response.json(errorResponse(err.message));
            });
    } catch (err) {
        response.json(errorResponse(err.message));
    }
});
adminRoute.put("/:id", async (request, response) => {
    let validatedPayload = updateAdminSchema.validate(request.body);
    if (validatedPayload.error) {
        let error = validatedPayload.error.details.map(
            (detail) => detail.message
        );
        return response.json(errorResponse(error.join(",")));
    }
    try {
        let { email, password, ...rest } = request.body;
        let { id } = request.params;
        let adminDoc = await admin
            .firestore()
            .collection("admins")
            .doc(id)
            .get();
        if (!adminDoc.exists) {
            return response.json(errorResponse("Admin doesn't exists"));
        }
        let adminData = adminDoc.data();
        if (adminData.username !== rest.username) {
            if (await isUserWithUsernameAlreadyExists(rest.username)) {
                return response.json(
                    errorResponse(
                        `User with username:${rest.username} already exist.`
                    )
                );
            }
        }

        admin
            .firestore()
            .collection("admins")
            .doc(id)
            .update({ ...rest })
            .then(() => {
                response.json(successResponse("Admin updated successfully."));
            })
            .catch((err) => {
                response.json(errorResponse(err.message));
            });
    } catch (err) {
        response.json(errorResponse(err.message));
    }
});
adminRoute.delete("/:id", (request, response) => {
    try {
        let { id } = request.params;
        admin
            .auth()
            .deleteUser(id)
            .then(() => {
                admin
                    .firestore()
                    .collection("admins")
                    .doc(id)
                    .delete()
                    .then(() => {
                        response.json(
                            successResponse("Admins deleted successfully.")
                        );
                    })
                    .catch((err) => {
                        response.json(errorResponse(err.message));
                    });
            })
            .catch((err) => {
                response.json(errorResponse(err.message));
            });
    } catch (err) {
        response.json(errorResponse(err.message));
    }
});

exports.student = functions.https.onRequest(studentRoute);
exports.admin = functions.https.onRequest(adminRoute);
