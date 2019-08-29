import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
// import EditFuelCost from "./edit";
import TemplateAdd from "./add";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../../scss/override/listing.scss";
import {
  GetListingForjobgrouptemplate,
  DeletejobgrouptemplateDataById
} from "../../shared/jobgrouptemplate";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

const classes = {
  linearprogress: {
    // backgroundColor: '#EE7647',
    backgroundColor: "rgb(243, 153, 117)"
  },
  header: {
    backgroundColor: "#EE7647",
    height: "40px",
    borderRadius: "5px",
    width: "99%",
    marginLeft: "0.5%",
    alignContent: "center",
    color: "white"
  },
  heading: {
    marginRight: "10%",
    textAlign: "right"
  },
  plusign: {
    marginLeft: "80%"
  },
  actions: {
    cursor: "pointer",
    float: "left",
    marginLeft: "70%"
  },
  th: {
    textAlign: "center"
  },
  iconth:{
    width: '10%',
  }
};


let GroupTemplate = props => {

  function HandleAddnewRow(){

  }

  return (
    <div>
      <table class="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">
              Job Type
            </th>
            <th  scope="col">
              Contact
            </th>
            <th scope="col">
              Resource
            </th>
            <th style={classes.iconth} scope="col">
              <i className="fa fa-plus-circle fa-2x" onClick={HandleAddnewRow} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
      {/* <TemplateAdd /> */}
    </div>
  );
};

export default GroupTemplate;
