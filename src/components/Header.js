import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Import } from "react-import";
// import { Col, Container, Row } from "reactstrap";

import { logout } from "../store/actions/authAction";

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    var w = document.documentElement.clientWidth || window.innerWidth;
   
    return (
        
        <Container fluid className="myheader py-2" style={{paddingRight:"580px"}}>
        
             
            <Row className="lay">
                <Col className="lay d-flex justify-content-left align-items-center">
                   {/* <button  className="tabs"   onClick={() => {
                            history.push("/");
                            // dispatch(logout());
                        }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.0"
                        width="30pt"
                        height="30pt"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                        className="pointer"
                    >
                        <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#fff"
                            stroke="none"
                        >
                            <path d="M2443 5105 c-130 -36 -94 -3 -1246 -1153 -598 -598 -1101 -1107 -1117 -1131 -124 -185 -99 -433 59 -592 92 -91 209 -139 343 -139 l68 0 0 -800 c0 -541 4 -816 11 -852 38 -182 185 -347 367 -410 66 -23 71 -23 554 -23 476 0 487 0 514 21 15 11 37 33 48 48 21 27 21 40 26 695 l5 668 30 49 c38 61 115 110 189 119 28 4 168 5 311 3 l260 -3 53 -29 c50 -28 82 -61 113 -116 11 -21 15 -144 19 -692 5 -654 5 -667 26 -694 11 -15 33 -37 48 -48 27 -21 38 -21 514 -21 483 0 488 0 554 23 182 63 329 228 367 410 7 36 11 311 11 852 l0 800 68 0 c240 0 434 163 474 398 15 92 0 190 -43 282 -29 60 -116 150 -1118 1153 -597 598 -1107 1101 -1133 1118 -26 17 -71 40 -100 51 -70 27 -204 33 -275 13z" />
                        </g>
                    </svg>
                    </button> */}
                </Col>
                
                   

                    

                <Col  className=" laytab align-items-center " >

                
               

                {/* <details className="details1">
                    <summary className="fas fa-bars summary1"></summary> */}
                    <button
            
            className="tabs"
            onClick={() => {
                history.push("/");
                // dispatch(logout());
            }}
        >
            Home
        </button>{" "}

                    <button
                
                        className="tabs"
                        onClick={() => {
                            history.push("/aboutus");
                            // dispatch(logout());
                        }}
                    >
                        Mission
                    </button>{" "}
                    
                    <button
                        
                        className="tabs"
    
                        onClick={() => {
                            history.push("/FAQ");
                            // dispatch(logout());
                        }}
                    >
                        FAQ
                    </button>{" "}


                    
                    {/* </details> */}
                </Col>
                
                <Col   className="d-flex justify-content-center align-items-center">
                <button  
                style={{marginLeft:"100px" , width:"150px" }}
    
                className="tabs"
                onClick={() => {
                            history.push("/");
                            
                        }}>

                        <img className="msari"
                        src="/Picture1.png"
                        
                        
                        
                        
                      />

                        </button>

                    
                    
                </Col>
               

                <Col className="logout d-flex flex-row-reverse align-items-center"  style={{marginRight:"-500px"  }}>
                    <button
                    style={{minHeight:"30px"}}
                        className="border border-none bg-white rounded-pill px-ml-5 px-3 h-50 text-primary"
                        onClick={() => {
                            // history.push("/login");
                            dispatch(logout());
                        }}
                    >
                        Logout
                    </button>{" "}
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
