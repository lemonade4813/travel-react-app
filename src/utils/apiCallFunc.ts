import { errorMonitor } from "events";
import { AMADEUS_API_ID, AMADEUS_API_KEY } from "./apiKey"

export const setAmadeusAccessToken = async () =>{


  //sessionstorage에 token이 없을 경우 token 정보 가져오는 함수 호출

  if(localStorage.getItem("amadeusAccessToken"))
  removeAmadeusAccessToken(); 


  const amadeusAccessToken  =  await getAmadeusAccessToken()
  if(typeof amadeusAccessToken === 'string')
  localStorage.setItem("amadeusAccessToken", amadeusAccessToken)


  return localStorage.getItem("amadeusAccessToken")

}

export const removeAmadeusAccessToken = () => {
  localStorage.removeItem("amadeusAccessToken")
}



class HTTPError extends Error {
  statusCode;
  constructor(statusCode: number, message?: string) {
    super(message)
    this.name = `HTTPError`
    this.statusCode = statusCode
  }
}


export const fetchData = async (e: React.FormEvent<HTMLFormElement>, url : string) => {

  e.preventDefault();

  const token = localStorage.getItem("amadeusAccessToken")

  try{
    const response = await fetch(url,{   
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        if (response.ok) {
          return await response.json()
        } else {
          throw new HTTPError(response.status, response.statusText)
      }
    } catch(err){
        if(err instanceof HTTPError)
          switch(err.statusCode){
            case 401:
              await setAmadeusAccessToken();
              fetchData(e, url);
              break;
            default : 
              console.log(err);
        }
  }
}


export const getAmadeusAccessToken = async () : Promise<string | undefined> => {
        
  try{
      const responseAuth = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token",
      {
          body: `grant_type=client_credentials&client_id=${AMADEUS_API_ID}&client_secret=${AMADEUS_API_KEY}`,
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
      })
      const responseAuthJson = await responseAuth.json() 
      return responseAuthJson.access_token
      
  }
  catch(e){
      console.log(e)
  }
}


  
  
