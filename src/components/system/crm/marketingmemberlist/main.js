import React from "react";
import CrmMarketingMemberListing from "./listing";

let CrmMarketingMemberList = () => {
  return (
    <div>
      <CrmMarketingMemberListing Showhead={true} callid={false} idofcontact={undefined} ShowFoot={false} paginate={true}/>
    </div>
  );
};

export default CrmMarketingMemberList;
