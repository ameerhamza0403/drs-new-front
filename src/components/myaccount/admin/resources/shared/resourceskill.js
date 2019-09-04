import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************ResourceSkill Type*********************** */
 let apiurlResourceSkill= apiUrl + '/masterdata/ResourceSkills';

// let apiurlResourceSkill= 'https://reqres.in/api/users/2'; //Fake Api Testing

function ApiwithidResourceSkill(Id) {
    return `${apiurlResourceSkill}/${Id}`;
  }


  function ApiPagingResourceSkill(PG,PGSIZE) {
    return `${apiurlResourceSkill}/${PG}/${PGSIZE}`;
  }

//-------- GetAPi
export function GetListingpgForResourceSkill(pg, pgsize) {
    return axios.get(ApiPagingResourceSkill(pg,pgsize),
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}
//-------- GetAPi
export function GetListingForResourceSkill() {
    return axios.get(apiurlResourceSkill,
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetResourceSkillDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidResourceSkill(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutResourceSkillDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidResourceSkill(id),body)

}

//------- Delete-API

export function DeleteResourceSkillDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidResourceSkill(id))

}

//----------Save-Post-API
export function PostListingForResourceSkill(body) {
    return axios.post(apiurlResourceSkill,body)

}

