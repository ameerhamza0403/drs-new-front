import { mapApiKey } from "../../../../config.json";
import axios from "axios";

/* *************************Contacts Map API*********************** */
let urlautosearch =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";

function addquerry(text) {
  return `${urlautosearch}${text}&types=establishment&location=37.76999,-122.44696&radius=500&key=${mapApiKey}`;
}

// getSuggestions

export function SuggestLocation(text) {
  return axios.get(addquerry(text), {
    headers: {
      dataType: "jsonp",
      cache: false
      //     // "Content-Type": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
      //     "scheme": 'https',
      //     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      //     "accept-encoding": "gzip, deflate, br",
      //     "accept-language": "en-US,en;q=0.9",
      //     "cache-control": "max-age=0",
      //     "sec-fetch-mode": "navigate",
      //     "sec-fetch-site": "none",
      //     "sec-fetch-user": "?1",
      //     "upgrade-insecure-requests": "1",
      //     "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Mobile Safari/537.36",
      //     "x-client-data": "CIy2yQEIpbbJAQjBtskBCKmdygEIt5/KAQi7pcoBCOKoygEIy67KAQjKr8oBCKyyygE="
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
