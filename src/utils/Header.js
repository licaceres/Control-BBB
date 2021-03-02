/*
* Constantes
*/

export const date_format = 'HH:mm DD/MM/YYYY';

// export const getHeader = () => {
//   return {
//     headers: {
//       "Access-Control-Allow-Origin": "http://localhost:3000",
//       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
//     }
//   }
// }

export const getHeader = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  return {
    headers: { 
      Authorization: 'Bearer ' + currentUser.token 
    }
  };
};
