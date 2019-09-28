import { mapApiKey } from "../../../../config.json";
import axios from "axios";

/* *************************Contacts Map API*********************** */
let urlplaceid =
  "https://maps.googleapis.com/maps/api/place/details/json?placeid=";

function addquerry(text) {
  return `${urlplaceid}${text}&key=${mapApiKey}&libraries=places`;
}
// get Data by Place ID

export function GetDatabyPalceID(text) {
  return axios.get(addquerry(text));
}

// free api

let token = 'https://eu1.locationiq.com/v1/search.php?key=cf7d9d8a9a16c9';

function addaddress(text) {
  return `${token}&q=${text}&format=json`;
}
// get Data by Address

export function GetDatabyAddress(text) {
  return axios.get(addaddress(text));
}
