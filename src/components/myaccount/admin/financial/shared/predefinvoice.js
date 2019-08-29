import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Predefined Invoicing Items*********************** */
let apiurlPredefInvoiceItem= apiUrl + '/masterdata/PredefinedItems';
// let apiurlAbsence= 'https://reqres.in/api/users/2';
let apiurlPredefInvoiceItemall= apiUrl + '/masterdata/PredefinedItems/0/0';



function ApiwithidPredefInvoiceItem(Id) {
    return `${apiurlPredefInvoiceItem}/${Id}`;
  }

  function ApiwithbyPgPredefInvoiceItem(Pg,PgSize) {
    return `${apiurlPredefInvoiceItem}/${Pg}/${PgSize}`;
  }

//-------- GetAPi
export function GetListingForPredefInvoiceItem(pg,pgsize) {
    return axios.get(ApiwithbyPgPredefInvoiceItem(pg,pgsize),
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
export function GetAllListingForPredefInvoiceItem() {
  return axios.get(apiurlPredefInvoiceItemall,
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
export function GetPredefInvoiceItemDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidPredefInvoiceItem(id),
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutPredefInvoiceItemDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidPredefInvoiceItem(id),body)

}

//------- Delete-API

export function DeletePredefInvoiceItemDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidPredefInvoiceItem(id))

}

//----------Save-Post-API
export function PostListingForPredefInvoiceItem(body) {
    return axios.post(apiurlPredefInvoiceItem,body)

}


//--------- Nominal Code
let apinominal= apiUrl + '/masterdata/NominalCodes/0/0';
export function GetAllListingFornominal() {
  return axios.get(apinominal,
           {headers: {
               //"Authorization": authIt,
               //"accept": "application/json",
               //"Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
               'Access-Control-Expose-Headers': '*',
              }}
          )

}



//---------- Departmental Code
let apidept= apiUrl + '/masterdata/DepartmentCodes/0/0';
export function GetAllListingFordeptcode() {
  return axios.get(apidept,
           {headers: {
               //"Authorization": authIt,
               //"accept": "application/json",
               //"Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
               'Access-Control-Expose-Headers': '*',
              }}
          )

}


//------------ Product Category
let apicategory= apiUrl + '/masterdata/ProductCategories/0/0';
export function GetAllListingForcategory() {
  return axios.get(apicategory,
           {headers: {
               //"Authorization": authIt,
               //"accept": "application/json",
               //"Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
               'Access-Control-Expose-Headers': '*',
              }}
          )

}
