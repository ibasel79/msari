import Repository from "./Repository";

const ADMIN = "/admin";
export default {
    addAdmin(payload) {
        return Repository.post(`${ADMIN}`, payload);
    },
    updateAdmin(payload, id) {
        return Repository.put(`${ADMIN}/${id}`, payload);
    },
    deleteAdmin(id) {
        return Repository.delete(`${ADMIN}/${id}`);
    },
};
