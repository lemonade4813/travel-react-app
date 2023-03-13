import { AMADEUS_API_ID, AMADEUS_API_KEY } from "./apiKey"

export const amadeusAccessTokenConfirm = async () =>{


  //sessionstorage에 token이 없을 경우 token 정보 가져오는 함수 호출

  if(!localStorage.getItem("amadeusAccessToken")){
    const amadeusAccessToken  =  await getAmadeusToken()
    if(typeof amadeusAccessToken === 'string')
    localStorage.setItem("amadeusAccessToken", amadeusAccessToken)
  }

  return localStorage.getItem("amadeusAccessToken")

}


export const fetchData = async (e : React.FormEvent<HTMLFormElement>, url : string) => {
        
    e.preventDefault();

    const token = await amadeusAccessTokenConfirm()
    const result = await fetch(url,
    {
      
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res =>{
        if(!res.ok){
            throw new Error(`${res.status} Error 발생, 페이지 새로 고침 후 다시 시도해 주십시오`)
        }
        return res.json()})
    .catch((err)=>{
        alert(err.message)
        console.log(err)
        window.location.reload();
    })

    return result;
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


  
  
