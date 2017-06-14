import gen from '../state-generator';
import createRequest from './createRequestHelper';

let access_token;
let expiresAt;

export default function getManagementToken() {

  const payload = {
    "grant_type": "client_credentials",
    "client_id": process.env.NON_INTERACTIVE_CLIENT_ID,
    "client_secret": process.env.NON_INTERACTIVE_CLIENT_SECRET,
    "audience": `https://${process.env.DOMAIN}/api/v2/`
  }

  return new Promise((resolve, reject) => {
    
    if (expiresAt && Date.now() < expiresAt && access_token) {
      resolve(access_token);
    }

    createRequest(`https://${process.env.DOMAIN}/oauth/token`, payload)
      .then(data => {
        expiresAt = (data.expires_in * 1000) + Date.now();
        access_token = data.access_token;
        
        resolve(access_token);
      })
      .catch(err => {
        reject(err);
      })
  });
}