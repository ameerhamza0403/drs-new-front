import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************ResourceGroup Type*********************** */
 let apiurlResourceGroup= apiUrl + '/masterdata/ResourceGroups';

// let apiurlResourceGroup= 'https://reqres.in/api/users/2'; //Fake Api Testing

function ApiwithidResourceGroup(Id) {
    return `${apiurlResourceGroup}/${Id}`;
  }

  function ApiPagingResourceGroup(PG,PGSIZE) {
    return `${apiurlResourceGroup}/${PG}/${PGSIZE}`;
  }

//-------- GetAPi
export function GetListingForResourceGroup(pg,pgsize) {
    return axios.get(ApiPagingResourceGroup(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
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

