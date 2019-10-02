import React from "react";
import ListingSales from "./listing";

let CrmSalesListing = () => {
  return (
    <div>
      <ListingSales
        Showhead={true}
        callid={false}
        idofentity={undefined}
        ShowFoot={false}
        saleType={""}
        showfilter={true}
      />
      {/* ******* Props ************ */}
      {/*
  -----// saleType //----
          activities
          financedocs
          jobs
          notes
          attachment
      */}
    </div>
  );
};

export default CrmSalesListing;
