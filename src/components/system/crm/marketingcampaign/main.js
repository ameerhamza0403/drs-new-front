import React from "react";
import CrmLeadListing from "./listing";

let CrmMarketingCampainMain = () => {
  return (
    <div>
      <CrmLeadListing Showhead={true} callid={false} idofcontact={undefined} ShowFoot={false} paginate={true}/>
    </div>
  );
};

export default CrmMarketingCampainMain;
