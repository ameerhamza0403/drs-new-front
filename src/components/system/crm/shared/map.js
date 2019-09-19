import {mapApiKey} from '../../../../config.json'
import axios from "axios";

/* *************************Contacts Map API*********************** */
let urlautosearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';


function addquerry(text){
  return `${urlautosearch}${text}&key=${mapApiKey}`;
}

// getSuggestions

export function SuggestLocation(text) {
  return axios.get(addquerry(text), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

//-------- GetAPi
// export function GetCrmNotes(pg, pgsize) {
//   return axios.get(ApiwithbyPgCrmNotes(pg, pgsize), {
//     headers: {
//       //"Authorization": authIt,
//       //"accept": "application/json",
//       //"Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//       "Access-Control-Expose-Headers": "*"
//     }
//   });
// }

//----------Save-Post-API
// export function PostCrmNotes(body) {
//   return axios.post(apiurlCrmNotes, body);
// }

