import React from "react";
import ListingNotes from "./listing";

let CrmNotesListing = () => {
  return (
    <div>
      <ListingNotes
        Showhead={true}
        callid={false}
        idofentity={undefined}
        ShowFoot={false}
        noteType={""}
      />
      {/* ******* Props ************ */}
      {/*
  -----// noteType //----
          person
          notes
          vehicle
          resource
          customerasset
          item
          contact
      */}
    </div>
  );
};

export default CrmNotesListing;
