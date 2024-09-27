import axios from 'axios';
  const Base_URL = 'https://kittycara.kansafrica.com/api/';
// const Base_URL = 'http://127.0.0.1:8000/api/';

export const publicRequest = axios.create({
  baseURL: Base_URL,
});
 export const url = 'https://kittycara.kansafrica.com';
// export const url = 'http://127.0.0.1:8000/api/';
export const REGISTRATION_SUCCESS_MESSAGE =
  "L'inscription s'est déroulée avec succès";
export const REGISTRATION_SUCCESS_PASSWORD = 'Modification effectuée avec succés'
export const API_ERROR_MESSAGE =
  "Une erreur s'est produite lors de la mise à jour du post";
export const API_ERROR_MESSAGE_EMAIL =
  "Vieullez mettre une adresse email valide";
export const INTERNET_ERROR_MESSAGE =
  'Vérifiez votre connexion internet et réessayez';
export const INTERNET_ERROR_MESSAGE_RESET =
  'Une adresse email valide est requise';
export const  API_MESSAGE_EMAIL = 'Nous venons de vous envoyer un code dans votre boite email!'
export const UNEXPECTED_ERROR_MESSAGE = "Une erreur inattendue s'est produite";
export const UNEXPECTED_ERROR_CODE = "Votre code de validation est incorrecte";
