import React, { Component, useState, useEffect } from "react";
import { PostListingForTemplate } from "..//shared/template";
import {
  Button,
  Card,
  CardBody,
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
import "quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import './keyword.scss';

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
  para: {
    cursor: 'pointer',
    color: 'blue',
  }
};


let emailsubject='';
let emailhead='';
let emailfoot='';
let emailbody='';
let AddTemplate = props => {
  // getModalStyle is not a pure function, we roll the style only on the first render

  //Tost

  function errort() {
    // add type: 'error' to options
    return toast.error("Failed with Error...", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }
  function success(response) {
    if (response == "Exception Error") {
      return toast.error('Failed with Error "' + response + '"', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      return toast.success(response, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  async function onSubmit(values, { setSubmitting, setErrors }) {
    console.log(values)
    await PostListingForTemplate(values)
      .then(res => success(res.data.message))
      .catch(error => errort());
    handleOpen();
    props.refresh();
    setSubmitting(false);
  }

  const validationSchema = function(values) {
    return Yup.object().shape({
      name: Yup.string()
        // .min(2, `Make name has to be at least 2 characters`)
        .required("Name is required")
    });
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return getErrorsFromValidationError(error);
      }
    };
  };

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR]
      };
    }, {});
  };

  const initialValues = {
    name: "",
    isActive: true
  };

  function findFirstError(formName, hasError) {
    const form = document.forms[formName];
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus();
        break;
      }
    }
  }

  function validateForm(errors) {
    findFirstError("simpleForm", fieldName => {
      return Boolean(errors[fieldName]);
    });
  }

  function touchAll(setTouched, errors) {
    setTouched({
      name: true
    });
    validateForm(errors);
  }

  let [modal, setModal] = useState(false);

  let handleOpen = () => {
    return setModal((modal = !modal));
  };

  useEffect(()=>{
    // settextforbody(textforbody='');
    // settextforhead(textforhead='');
    // settextforfoot(textforfoot='');
    // settextforsubject(textforsubject='');
  },[]);
  let [textforbody, settextforbody] = useState('<p></p>');
  let [textforhead, settextforhead] = useState('<p></p>');
  let [textforfoot, settextforfoot] = useState('<p></p>');
  let [textforsubject, settextforsubject] = useState('<p></p>');

  let HandleChangequill=name=>value=> {
    if(name==='body'){
      settextforbody(( textforbody= value ));
      console.log(textforbody)
    }
    else if(name==='head'){
      settextforhead(( textforhead= value ));
      console.log(textforhead)
    }
    else if(name==='foot'){
      settextforfoot(( textforfoot= value ));
      console.log(textforfoot)
    }
    else if(name==='subject'){
      settextforsubject(( textforsubject= value ));
      console.log(textforsubject)
    }


  }

  let modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      ['link', 'image'],
      [{ align: [] }],
      // [{handlers: {
      //   "insertKeywords": HandleAddKeyword,
      // }}],
      ["clean"] // remove formatting button
    ],

  };

  let [embody,setEmbody]= useState(false);
  let [emhead,setEmhead]= useState(false);
  let [emfoot,setEmfoot]= useState(false);
  let [emsub,setEmsub]= useState(false);

  function Handlechangebody(){
        setEmbody(true);
        setEmhead(false);
        setEmfoot(false);
        setEmsub(false);
    }
  function Handlechangesubject(){
      setEmbody(false);
      setEmhead(false);
      setEmfoot(false);
      setEmsub(true);
    }

  function Handlechangefoot(){
    setEmbody(false);
        setEmhead(false);
        setEmfoot(true);
        setEmsub(false);
    }
  function Handlechangehead(){
      setEmbody(false);
        setEmhead(true);
        setEmfoot(false);
        setEmsub(false);
    }

  let quill = null;
  function HandleAddKeyword(){
    let kw='{[Hello World]}'
    // console.log(Quill)
      let quillref=quill.getEditor();
      const cursorPosition = quillref.getSelection().index
      // quillref.setHTML(cursorPosition, kw);
      // quillref.clipboard.dangerouslyPasteHTML(cursorPosition, kw);
      quillref.insertText(cursorPosition, kw)
      // quillref.setSelection(cursorPosition + 1)
    }




  if(embody){
    if(emailbody!="<ReactQuill value={textforbody} modules={modules} onChange={HandleChangequill('body')}/>"){
    emailbody=<ReactQuill ref={(el) => { quill= el }} value={textforbody} modules={modules} onChange={HandleChangequill('body')}/>}
  }
  else{
    if(emailbody!="<p onClick={Handlechangebody}>Click to Edit</p>"){
    emailbody=<p style={classes.para} onClick={Handlechangebody}>Click to Edit</p>;}
  }
  if(emhead){
    if(emhead!="<ReactQuill value={textforhead} modules={modules} onChange={HandleChangequill('head')}/>"){
    emailhead=<ReactQuill ref={quill} value={textforhead} modules={modules} onChange={HandleChangequill('head')}/>}
  }
  else{
    if(emailhead!="<p onClick={Handlechangehead}>Click to Edit</p>"){
    emailhead=<p style={classes.para} onClick={Handlechangehead}>Click to Edit</p>;}
  }
  if(emfoot){
    if(emailfoot!="<ReactQuill value={textforfoot} modules={modules} onChange={HandleChangequill('foot')}/>"){
    emailfoot=<ReactQuill ref={quill} value={textforfoot} modules={modules} onChange={HandleChangequill('foot')}/>}
  }
  else{
    if(emailfoot!="<p onClick={Handlechangefoot}>Click to Edit</p>"){
    emailfoot=<p style={classes.para} onClick={Handlechangefoot}>Click to Edit</p>;}
  }
  if(emsub){
    if(emailsubject!="<ReactQuill value={textforsubject} modules={modules} onChange={HandleChangequill('subject')}/>"){
    emailsubject=<ReactQuill ref={quill} value={textforsubject} modules={modules} onChange={HandleChangequill('subject')}/>}
  }
  else{
    if(emailsubject!="<p onClick={Handlechangesubject}>Click to Edit</p>"){
    emailsubject=<p style={classes.para} onClick={Handlechangesubject}>Click to Edit</p>;}
  }


  return (
    <div>
      <div onClick={handleOpen} style={classes.plusbutton}>
        <i className="fa fa-plus-circle fa-2x" />
      </div>

      <Modal
        isOpen={modal}
        toggle={handleOpen}
        className={"modal-primary " + props.className}
        size="xl"
      >
        <ModalHeader toggle={handleOpen}>Template</ModalHeader>
        <ModalBody>
          <div className="container">
            <Formik
              initialValues={initialValues}
              validate={validate(validationSchema)}
              onSubmit={onSubmit}
              render={({
                values,
                errors,
                touched,
                status,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                handleReset,
                setTouched
              }) => (
                <Row>
                  <Col lg="12">
                    <Form onSubmit={handleSubmit} noValidate name="simpleForm">
                      <FormGroup>
                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">Name</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="i.e. DRS Job Confirmation - Callout"
                              // autoComplete="given-name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <FormFeedback>{errors.name}</FormFeedback>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">PDF Orientation</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                          <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="Portrait"
                                    name="orientation"
                                    value={'Portrait'}
                                    onChange={handleChange}
                                  />

                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="Portrait"
                                    for="Portrait"
                                  >
                                    Portrait
                                  </Label>
                                </FormGroup>
                                <FormGroup check inline className="radio">
                                  <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="Landscape"
                                    name="orientation"
                                    value={'Landscape'}
                                    onChange={handleChange}
                                  />
                                  <Label
                                    check
                                    className="form-check-label"
                                    htmlFor="Landscape"
                                    for="Landscape"
                                  >
                                    Landscape
                                  </Label>
                                </FormGroup>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">PDF margin (cm) </Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <Label for="name">Top</Label>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7">
                                    <Input
                                      type="number"
                                      name="top"
                                      id="top"
                                      onChange={handleChange}
                                      value={values.top}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <Label for="name">Bottom</Label>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7">
                                    <Input
                                      type="number"
                                      name="bottom"
                                      id="bottom"
                                      onChange={handleChange}
                                      value={values.bottom}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <Label for="name">Left</Label>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                                    <Input
                                      type="number"
                                      name="left"
                                      id="left"
                                      onChange={handleChange}
                                      value={values.left}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
                                    <Label for="name">Right</Label>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-5 col-lg-7 col-xl-7">
                                    <Input
                                      type="number"
                                      name="right"
                                      id="right"
                                      onChange={handleChange}
                                      value={values.right}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">Add Keywords</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            <Button
                              onClick={HandleAddKeyword}
                              color="secondary"
                              style={classes.button}
                            >
                              Add Keyword
                            </Button>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">Email Subject</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            {emailsubject}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">Email Header</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            {emailhead}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">Email Body</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            {emailbody}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
                            <Label for="name">Email Footer</Label>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-10 col-xl-10">
                            {emailfoot}
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="primary"
                            className="mr-1"
                            style={classes.button}
                            disabled={isSubmitting || !isValid}
                          >
                            {isSubmitting ? "Wait..." : "Submit"}
                          </Button>

                          <Button
                            color="secondary"
                            onClick={handleOpen}
                            style={classes.button}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              )}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddTemplate;
