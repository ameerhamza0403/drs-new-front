import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Financial Document *********************** */
let apiurlFinancialDocumentnSale= apiUrl + '/masterdata/DocumentTypes';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlFinancialDocumentnSaleall= apiUrl + '/masterdata/DocumentTypes/0/0';



function ApiwithidFinancialDocumentnSale(Id) {
    return `${apiurlFinancialDocumentnSale}/${Id}`;
  }

  function ApiwithbyPgFinancialDocumentnSale(Pg,PgSize) {
    return `${apiurlFinancialDocumentnSale}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForFinancialDocumentnSale(pg,pgsize) {
    return axios.get(ApiwithbyPgFinancialDocumentnSale(pg,pgsize),
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
export function GetAllListingForFinancialDocumentnSale() {
  return axios.get(apiurlFinancialDocumentnSaleall,
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
export function GetFinancialDocumentnSaleDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidFinancialDocumentnSale(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutFinancialDocumentnSaleDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidFinancialDocumentnSale(id),body)

}

//------- Delete-API

export function DeleteFinancialDocumentnSaleDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidFinancialDocumentnSale(id))

}

//----------Save-Post-API
export function PostListingForFinancialDocumentnSale(body) {
    return axios.post(apiurlFinancialDocumentnSale,body)

}


