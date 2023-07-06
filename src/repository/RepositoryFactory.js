import AdminRespository from "./AdminRepository";
import StudentRepository from "./StudentRepository";

const repositories = {
    admin: AdminRespository,
    student: StudentRepository,
};
export const RepositoryFactory = {
    get: (name) => repositories[name],
};
