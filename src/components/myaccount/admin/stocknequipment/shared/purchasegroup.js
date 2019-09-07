import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************PurchaseOrder*********************** */
let apiurlPurchaseOrder= apiUrl + '/masterdata/PurchasingGroups';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidPurchaseOrder(Id) {
    return `${apiurlPurchaseOrder}/${Id}`;
  }

  function ApiwithbyPgPurchaseOrder(Pg,PgSize) {
    return `${apiurlPurchaseOrder}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForPurchaseOrder(pg,pgsize) {
    return axios.get(ApiwithbyPgPurchaseOrder(pg,pgsize),
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
export function GetPurchaseOrderDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidPurchaseOrder(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutPurchaseOrderDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidPurchaseOrder(id),body)

}

//------- Delete-API

export function DeletePurchaseOrderDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidPurchaseOrder(id))

}

//----------Save-Post-API
export function PostListingForPurchaseOrder(body) {
    return axios.post(apiurlPurchaseOrder,body)

}

//----------Upload File

let apiforupload=apiUrl + '/common/Uploads';


export function PostListingForFileUpload(body) {
  return axios.post(apiforupload,body,
    {headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Expose-Headers': '*',
       }}
   )
}


