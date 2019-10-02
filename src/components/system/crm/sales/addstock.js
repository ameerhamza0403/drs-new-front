import React, { Component, useState, useEffect, createRef } from "react";
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
import { GetListingForNominalCode } from "../../../myaccount/admin/financial/shared/nominalcode";
import { GetListingForCustomerAsset } from "../../../myaccount/admin/stocknequipment/shared/customerasset";
import { GetListingForStockItem } from "../../../myaccount/admin/stocknequipment/shared/stockitem";
import { GetListingForTaxCode } from "../../../myaccount/admin/financial/shared/vatcode";
import { white } from "material-ui/styles/colors";

const classes = {
  label: {
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "white",
    margin: "auto"
  }
};

let inputval;
let idkey;
let displayinp = "";
class AddStockItem extends Component {
  constructor(props) {
    super();
    this.state = {
      initialvalues: {},
      nominalcode: [],
      item: [],
      cusasset: [],
      taxcode: [],
      addtoinput: [],
      tableval: []
    };
    this.inputrow = createRef();
    this.getlistapi = this.getlistapi.bind(this);
    this.handleaddrow = this.handleaddrow.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlechangetableAtadd = this.handlechangetableAtadd.bind(this);
  }

  componentDidMount = () => {
    this.getlistapi();
  };

  async getlistapi() {
    await GetListingForNominalCode(0, 0).then(res =>
      this.setState((this.state.nominalcode = res.data))
    );
    await GetListingForStockItem(0, 0).then(res =>
      this.setState((this.state.item = res.data))
    );
    await GetListingForCustomerAsset(0, 0).then(res =>
      this.setState((this.state.cusasset = res.data))
    );
    await GetListingForTaxCode(0, 0).then(res =>
      this.setState((this.state.taxcode = res.data))
    );
  }

  handlechange = (name, e) => {
    this.setState({
      initialvalues: {
        ...this.state.initialvalues,
        [name]: e.target.value
      }
    });
    console.log(this.state.initialvalues);
    console.log(e.target.value);
  };

  handleaddrow = value => {
    // tableval
    let obj = {
      id: value,
      item: this.state.initialvalues
    };
    let arr = [];
    arr = this.state.tableval;
    this.state.tableval.map((e, i) => {
      if (e.id === value) {
        delete arr[i];
        arr[i] = obj;
      }
    });

    this.setState((this.state.tableval = arr));
    console.log(this.state.tableval);
    // --------------------------------
    let arrcon = [];
    arrcon = this.state.addtoinput;
    this.state.addtoinput.map((e, i) => {
      if (e.id === value) {
        delete arrcon[i];
        let objcon = {
          id: e.id,
          item: this.handlechangetableAtadd(obj.item)
        };
        arrcon[i] = objcon;
      }
    });
    this.setState((this.state.addtoinput = arrcon));
  };

  handlechangetableAtadd = value => {
    return (
      <>
        <td scope="col">{value.quantity}</td>
        <td scope="col">{value.nominalCodeId}</td>
        <td scope="col">{value.description}</td>
        <td scope="col">{value.itemId}</td>
        <td scope="col">{value.customerAssetId}</td>
        <td scope="col">{value.costPrice}</td>
        <td scope="col">{value.unitPrice}</td>
        <td scope="col">{value.taxCodeId}</td>
        <td scope="col">{value.taxRate}</td>
        <td scope="col">{value.unit}</td>
      </>
    );
  };

  handleAdd = () => {
    let obj = {
      id: new Date().getTime(),
      item: inputval
    };
    let arr = [];
    arr = this.state.addtoinput;
    arr.push(obj);
    this.setState((this.state.addtoinput = arr));
    console.log(this.state.addtoinput);
    console.log("check");
  };

  render() {
    displayinp = this.state.addtoinput.map(e => (
      <tr id={e.id}>
        {e.item}
        <td>
          <i
            className="fa fa-check-circle"
            onClick={() => this.handleaddrow(e.id)}
          ></i>
        </td>
      </tr>
    ));
    inputval = (
      <>
        <td scope="col">
          <Input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            // value={this.state.initialvalues.quantity}
            onChange={e => this.handlechange("quantity", e)}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="nominalCodeId"
            name="nominalCodeId"
            // value={this.state.initialvalues.nominalCodeId}
            onChange={e => this.handlechange("nominalCodeId", e)}
          >
            <option selected></option>
            {this.state.nominalcode.map(e => (
              <option value={e.nominalCodeId}>{e.code}</option>
            ))}
          </Input>
        </td>
        <td scope="col">
          <Input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={e => this.handlechange("description", e)}
            // value={this.state.initialvalues.description}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="itemId"
            name="itemId"
            // value={this.state.initialvalues.itemId}
            onChange={e => this.handlechange("itemId", e)}
          >
            <option selected />
            {this.state.item.map(e => (
              <option value={e.itemId}>{e.name}</option>
            ))}
          </Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="customerAssetId"
            name="customerAssetId"
            // value={this.state.initialvalues.customerAssetId}
            onChange={e => this.handlechange("customerAssetId", e)}
          >
            <option selected />
            {this.state.cusasset.map(e => (
              <option value={e.customerAssetId}>{e.name}</option>
            ))}
          </Input>
        </td>
        <td scope="col">
          <Input
            type="number"
            className="form-control"
            id="costPrice"
            name="costPrice"
            // value={this.state.initialvalues.costPrice}
            onChange={e => this.handlechange("costPrice", e)}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="number"
            className="form-control"
            id="unitPrice"
            name="unitPrice"
            // value={this.state.initialvalues.unitPrice}
            onChange={e => this.handlechange("unitPrice", e)}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="taxCodeId"
            name="taxCodeId"
            // value={this.state.initialvalues.taxCodeId}
            onChange={e => this.handlechange("taxCodeId", e)}
          >
            <option selected />
            {this.state.taxcode.map(e => (
              <option value={e.taxCodeId}>{e.code}</option>
            ))}
          </Input>
        </td>
        <td scope="col">
          <Input
            type="number"
            className="form-control"
            id="taxRate"
            name="taxRate"
            onChange={e => this.handlechange("taxRate", e)}
            // value={this.state.initialvalues.taxRate}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="text"
            className="form-control"
            id="unit"
            name="unit"
            onChange={e => this.handlechange("unit", e)}
            // value={this.state.initialvalues.unit}
          ></Input>
        </td>
      </>
    );

    return (
      <>
        <table className="table">
          <thead style={{ backgroundColor: "#EE7647" }}>
            <tr>
              <th scope="col">
                <label style={classes.label}>Quanity</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Nominal Code</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Description</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Item</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Customer Assets</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Cost Price</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Unit Price</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Tax Code</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Tax Rate</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Unit</label>
              </th>
              <th scope="col">
                <label style={classes.label}>Action</label>
              </th>
            </tr>
          </thead>
          <tbody>{displayinp}</tbody>
        </table>
        <br />
        <div className="row">
          <i
            className="fa fa-plus"
            style={{ cursor: "pointer", marginLeft: '50%' }}
            onClick={() => this.handleAdd()}
          >
            {" "}
            Add Item{" "}
          </i>
        </div>
      </>
    );
  }
}

export default AddStockItem;
