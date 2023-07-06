import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, Spinner } from "reactstrap";
import CertificateCard from "../../components/student/CertificateCard";
import globalConst from "../../config/globalConst";
import { getAcademicProgress } from "../../store/actions/academicProgressAction";
import { getCertifications } from "../../store/actions/AdminCertificationsAction";
import { getGradeFactor } from "../../store/actions/configAction";
import { getCourses } from "../../store/actions/coursesActions";
import { getQuestions } from "../../store/actions/questionsAction";

function Aboutus(){

return(

    <>
    <Container className="my-5">
    <h2 className="text-center text-primary">Mission</h2>
    <div className=" aboutus"> 
      
      <p className="text-center pharus">
      Msari is designed for the students of Computer science and information technology college at Imam Abdulrahman bin Faisal university, Msari aims to help students in deciding which major to study based on their academic progress and their personal interest in the subjects.



      </p>
        </div>
        
    </Container>
</>

);



}
export default Aboutus;