import { apiUrl } from '..//..//..//..//..//config.json';
import axios from 'axios';



/* *************************Note Type*********************** */
 let apiurlNoteType= apiUrl + '/masterdata/NoteTypes';
// let apiurlNoteType= 'https://reqres.in/api/users/2';

function ApiwithidNotetype(Id) {
    return `${apiurlNoteType}/${Id}`;
  }

//-------- GetAPi
export function GetListingForNote() {
    return axios.get(apiurlNoteType, 
             {headers: {
                 //"Authorization": authIt,
                 //"accept": "application/json",
                 //"Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json',
                }}
            )

}

//---------Edit APi
export function GetNoteDataById(id) {
    // console.log(id)
    return axios.get(ApiwithidNotetype(id), 
             {headers: {
                 'Content-Type': 'application/json',
                }}
            )

}

export function PutNoteDataById(id,body) {
    // console.log(id)
    return axios.put(ApiwithidNotetype(id),body)

}

//------- Delete-API

export function DeleteNoteDataById(id) {
    // console.log(id)
    return axios.delete(ApiwithidNotetype(id))

}

//----------Save-Post-API
export function PostListingForNote(body) {
    return axios.post(apiurlNoteType,body)

}

