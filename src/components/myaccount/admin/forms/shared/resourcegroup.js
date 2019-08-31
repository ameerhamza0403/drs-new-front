import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************File Group*********************** */
let apiurlResourceGroup= apiUrl + '/masterdata/FileResourceGroups';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlResourceGroupall= apiUrl + '/masterdata/FileResourceGroups/0/0';



function ApiwithidResourceGroup(id,Id) {
    return `${apiurlResourceGroup}/${id}/${Id}`;
  }

  function ApiwithbyPgResourceGroup(Pg,PgSize) {
    return `${apiurlResourceGroup}/${Pg}/${PgSize}`;
  }

  function ApiallwithbyPgResourceGroup(Id,Pg,PgSize) {
    return `${apiurlResourceGroup}/${Id}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetbyidListingForResourceGroup(id,pg,pgsize) {
    return axios.get(ApiallwithbyPgResourceGroup(id,pg,pgsize),
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

export function PutResourceGroupDataById(idd,id,body) {
    // console.log(id)
    return axios.put(ApiwithidResourceGroup(idd,id),body)

}

//------- Delete-API
function DeleteAPi(id,idd) {
  return `${apiurlResourceGroup}/${id}/${idd}`;
}

export function DeleteResourceGroupDataById(id,resid) {
    // console.log(id)
    return axios.delete(DeleteAPi(id, resid))

}

//----------Save-Post-API
export function PostListingForResourceGroup(body) {
    return axios.post(apiurlResourceGroup,body)

}
