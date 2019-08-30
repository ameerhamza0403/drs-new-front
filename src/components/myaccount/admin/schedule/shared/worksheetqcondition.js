import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Contacts Group*********************** */
let ApiurlWorkSheetQ= apiUrl + '/masterdata/Worksheets';
// let apiurlAbsenceType= 'https://reqres.in/api/users/2';
function ApiwithidWorkSheetQCondition(Id) {
    return `${ApiurlWorkSheetQ}/${Id}`;
  }

  function ApiwithbyPgWorkSheetQCondition(idw,idq,Pg,PgSize) {
    
   
    return `${ApiurlWorkSheetQ}/${idw}/WorksheetQuestions/${idq}/WorksheetQConditions/${Pg}/${PgSize}`;

  }

  function ApiwithidforpostWorkSheetQCondition(Idq,idc){
      return `${ApiurlWorkSheetQ}/${Idq}/WorksheetQuestions/${idc}/WorksheetQConditions`;
  }
  function ApiwithidforputWorkSheetQCondition(Idw,idq,idc){
    return `${ApiurlWorkSheetQ}/${Idw}/WorksheetQuestions/${idq}/WorksheetQConditions/${idc}`;
  }

//-------- GetAPi 
export function GetListingForWorkSheetQCondition(Idw,idq,pg,pgsize) {
    return axios.get(ApiwithbyPgWorkSheetQCondition(Idw,idq,pg,pgsize),
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
export function GetWorkSheetQconditionDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidWorkSheetQCondition(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutWorkSheetQConditionDataById(idmain,idq,idc,body) {
    // console.log(id)
    return axios.put(ApiwithidforputWorkSheetQCondition(idmain,idq,idc),body)

}

//------- Delete-API

export function DeleteWorkSheetQConditionDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidWorkSheetQCondition(id))

}

//----------Save-Post-API
export function PostListingForWorkSheetQCondition(idq,idc,body) {
    return axios.post(ApiwithidforpostWorkSheetQCondition(idq,idc),body)

}
