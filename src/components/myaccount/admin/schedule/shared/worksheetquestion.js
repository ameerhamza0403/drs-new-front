import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let ApiurlWorkSheetQ= apiUrl + '/masterdata/Worksheets';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';
function ApiwithidWorkSheetQ(Id) {
    return `${ApiurlWorkSheetQ}/${Id}`;
  }

  function ApiwithbyPgWorkSheetQ(id,Pg,PgSize) {
    
   
    return `${ApiurlWorkSheetQ}/${id}/WorksheetQuestions/${Pg}/${PgSize}`;

  }

  function ApiwithidforpostWorkSheetQ(Id){
      return `${ApiurlWorkSheetQ}/${Id}/WorksheetQuestions`;
  }
  function ApiwithidforputWorkSheetQ(Id,id){
    return `${ApiurlWorkSheetQ}/${Id}/WorksheetQuestions/${id}`;
  }

//-------- GetAPi 
export function GetListingForWorkSheetQ(Id,pg,pgsize) {
    return axios.get(ApiwithbyPgWorkSheetQ(Id,pg,pgsize),
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
export function GetWorkSheetQDataById(idm, idq) {
    // console.log(id)
    return axios.get(ApiwithidforputWorkSheetQ(idm,idq),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutWorkSheetQDataById(idmain,id,body) {
    // console.log(id)
    return axios.put(ApiwithidforputWorkSheetQ(idmain,id),body)

}

//------- Delete-API

export function DeleteWorkSheetQDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidWorkSheetQ(id))

}

//----------Save-Post-API
export function PostListingForWorkSheetQ(id,body) {
    return axios.post(ApiwithidforpostWorkSheetQ(id),body)

}
