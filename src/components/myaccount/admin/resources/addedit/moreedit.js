import React from 'react';
import TextField from "@material-ui/core/TextField";


let MoreEdit=()=>{
    return(
        <div>

<div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label class="form-check-label" for="defaultCheck3">
                      Date Joined Company	                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue="2017-05-24"
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"/>
                  
              </div>
              
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label class="form-check-label" for="defaultCheck3">
                      Annual Leave Allowance	                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        // onChange={handleChange("ContactName")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"/>
                  
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <label class="form-check-label" for="defaultCheck3">
                      Emergency Contact Details	                      </label>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        // onChange={handleChange("ContactName")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"/>
                  
              </div>
        </div>
    )
}

export default MoreEdit;