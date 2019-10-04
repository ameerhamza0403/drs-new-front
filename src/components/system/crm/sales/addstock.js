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
import { GetListingForUnit } from "../../../myaccount/admin/stocknequipment/shared/unit";

const classes = {
  label: {
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "white",
    margin: "auto"
  },
  button: {
    color: "white",
    backgroundColor: "#EE7647",
    border: "none"
  }
};

let assetval;
let inputval;
let idkey;
let displayinp = "";
let modalcontent = "";
let taxval;
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
      tableval: [],
      unitval: [],
      itemorasset: "item",
      modal: false
    };
    this.inputrow = createRef();
    this.getlistapi = this.getlistapi.bind(this);
    this.handleaddrow = this.handleaddrow.bind(this);
    this.handledelete = this.handledelete.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlechangetableAtadd = this.handlechangetableAtadd.bind(this);
    this.handleradio = this.handleradio.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handlechangedes = this.handlechangedes.bind(this);
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

    await GetListingForUnit(0, 0).then(res =>
      this.setState((this.state.unitval = res.data))
    );
  }

  handlechange = (name, e) => {
    this.setState({
      initialvalues: {
        ...this.state.initialvalues,
        [name]: e.target.value
      }
    });
  };

  handlechangedes = (name, e) => {
    this.setState({
      initialvalues: {
        ...this.state.initialvalues,
        [name]: e
      }
    });
  };

  handleradio = e => {
    // console.log(e.target.value);
    this.setState({ itemorasset: e.target.value });
  };

  handledelete = value => {
    // let arr = [];
    // arr = this.state.tableval;
    // this.state.tableval.map((e, i) => {
    //   if (e.id === value) {
    //     delete arr[i];
    //   }
    // });
    // this.setState((this.state.tableval = arr));

    //-----------------------------------------
    let arrcon = [];
    arrcon = this.state.addtoinput;
    this.state.addtoinput.map((e, i) => {
      if (e.id === value) {
        delete arrcon[i];
        this.props.addtomain('delete',e.id);

      }
    });
    this.setState((this.state.addtoinput = arrcon));
    this.props.addtomain(this.state.tableval);
  };

  handleaddrow(value) {
    // tableval
    let obj = {
      id: value,
      item: this.state.initialvalues
    };
    if (this.state.itemorasset === "item") {
      obj.item.itemId = assetval;
    } else if (this.state.itemorasset === "asset") {
      obj.item.customerAssetId = assetval;
    }
    obj.item.taxCodeId = taxval;

    console.log(obj)
    // let arr = [];
    // arr = this.state.tableval;
    // this.state.tableval.map((e, i) => {
    //   if (e.id === value) {
    //     delete arr[i];
    //     arr[i] = obj;
    //   }
    // });
    // this.setState((this.state.tableval = arr));
    this.props.addtomain('add',obj);

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
    // console.log(this.state.initialvalues);
  }

  handlechangetableAtadd = value => {
    // console.log('this.state.initialvalues');
    return (
      <>
        <td scope="col">{value.quantity}</td>
        <td scope="col">{value.nominalCodeName}</td>
        <td scope="col">{value.description}</td>
        {/* <td scope="col">{value.itemId}</td>
        <td scope="col">{value.customerAssetId}</td> */}
        <td scope="col">{value.costPrice}</td>
        <td scope="col">{value.unitPrice}</td>
        <td scope="col">{value.taxCodeName}</td>
        <td scope="col">{value.taxRate}</td>
        <td scope="col">{value.unit}</td>
      </>
    );
  };

  handleAdd = () => {
    // this.setState((this.state.initialvalues = {}));
    let obj = {
      id: new Date().getTime(),
      item: inputval
    };
    let arr = [];
    arr = this.state.addtoinput;
    arr.push(obj);
    this.setState((this.state.addtoinput = arr));
    // if (this.state.itemorasset === "des") {
    //   this.setState((this.state.initialvalues = {}));
    // }
    // this.toggle();
  };

  toggle() {
    // this.setState((this.state.initialvalues = {}));
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    displayinp = this.state.addtoinput.map(e => (
      <tr id={e.id}>
        {e.item}
        <td>
          <i
            title={"Save Item"}
            className="fa fa-check-circle"
            style={{
              color: "green"
            }}
            onClick={() => this.handleaddrow(e.id)}
          ></i>
          &nbsp;
          <i
            title={"Delete Item"}
            style={{
              color: "red"
            }}
            className="fa fa-minus-circle"
            onClick={() => this.handledelete(e.id)}
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
            defaultValue={this.state.initialvalues.quantity}
            onChange={e => this.handlechange("quantity", e)}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="nominalCodeId"
            name="nominalCodeId"
            // value={this.state.initialvalues.itemId}
            defaultValue={this.state.initialvalues.itemId}
            onChange={e => {
              this.handlechange("nominalCodeId", e);
              this.setState({
                initialvalues: {
                  ...this.state.initialvalues,
                  ["nominalCodeName"]: e.target.childNodes[
                    e.target.selectedIndex
                  ].getAttribute("id")
                }
              });
            }}
          >
            <option selected />
            {this.state.nominalcode.map(e => (
              <option value={e.nominalCodeId} id={e.code}>
                {e.code}
              </option>
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
            defaultValue={this.state.initialvalues.description}
            // value={this.state.initialvalues.description}
          ></Input>
        </td>
        {/* <td scope="col">
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
        </td> */}
        {/* <td scope="col">
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
        </td> */}
        <td scope="col">
          <Input
            type="number"
            className="form-control"
            id="costPrice"
            name="costPrice"
            // value={this.state.initialvalues.costPrice}
            onChange={e => this.handlechange("costPrice", e)}
            defaultValue={this.state.initialvalues.costPrice}
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
            defaultValue={this.state.initialvalues.unitPrice}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="taxCodeId"
            name="taxCodeId"
            // value={this.state.initialvalues.taxCodeId}
            defaultValue={this.state.initialvalues.taxCodeId}
            onChange={e => {
              {
                this.handlechange("taxCodeId", e);
                taxval = e.target.value;
                this.setState({
                  initialvalues: {
                    ...this.state.initialvalues,
                    ["taxCodeName"]: e.target.childNodes[
                      e.target.selectedIndex
                    ].getAttribute("id")
                  }
                });
              }
            }}
          >
            <option selected />
            {this.state.taxcode.map(e => (
              <option value={e.taxCodeId} id={e.code}>
                {e.code}
              </option>
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
            defaultValue={this.state.initialvalues.taxRate}

            // value={this.state.initialvalues.taxRate}
          ></Input>
        </td>
        <td scope="col">
          <Input
            type="select"
            className="form-control"
            id="unit"
            name="unit"
            onChange={e => this.handlechange("unit", e)}
            defaultValue={this.state.initialvalues.unit}

            // value={this.state.initialvalues.unit}
          >
            <option selected />
            {this.state.unitval.map(e => (
              <option value={e.code}>{e.code}</option>
            ))}
          </Input>
        </td>
      </>
    );

    modalcontent = (
      <form>
        {this.state.itemorasset === "item" ? (
          <Input
            type="select"
            className="form-control"
            id="itemId"
            name="itemId"
            // value={this.state.initialvalues.itemId}
            onChange={e => {
              this.handlechange("itemId", e);
              assetval = e.target.value;
              this.handlechangedes(
                "description",
                e.target.childNodes[e.target.selectedIndex].getAttribute("id")
              );
              this.setState(this.state.initialvalues);
              // console.log(this.state.initialvalues);
            }}
          >
            <option selected />
            {this.state.item.map(e => (
              <option value={e.itemId} id={e.name}>
                {e.name}
              </option>
            ))}
          </Input>
        ) : (
          <Input
            type="select"
            className="form-control"
            id="customerAssetId"
            name="customerAssetId"
            // value={this.state.initialvalues.customerAssetId}
            onChange={e => {
              this.handlechange("customerAssetId", e);
              assetval = e.target.value;
              this.handlechangedes(
                "description",
                e.target.childNodes[e.target.selectedIndex].getAttribute("id")
              );
            }}
          >
            <option selected />
            {this.state.cusasset.map(e => (
              <option value={e.customerAssetId} id={e.name}>
                {e.name}
              </option>
            ))}
          </Input>
        )}
      </form>
    );

    return (
      <>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={"modal-primary " + this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Add {this.state.itemorasset}
          </ModalHeader>
          <ModalBody>{modalcontent}</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.toggle();
                this.handleAdd();
              }}
              style={classes.button}
            >
              Add
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggle}
              style={classes.button}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
              {/* <th scope="col">
                <label style={classes.label}>Item</label>
              </th> */}
              {/* <th scope="col">
                <label style={classes.label}>Customer Assets</label>
              </th> */}
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
            style={{ cursor: "pointer", marginLeft: "30%" }}
            onClick={() => {
              this.state.itemorasset === "des"
                ? this.handleAdd()
                : this.toggle();
            }}
          >
            {" "}
            Add Item{" "}
          </i>
          &nbsp;&nbsp; &nbsp;{" "}
          <FormGroup check inline className="radio">
            <Input
              className="form-check-input"
              type="radio"
              id="des"
              name="itemorasset"
              value={"des"}
              defaultChecked={this.state.itemorasset === "des" ? true : false}
              onClick={e => this.handleradio(e)}
            />

            <Label check className="form-check-label" htmlFor="des" for="item">
              Item
            </Label>
          </FormGroup>
          <FormGroup check inline className="radio">
            <Input
              className="form-check-input"
              type="radio"
              id="item"
              name="itemorasset"
              value={"item"}
              defaultChecked={this.state.itemorasset === "item" ? true : false}
              onClick={e => this.handleradio(e)}
            />

            <Label check className="form-check-label" htmlFor="item" for="item">
              Stock Item
            </Label>
          </FormGroup>
          <FormGroup check inline className="radio">
            <Input
              className="form-check-input"
              type="radio"
              id="asset"
              name="itemorasset"
              value={"asset"}
              defaultChecked={this.state.itemorasset === "asset" ? true : false}
              onClick={e => this.handleradio(e)}
            />
            <Label
              check
              className="form-check-label"
              htmlFor="asset"
              for="asset"
            >
              Customer Assets/Equipment
            </Label>
          </FormGroup>
        </div>
      </>
    );
  }
}

export default AddStockItem;
