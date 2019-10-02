import React, { Component } from "react";
import { Collapse, Fade, Card, CardBody, Label, Input } from "reactstrap";

class Filters extends Component {
  constructor(props) {
    super();
    this.toggleCustom = this.toggleCustom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      collapse: false,
      custom: [true, false],
      initialvalues: {}
    };
  }

  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      custom: state
    });
  }

  handleChange(name, e) {
    console.log(name);
  }

  render() {
    return (
      <>
        <i
          className="fa fa-filter"
          // color="link"
          onClick={() => this.toggleCustom(0)}
          aria-expanded={this.state.custom[0]}
          aria-controls="exampleAccordion1"
          style={{ cursor: "pointer", color: "#ee7647", fontWeight: "bolder" }}
        >
          &nbsp;&nbsp;&nbsp;Filters
        </i>
        <Collapse
          isOpen={this.state.custom[0]}
          data-parent="#exampleAccordion"
          id="exampleAccordion1"
        >
          <div
            className="container"
            style={{
              backgroundColor: "#ededed",
              padding: "1%",
              borderRadius: "5px"
            }}
          >
            <div className="row">
              <div
                className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
                style={{
                  borderRight: "2px black solid"
                  // borderLeft: "2px black solid"
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Custom Search</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Status</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
                style={{ borderRight: "2px black solid" }}
              >
                <div className="row">
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Reference</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Contact group</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
                style={{ borderRight: "2px black solid" }}
              >
               <div className="row">
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>From</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Contact</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
                style={{ borderRight: "2px black solid" }}
              >
                <div className="row">
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>To</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Owner</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
                style={{ borderRight: "2px black solid" }}
              >
                <div className="row">
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Probability</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                  <div className="col-12">

                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
                style={
                  {
                    //  borderRight: "2px black solid"
                  }
                }
              >
                <div className="row">
                  <div className="col-12">
                    <Label style={{ fontSize: "0.8rem" }}>Stage</Label>
                    <Input
                      name="reference"
                      id="reference"
                      value={this.state.initialvalues.reference}
                      onChange={e => this.handleChange("reference", e)}
                    ></Input>
                  </div>
                  <div className="col-12">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </>
    );
  }
}

export default Filters;
