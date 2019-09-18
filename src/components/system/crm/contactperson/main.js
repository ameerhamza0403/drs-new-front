import React from "react";
import ListingContactPerson from "./listing";

let CrmContactPersonListing = () => {
  return (
    <div>
      <ListingContactPerson Showhead={true} callid={false} idofcontact={undefined} ShowFoot={false}/>
    </div>
  );
};

export default CrmContactPersonListing;
