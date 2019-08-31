import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetListingForWorkSheetQCondition } from "../../../shared/worksheetqcondition";
import { GetListingForWorkSheetQ } from "../../../shared/worksheetquestion";
import { GetListingForWorkSheet } from "../../../shared/worksheet";

let questionworksheet=[];

const classes = {
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  },
  plusbutton: {
    color: "white",
    borderRadius: "50px",
    width: "10px",
    cursor: "pointer",
    float: "left"
    // marginTop: '10px',
    // marginLeft: '5px',
  },
  divider: {
    height: "1px",
    backgroundColor: "#CED4DA",
    width: "99%",
    marginLeft: "1px"
  },
  h2: {
    color: "#EE7647"
  }
};


let TemplateAdd = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Tost

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }
  function success() {
    return toast.success("Saved Successfully... ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  let [menushow, setMenushow] = useState(false);

  let [question, setquestion] = useState([
    {
      worksheetQuestionId: 0,
      worksheetID:0,
      question: ""
    },
  ]);

  let [worksheet, setworksheet] = useState([
    {
      worksheetID:0,
      name: ""
    },
  ]);
  

  useEffect(() => {
    getinitiallist();
  }, []);

  async function getinitiallist() {
    
    await GetListingForWorkSheetQ(props.idofquestion,0, 0).then(res => {
        // console.log(props.idofquestion);
        setquestion((question = res.data));
        
      });

    await GetListingForWorkSheet(0, 0).then(res => {
    // console.log(props.idofquestion);
    setworksheet((worksheet = res.data));
    
    });


    return setMenushow((menushow = true));
                        
  }

  

    //Tost

    function errort() {
      // add type: 'error' to options
      return toast.error("Please Select all fields..", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    function success() {
      return toast.success("Saved Successfully... ", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

  let [questionworksheet, setquestionworksheet]=useState();


  let [initialvalue, setInitialValue]= useState({
    expression: '',
    statement: '',
    worksheetQuestionId: '',
    count: 0,
  });

  let handleChangei = (e) =>{
  
    if(e.target.value ==="go to question"){
        
    questionworksheet = (question.map(e => (
    <option value={e.worksheetQuestionId} >{e.question}</option>
    )))
    setquestionworksheet(questionworksheet);  
    }

    else if(e.target.value ==="show question"){
        
    questionworksheet = (question.map(e => (
    <option value={e.worksheetQuestionId} >{e.question}</option>
    )))
    setquestionworksheet(questionworksheet);  
    }
        
    else if(e.target.value ==="go to worksheet"){
    questionworksheet = (worksheet.map(e => (
    <option value={e.worksheetId} >{e.name}</option>
    )))
    setquestionworksheet(questionworksheet);

    }

    else if(e.target.value ==="show worksheet"){
    questionworksheet = (worksheet.map(e => (
    <option value={e.worksheetId} >{e.name}</option>
    )))
    setquestionworksheet(questionworksheet);

    }
}
    
  let handleChange = name => event =>{
    if(name==='statement'){
      setInitialValue({...initialvalue, [name]: event.target.value});
    }
    else if(name==='expression'){
      let namer='expression';
      let index = event.target.selectedIndex;
      
      let optionElement = event.target.childNodes[index];
      setInitialValue({...initialvalue, [name]: parseInt(event.target.value, 10),
        [namer]: optionElement.value});
    }
    else if(name==='worksheetQuestionId'){
      let namer='worksheetQuestionId';
      let index = event.target.selectedIndex;
      let optionElement = event.target.childNodes[index];
      setInitialValue({
        ...initialvalue, [name]: parseInt(event.target.value, 10),
        [namer]: optionElement.value
      });
    }
  }

  let handlebutton =()=>{
    // if(initialvalue.jobTypeId===0|| initialvalue.resourceId===0){
    //   return errort();
    // }
    
    let namer='count';
    setInitialValue({...initialvalue, [namer]: initialvalue.count+1});
    console.log(initialvalue);
    props.submit(initialvalue);
    
  }
  
  return (
    <div>
      {/* <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div> */}
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-1 col-xl-1">
          <Button style={classes.button}
            onClick={handlebutton}
          >Add</Button>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
        <Input type="select" name="select" id="exampleSelect"
          onChange={handleChange('expression')}
        >
            <option selected>--if answer is--</option>
            <option value="equal to">equal to</option>
            <option value="different than">different than</option>
            <option value="less than">less than</option>
            <option value="greater than">greater than</option>
            <option value="other answer">other answer</option>
        </Input>
        </div>
        
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
          <Input
            type="text"
            defaultValue={""}
            placeholder="Type Answer"
            onChange={handleChange('statement')}
          />
        </div>
        
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
        <Input type="select" name="statement" id="exampleSelect"
          onChange={handleChangei}
        >
            <option value="go to question" selected>go to question</option>
            <option value="show question">show question</option>
            <option value="go to worksheet">go to worksheet</option>
            <option value="view worksheet">view worksheet</option>
          </Input>
        </div>

        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
        <Input type="select" name="select"  id="exampleSelect"
          onChange={handleChange('worksheetQuestionId')}
        >
        <option selected>-- Please select --</option>
            {questionworksheet}
          </Input>
        </div>
      </div>
    </div>
  );
};

export default TemplateAdd;
