import Repository from "./Repository";

const RESOURCE = "/student";
export default {
    addStudent(payload) {
        return Repository.post(`${RESOURCE}`, payload);
    },
    updateStudent(payload, id) {
        return Repository.put(`${RESOURCE}/${id}`, payload);
    },
    deleteStudent(id) {
        return Repository.delete(`${RESOURCE}/${id}`);
    },
};
