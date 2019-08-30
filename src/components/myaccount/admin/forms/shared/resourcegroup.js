import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************File Group*********************** */
let apiurlResourceGroup= apiUrl + '/masterdata/PredefinedItems';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlResourceGroupall= apiUrl + '/masterdata/PredefinedItems/0/0';



function ApiwithidResourceGroup(Id) {
    return `${apiurlResourceGroup}/${Id}`;
  }

  function ApiwithbyPgResourceGroup(Pg,PgSize) {
    return `${apiurlResourceGroup}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForResourceGroup(pg,pgsize) {
    return axios.get(ApiwithbyPgResourceGroup(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                 'Access-Control-Expose-Headers': '*',
                }}
            )

}

//-------- GetAPiAll
export function GetAllListingForResourceGroup() {
  return axios.get(apiurlResourceGroupall,
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
export function GetResourceGroupDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidResourceGroup(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutResourceGroupDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidResourceGroup(id),body)

}

//------- Delete-API

export function DeleteResourceGroupDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidResourceGroup(id))

}

//----------Save-Post-API
export function PostListingForResourceGroup(body) {
    return axios.post(apiurlResourceGroup,body)

}
