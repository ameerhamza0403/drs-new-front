import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Job Group Template*********************** */
let apiurljobgrouptemplate= apiUrl + '/masterdata/JobGroupTemplates';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';
let apiurljobgrouptype= apiUrl + '/masterdata/JobTypes/0/0';



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


//------------------ Group type -------
export function JobGroupType(){
  return axios.get(apiurljobgrouptype,
    {headers: {
        //"Authorization": authIt,
        //"accept": "application/json",
        //"Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
       }});
}


//-------------- Group Template -------- /masterdata/JobGroupTemplates

/* *************************Job Group Template*********************** */
function apiurltemplatejob(Id,IdT){
  return `${apiurljobgrouptemplate}/${Id}/TemplateJobs/${IdT}`;
}
function apiurltemplatepostjob(Id,IdT){
  return `${apiurljobgrouptemplate}/${Id}/TemplateJobs`;
}
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';

function apiforlistunderedit(Id){
  return `${apiurljobgrouptemplate}/${Id}/TemplateJobs/0/0`;
}

//--- Get list under edit -----
export function GetListforlistunderedit(id) {
    return axios.get(apiforlistunderedit(id),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                 'Access-Control-Expose-Headers': '*',
                }}
            )

}

//------- Delete-API

export function DeletetemplateJobDataById(id,idt) {
    // console.log(id)
    return axios.delete(apiurltemplatejob(id,idt))

}


// //-------- GetAPi
// export function GetListingForjobgrouptemplate(pg,pgsize) {
//     return axios.get(ApiwithbyPgjobgrouptemplate(pg,pgsize),
//              {headers: {
//                  //"Authorization": authIt,
//                  //"accept": "application/json",
//                  //"Access-Control-Allow-Origin": "*",
//                  'Content-Type': 'application/json',
//                  'Access-Control-Expose-Headers': '*',
//                 }}
//             )

// }

// //---------Edit APi
// export function GetjobgrouptemplateDataById(id) {
//     // console.log(id)
//     return axios.get(Apiwithidjobgrouptemplate(id),
//              {headers: {
//                  'Content-Type': 'application/json',
//                 }}
//             )

// }

// export function PutjobgrouptemplateDataById(id,body) {
//     // console.log(id)
//     return axios.put(Apiwithidjobgrouptemplate(id),body)

// }



//----------Save-Post-API
export function PostListingFortemplategroup(id,body) {
    return axios.post(apiurltemplatepostjob(id),body)

}
