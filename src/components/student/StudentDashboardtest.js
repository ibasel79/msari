import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import DetailsCard from "./DetailsCard";
import { useEffect, useState } from "react";
import { Form, FormGroup, Spinner } from "react-bootstrap";

import { toast } from "react-toastify";
// import { Col, Input, Label, Row } from "reactstrap";
import { getQuestions } from "../../store/actions/questionsAction";
import globalConst from "../../config/globalConst";
import { getCourses } from "../../store/actions/coursesActions";
import {
    saveAcademicProgress,
    getAcademicProgress,
} from "../../store/actions/academicProgressAction";
// import {progress, dispatch} from "../routes/Progress";
// import { useNavigate } from "react-router-dom";
// import firebase from "../../config/firebase";
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import logo from "./src/assets/logo.png";
// import back from "./assets/img/back.jpg" ;
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBook, faClipboardList, faBriefcase } from "@fortawesome/free-solid-svg-icons";
// import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "../../config/firebase";
import { GET_ACADEMIC_PROGRESS } from "/coding/msari-course-platform-main/msari-course-platform-main/src/store/types";
// import {academicProgressReducer} from "../../store/reducers/academicProgressReducer";
// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');

// const getAP = academicProgressReducer();

var database = firebase.database();
document.body.style.zoom = 1.0;
const StudentDashboardtest = () => {
  const data = [
    {
      icon: <i className=" fas fa-bars fa-5x text-white "></i>,
      route: "/progress",
      title: <h2 style={{color:"white"}}>Survey</h2>,
      Text: <p className="card-4">fill this survey to get a major recomendation </p>
  },
  {
      icon: <i className=" fas fa-calculator fa-5x text-white "></i>,
      route: "/recommendation",
      title: <h2 style={{color:"white"}}>Results</h2> ,
      Text: <p className="card-4">here you can view your major recomendation and your survey results </p>
      
  },
  {
      icon: <i className="fas fa-5x text-white fa-graduation-cap"></i>,
      route: "/certifications",
      title: <h2 style={{color:"white"}}>Certifications</h2>,
      Text: <p className="card-4">Here you can viwe the recommended certifications based on your results</p>
  },
  {
      icon: <i className="fas fa-5x text-white fa-briefcase"></i>,
      route: "/recommended-jobs",
      title: <h2 style={{color:"white"}}>Jobs</h2>,
      Text: <p className="card-4">Here you can viwe job listings and thier information</p>
  },
  ];

  return (
    
    <div className="logo flex">
      <h1 className="welcom text-center my-5" >Welcome to Msari Dashboard</h1>
      <Row className="lapscreen" >
        <Col style={{marginRight:0,marginLeft:0,marginBottom:"200px"}}>
        <Container >
        <DetailsCard className="phonecard" />
        <br></br>
      </Container>
        </Col>
        <Col style={{alignContent:"right",alignItems:"right",paddingRight:-500,marginLeft:-550, position:"relative"}}>
        <Container  >
    
      <div style={{}} >
      {/* <img src="/back.jpg"/> */}
      
      <br></br>
      <Row className="phonehome" style={{marginRight:0}}>
        
        {data.map((el, idx) => (
          <Col xs={12} sm={6} md={3} lg={4} key={idx} className="my-2" style={{marginRight:100}}>
            <br></br>
            <Link to={el.route} className="text-decoration-none">
              <div className="card card-1 shadow-lg rounded-2">
                <div className="d-flex align-items-center">
                  <div className="card-icon">{el.icon}</div>
                  <div style={{marginLeft:-100}} className="card-title mb-2 ml-3">{el.title}</div>
                </div>
                <div className="card-text">{el.Text}</div>
              </div>
              
            </Link>
            
          </Col>
          
        ))}
      </Row>
      </div>
    </Container>
        


        </Col>
      </Row>
      
      
   
    
    </div>
    


  );
  
};


export default StudentDashboardtest;