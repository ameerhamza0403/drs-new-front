import React, { Component } from "react";
import { Collapse, Fade, Card, CardBody, Label, Input } from "reactstrap";
import { Button } from "semantic-ui-react";
import { GetCrmContactPerson } from "../shared/contactperson";
import { GetCrmLead } from "../shared/lead";
import { GetListingForSalesOpportunityStage } from "../../../myaccount/admin/financial/shared/salesopportunitystage";
import { GetListingForSaleProb } from "../../../myaccount/admin/financial/shared/saleprobiltiy";

let filters;
class Filters extends Component {
  constructor(props) {
    super(props);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlesave = this.handlesave.bind(this);
    this.getlistapi = this.getlistapi.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      collapse: false,
      custom: [true, false],
      initialvalues: {},
      person: [],
      lead: [],
      stage: [],
      probability: []
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
    this.setState({
      initialvalues: {
        ...this.state.initialvalues,
        [name]: e.target.value
      }
    });
  }

  handlesave(status) {
    if (status === "apply") {
      this.props.apply(this.state.initialvalues);
    } else if (status === "reset") {
      this.props.reset();
      this.reset();
    }
  }

  reset() {
    this.setState({
      initialvalues: {
        ...this.state.initialvalues,
        ["contactPersonId"]: "",
        ["searchString"]: "",
        ["lead"]: "",
        ["from"]: "",
        ["to"]: "",
        ["salesOpportunityProbabilityId"]: "",
        ["salesOpportunityStageId"]: "",
        ["owner"]: "",
        ["status"]: ""
      }
    });
  }

  componentDidMount() {
    this.getlistapi();
  }

  async getlistapi() {
    await GetCrmContactPerson(0, 0).then(res =>
      this.setState((this.state.person = res.data))
    );

    await GetListingForSalesOpportunityStage(0, 0).then(res =>
      this.setState((this.state.stage = res.data))
    );

    await GetCrmLead(0, 0).then(res =>
      this.setState((this.state.lead = res.data))
    );

    await GetListingForSaleProb(0, 0).then(res =>
      this.setState((this.state.probability = res.data))
    );
  }

  render() {
    filters = (
      <form>
        <div className="row">
          <div
            className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
            style={{
              borderRight: "1px solid darkgrey"
              // borderLeft: "2px black solid"
            }}
          >
            <div className="row">
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>Custom Search-</Label>
                <Input
                  type="text"
                  name="searchString"
                  id="searchString"
                  value={this.state.initialvalues.searchString}
                  onChange={e => this.handleChange("searchString", e)}
                ></Input>
              </div>
              <div className="col-12"></div>
            </div>
          </div>
          <div
            className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
            style={{ borderRight: "1px solid darkgrey" }}
          >
            <div className="row">
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>Lead</Label>
                <Input
                  type="select"
                  name="lead"
                  id="lead"
                  value={this.state.initialvalues.lead}
                  onChange={e => this.handleChange("lead", e)}
                >
                  <option selected>{"All"}</option>
                  {this.state.lead.map(e => (
                    <option value={e.leadId}>{e.name}</option>
                  ))}
                </Input>
              </div>
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>Contact Person-</Label>
                <Input
                  type="select"
                  name="contactPersonId"
                  id="contactPersonId"
                  value={this.state.initialvalues.contactPersonId}
                  onChange={e => this.handleChange("contactPersonId", e)}
                >
                  <option selected>{"All"}</option>
                  {this.state.person.map(e => (
                    <option value={e.contactPersonId}>{e.firstName}</option>
                  ))}
                </Input>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
            style={{ borderRight: "1px solid darkgrey" }}
          >
            <div className="row">
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>(Date between)From</Label>
                <Input
                  type="date"
                  name="from"
                  id="from"
                  value={this.state.initialvalues.from}
                  onChange={e => this.handleChange("from", e)}
                ></Input>
              </div>
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>(and)To</Label>
                <Input
                  type="date"
                  name="to"
                  id="to"
                  value={this.state.initialvalues.to}
                  onChange={e => this.handleChange("to", e)}
                ></Input>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
            style={{ borderRight: "1px solid darkgrey" }}
          >
            <div className="row">
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>Probability-</Label>
                <Input
                  type="select"
                  name="salesOpportunityProbabilityId"
                  id="salesOpportunityProbabilityId"
                  value={this.state.initialvalues.salesOpportunityProbabilityId}
                  onChange={e =>
                    this.handleChange("salesOpportunityProbabilityId", e)
                  }
                >
                  <option selected>{"All"}</option>
                  {this.state.probability.map(e => (
                    <option value={e.salesOpportunityProbabilityId}>
                      {e.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>Stage-</Label>
                <Input
                  type="select"
                  name="salesOpportunityStageId"
                  id="salesOpportunityStageId"
                  value={this.state.initialvalues.salesOpportunityStageId}
                  onChange={e =>
                    this.handleChange("salesOpportunityStageId", e)
                  }
                >
                  <option selected>{"All"}</option>
                  {this.state.stage.map(e => (
                    <option value={e.salesOpportunityStageId}>{e.name}</option>
                  ))}
                </Input>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
            style={{ borderRight: "1px solid darkgrey" }}
          >
            <div className="row">
              <div className="col-12">
                <Label style={{ fontSize: "0.8rem" }}>Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={this.state.initialvalues.status}
                  onChange={e => this.handleChange("status", e)}
                >
                  <option selected>{"All"}</option>
                  <option value={"Open"}>{"Open"}</option>
                  <option value={"Close"}>{"Close"}</option>
                  <option value={"In Progress"}>{"In Progress"}</option>
                  <option value={"Completed Won"}>{"Completed Won"}</option>
                  <option value={"Completed Lost"}>{"Completed Lost"}</option>
                </Input>
              </div>
              <div className="col-12"></div>
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
                <Label style={{ fontSize: "0.8rem" }}>Owner</Label>
                <Input
                  type="text"
                  name="owner"
                  id="owner"
                  value={this.state.initialvalues.owner}
                  onChange={e => this.handleChange("owner", e)}
                ></Input>
              </div>
              <div className="col-12"></div>
            </div>
          </div>
        </div>
      </form>
    );
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
            {filters}
          </div>
          <div
            className="col-12"
            style={{
              textAlign: "right"
            }}
          >
            <i
              className="fa fa-check-square"
              style={{
                color: "#8cc0f7",
                cursor: "pointer",
                padding: "0",
                marginLeft: "80%"
              }}
              onClick={() => this.handlesave("apply")}
            >
              &nbsp;&nbsp;Apply
            </i>
            &nbsp;&nbsp;
            <i
              className="fa fa-recycle"
              style={{
                color: "#8cc0f7",
                cursor: "pointer",
                padding: "0"
              }}
              onClick={() => this.handlesave("reset")}
            >
              &nbsp;&nbsp;Reset
            </i>
          </div>
        </Collapse>
      </>
    );
  }
}

export default Filters;
