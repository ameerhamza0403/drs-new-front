import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom'


let Login=() => {

let HandleChange=()=>{
  return window.location.hash = "#/dashboard";
}
    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Admin" autoComplete="username" value="Admin"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Admin" autoComplete="current-password" value="Admin"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={HandleChange}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                         {/* <Button color="link" className="px-0">Forgot password?</Button>  */}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="" style={{ width: '44%' , background: '#EE7647', color: 'white'}}>
                  <CardBody className="text-center">
                    <div>
                      <h2>DRS Doors Ltd.</h2>
                      <p>Welcome to DRS CRM</p>
                      {/* <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link> */}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }


export default Login;
