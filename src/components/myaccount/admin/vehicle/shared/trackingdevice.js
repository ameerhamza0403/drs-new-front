import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let apiurlTrackingDevice= apiUrl + '/masterdata/TrackingDevices';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidTrackingDevice(Id) {
    return `${apiurlTrackingDevice}/${Id}`;
  }

  function ApiwithbyPgTrackingDevice(Pg,PgSize) {
    return `${apiurlTrackingDevice}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForTrackingDevice(pg,pgsize) {
    return axios.get(ApiwithbyPgTrackingDevice(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                 'Access-Control-Expose-Headers': '*',
                }}
            )

}

//---------Edit APi
export function GetTrackingDeviceDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidTrackingDevice(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutTrackingDeviceDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidTrackingDevice(id),body)

}

//------- Delete-API

export function DeleteTrackingDeviceDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidTrackingDevice(id))

}

//----------Save-Post-API
export function PostListingForTrackingDevice(body) {
    return axios.post(apiurlTrackingDevice,body)

}
