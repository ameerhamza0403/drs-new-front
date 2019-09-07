import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************WareHouse*********************** */
let apiurlWareHouse= apiUrl + '/masterdata/Warehouses';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function ApiwithidWareHouse(Id) {
    return `${apiurlWareHouse}/${Id}`;
  }

  function ApiwithbyPgWareHouse(Pg,PgSize) {
    return `${apiurlWareHouse}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForWareHouse(pg,pgsize) {
    return axios.get(ApiwithbyPgWareHouse(pg,pgsize),
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
export function GetWareHouseDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidWareHouse(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutWareHouseDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidWareHouse(id),body)

}

//------- Delete-API

export function DeleteWareHouseDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidWareHouse(id))

}

//----------Save-Post-API
export function PostListingForWareHouse(body) {
    return axios.post(apiurlWareHouse,body)

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


