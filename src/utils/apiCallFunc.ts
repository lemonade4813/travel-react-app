import { AMADEUS_API_ID, AMADEUS_API_KEY } from "./apiKey"

export const amadeusAccessTokenConfirm = async () =>{


  //sessionstorage에 token이 없을 경우 token 정보 가져오는 함수 호출

  if(localStorage.getItem("amadeusAccessToken"))
  {localStorage.removeItem("amadeusAccessToken")}


  const amadeusAccessToken  =  await getAmadeusToken()
  if(typeof amadeusAccessToken === 'string')
  localStorage.setItem("amadeusAccessToken", amadeusAccessToken)


  return localStorage.getItem("amadeusAccessToken")

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
  const token = await amadeusAccessTokenConfirm()

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
    } catch(e){
        if(e instanceof HTTPError)
          switch(e.statusCode){
            case 401:
              amadeusAccessTokenConfirm();
              break;
            default : 
              console.log(e);
        }
  }
}


export const getAmadeusToken = async () : Promise<string | undefined> => {
        
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


  
  
