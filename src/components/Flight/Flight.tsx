import { useEffect, useState } from "react"
import SelectBox from "../../utils/selectBox"
import FlightData from "./FlightData"
import FlightDataSegments from "./FlightDataSegments"
import {selectFlightOptionsType} from "./type"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"
import styled from "styled-components"
import { stringify } from "querystring"

const FlightDiv = styled.div`
    display : flex;
    flex-diection : row;
    justify-content : center;
    align-items : center;
`

export default function Flight(){

    const AMADEUS_API_ID = "obCv6RoAxEq0IdbHANdGncCabaugPCwU"
    const AMADEUS_API_KEY = "DDOBeUcEConOZYQG"

    const[accessToken, setAccessToken] = useState<string|undefined>('')
    const[flightData, setFlightData] = useState<any>([])
    const[flightDataSegments, setFlightDataSegments] = useState<Array<any>>([])
    const[searchFlightOption, setSearchFlightOption] = useState<selectFlightOptionsType>({
        departCountry : "", departIataCode : "", arriveCountry : "", arriveIataCode : "", checkedFlightDate: null
        , personNumber : ""
    }) 


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

    const changeFlightDate = (date : Date | null) => {

        setSearchFlightOption({...searchFlightOption, checkedFlightDate : date})
    }

    const changePersonNumber = (e : React.ChangeEvent<HTMLSelectElement>) =>{
        setSearchFlightOption({...searchFlightOption, personNumber : e.target.value})
    }

    console.log(searchFlightOption)


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

            const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${searchFlightOption.departIataCode}&destinationLocationCode=${searchFlightOption.arriveIataCode}&departureDate=${dateToString(searchFlightOption.checkedFlightDate)}&adults=${searchFlightOption.personNumber}&nonStop=false&max=250`
            alert(url)
            console.log(url)
            fetch(url,
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
                console.log(data)
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

    const dateToString = (date : Date | null) => {

        let fullYear : number
        let month : number
        let day : number

        if(typeof date?.getFullYear() === 'undefined' ||  typeof date?.getMonth() ==='undefined' || typeof date?.getDay() === 'undefined'){

            const newDate = new Date()
            fullYear = newDate.getFullYear()
            month = newDate.getMonth() + 1
            day = newDate.getDay()

            return fullYear + '-' + month.toString().padStart(2, '0')+ '-' + day.toString().padStart(2, '0')
            
        }    
     
        else{
            return date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0')+ '-' + date.getDate().toString().padStart(2, '0')
        }
    
    }

    console.log(dateToString(searchFlightOption.checkedFlightDate))


    return(
        <>
            <FlightDiv>
                <div>
                    <p>국가/공항 선택</p><SelectBox 
                    changeCountry = {changeDepartCountry} 
                    changeIataCode = {changeDepartIataCode} 
                    country = {searchFlightOption.departCountry}
                    depart/>

                    <SelectBox
                    changeCountry = {changeArriveCountry}
                    changeIataCode = {changeArriveIataCode}
                    country = {searchFlightOption.arriveCountry} 
                    arrive/>
                </div>
                <div>
                    <p>예약 날짜 선택</p>
                    <DatePicker
                    locale={ko} 
                    dateFormat="yyyy-MM-dd"
                    className="input-datepicker"
                    minDate={new Date()}
                    closeOnScroll={true}
                    placeholderText="예약 날짜 선택"
                    selected={searchFlightOption.checkedFlightDate}
                    onChange={(date)=> changeFlightDate(date)}/>
                </div>
                <div>
                    <label>탑승 인원</label>
                    <select onChange={changePersonNumber}>
                        <option>===선택하세요===</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <button onClick={fetchData}>실행</button>
                </FlightDiv>
            <FlightData flightData = {flightData} />
            <FlightDataSegments flightDataSegments = {flightDataSegments} />
        </>
    )

}

