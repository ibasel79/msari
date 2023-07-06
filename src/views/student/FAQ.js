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

function FAQ(){

return(

  <div class="container">
  <h1 className="text-center text-primary" style={{padding:"20px"}}>Frequently Asked Questions</h1>
  <details className="aboutus" style={{margin:"20px"}}>
  <summary  >What is Msari?</summary>
  <div>
  Msari is an academic recommendation system designed for the students of College of Computer Science and Information Technology at Imam Abdulrahman Bin Faisal University  that uses your academic progress and your interest to spicify which major will be the best fit for you.
  </div>
</details>

<details className="aboutus" style={{margin:"20px"}}>
<summary>What algorithm dose Msari use for the recommendation? </summary>
  <div>
  Msari uses a score based algorithm to generate a recommendation based on your Answers.
  </div>
</details>

<details className="aboutus" style={{margin:"20px"}}>
<summary>How can I start using  Msari? </summary>
  <div>
  Start by filling the survey by answering a few yes or no questions, then  provide your completed courses ,their grades and your interest level in each subject. 
  </div>
</details>
</div>
);



}
export default FAQ;