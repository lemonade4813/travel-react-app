import { useEffect, useState } from "react"
import SelectBox from "../../utils/SelectBox"
import FlightData from "./FlightData"
import FlightDataSegments from "./FlightDataSegments"
import {selectFlightOptionsType} from "./type"

export default function Flight(){

    const AMADEUS_API_ID = "obCv6RoAxEq0IdbHANdGncCabaugPCwU"
    const AMADEUS_API_KEY = "DDOBeUcEConOZYQG"

    const[accessToken, setAccessToken] = useState<string|undefined>('')
    const[flightData, setFlightData] = useState<any>([])
    const[flightDataSegments, setFlightDataSegments] = useState<Array<any>>([])
    const[searchFlightOption, setSearchFlightOption] = useState<selectFlightOptionsType>({
        departCountry : "", departIataCode : "", arriveCountry : "", arriveIataCode : ""}) 


    const changeDepartCountry = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption({...searchFlightOption, departCountry : e.target.value})
    }

    const changeDepartIataCode  = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption({...searchFlightOption, departIataCode: e.target.value})
	}

    const changeArriveCountry = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption({...searchFlightOption, arriveCountry : e.target.value})
    }

    const changeArriveIataCode  = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption({...searchFlightOption, arriveIataCode: e.target.value})
	}



    const fetchAuthData = async () : Promise<string|undefined> => {
        
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
            console.log(responseAuthJson)
            return responseAuthJson.access_token
            
        }
        catch(e){
            console.log(e)
        }
    }

    const fetchData = async () => {
            
            let token : string | undefined

            //state에 저장된 token이 없을 경우 token 정보 가져오는 함수 호출

            if(!accessToken){
                    console.log("acesssToken is not exist")
                    token = await fetchAuthData()
                    console.log(`getToken : ${token}`)
            }
            else{
                    token = accessToken;
            }

            fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${searchFlightOption.departIataCode}&destinationLocationCode=${searchFlightOption.arriveIataCode}&departureDate=2023-05-02&adults=1&max=1`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(res =>{
                if(!res.ok){
                    throw new Error(`${res.status} Error 발생, 페이지 새로 고침 후 다시 시도해 주십시오`)
                }
                return res.json()})
            .then((data)=>{
                const {oneWay, lastTicketingDate, numberOfBookableSeats} = data.data[0]
                const flightData = {oneWay, lastTicketingDate, numberOfBookableSeats}
                console.log("flightData : " + JSON.stringify(flightData))   // response 한 api 값 확인
                setFlightData(flightData)                                   // flightData state에 값 설정
                console.log("flightDataState : " + JSON.stringify(flightData)) //설정한 state값 확인
                console.log("flightDataSegments :" + JSON.stringify(data.data[0].itineraries[0].segments)) // response 한 api 값 확인
                setFlightDataSegments(data.data[0].itineraries[0].segments) // flightDataSegments state에 값 설정
                console.log("flightDataSegmentsState : " + JSON.stringify(flightData)) //설정한 state값 확인

                setAccessToken(token)
                console.log("token" + token)
                console.log(`tokenState: ${accessToken}`)
            })
            .catch((err)=>{
                alert(err.message)
                console.log(err)
                window.location.reload();
            })
        }

    return(
        <>
            <button onClick={fetchData}>실행</button>
            <SelectBox 
            changeDepartCountry = {changeDepartCountry} 
            changeDepartIataCode = {changeDepartIataCode} 
            arriveCountry = {searchFlightOption.arriveCountry} 
            changeArriveCountry = {changeArriveCountry}
            changeArriveIataCode = {changeArriveIataCode}
            departCountry = {searchFlightOption.departCountry}/>
            <FlightData flightData = {flightData} />
            <FlightDataSegments flightDataSegments = {flightDataSegments} />
        </>
    )

}

