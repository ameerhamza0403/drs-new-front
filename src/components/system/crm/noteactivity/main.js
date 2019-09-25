import React from "react";
import ListingNoteActivty from "./listing";

let CrmNotesActivity = () => {
  return (
    <div>
      <ListingNoteActivty Showhead={true} callid={false} idofentity={undefined} ShowFoot={false} ActivityType={'acitivities'}/>
      {/* ******************* */}
      {/* ActivityType */}
      {/* acitivities, resource, notes */}
    </div>
  );
};

export default CrmNotesActivity;
