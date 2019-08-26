import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Job Group Template*********************** */
let apiurljobgrouptemplate= apiUrl + '/masterdata/JobGroupTemplates';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function Apiwithidjobgrouptemplate(Id) {
    return `${apiurljobgrouptemplate}/${Id}`;
  }

  function ApiwithbyPgjobgrouptemplate(Pg,PgSize) {
    return `${apiurljobgrouptemplate}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForjobgrouptemplate(pg,pgsize) {
    return axios.get(ApiwithbyPgjobgrouptemplate(pg,pgsize),
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
export function GetjobgrouptemplateDataById(id) {
    // console.log(id)
    return axios.get(Apiwithidjobgrouptemplate(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutjobgrouptemplateDataById(id,body) {
    // console.log(id)
    return axios.put(Apiwithidjobgrouptemplate(id),body)

}

//------- Delete-API

export function DeletejobgrouptemplateDataById(id) {
    // console.log(id)
    return axios.delete(Apiwithidjobgrouptemplate(id))

}

//----------Save-Post-API
export function PostListingForjobgrouptemplate(body) {
    return axios.post(apiurljobgrouptemplate,body)

}
