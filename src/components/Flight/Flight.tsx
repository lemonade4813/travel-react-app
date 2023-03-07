import { useCallback, useEffect, useMemo, useState } from "react"
import FlightSelectBox from "../../utils/FlightSelectBox"
import FlightData from "./FlightData"
import FlightDataSegments from "./FlightDataSegments"
import {selectFlightOptionsType} from "./type"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"
import styled from "styled-components"


const FlightDiv = styled.div`
    display : flex;
    flex-diection : row;
    justify-content : center;
    align-items : center;
`

const FlightInfoDiv = styled(FlightDiv)`

    margin : 0px auto;
    width : 80%;
    padding : 15px; 
    border : 3px #99ccff solid;
    margin-top : 40px;
    margin-bottom : 40px;
    border-radius : 10px;

`

export default function Flight(){

    const AMADEUS_API_ID = "obCv6RoAxEq0IdbHANdGncCabaugPCwU"
    const AMADEUS_API_KEY = "DDOBeUcEConOZYQG"

    const[accessToken, setAccessToken] = useState<string|undefined>('')
    const[flightResponseData, setFlightResponseData] = useState<any>([])

    const[searchFlightOption, setSearchFlightOption] = useState<selectFlightOptionsType>({
        departCountry : "", departIataCode : "", arriveCountry : "", arriveIataCode : "", checkedFlightDate: null
        , personNumber : ""
    }) 

    const changeDepartCountry = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption(prevState => ({...prevState, departCountry : e.target.value}))
    },[])

    const changeDepartIataCode  = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption(prevState => ({...prevState, departIataCode: e.target.value}))
	},[])

    const changeArriveCountry = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption(prevState => ({...prevState, arriveCountry : e.target.value}))
    },[])

    const changeArriveIataCode  = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption(prevState => ({...prevState, arriveIataCode: e.target.value}))
	},[])

    const changeFlightDate = useCallback((date : Date | null) => {

        setSearchFlightOption(prevState => ({...prevState, checkedFlightDate : date}))
    },[])

    const changePersonNumber =useCallback((e : React.ChangeEvent<HTMLSelectElement>) =>{
        setSearchFlightOption(prevState => ({...prevState, personNumber : e.target.value}))
    },[])

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

    const fetchData = async (e : React.FormEvent<HTMLFormElement>) => {
            
            e.preventDefault();

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
                setFlightResponseData(data.data)
                setAccessToken(token)
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


    const flightInfo = useMemo(
        ()=>
        flightResponseData.map((response : any, index : number)=>{

          const {oneWay, lastTicketingDate, numberOfBookableSeats} = response
          const flightData = {oneWay, lastTicketingDate, numberOfBookableSeats}
          const flightDataSegments = response.itineraries[0].segments 
                            
        return(    
            <>
                <p>검색결과 {index+1}</p>
                <FlightInfoDiv>
                    <FlightData flightData = {flightData} />
                    <FlightDataSegments flightDataSegments = {flightDataSegments} />
                </FlightInfoDiv>    
            </>
        )

    }),[flightResponseData])

    return(
        <>
            <FlightDiv>
                <form onSubmit={fetchData}>
                    <div>
                        <p>국가/공항 선택</p>
                        <FlightSelectBox 
                        changeCountry = {changeDepartCountry} 
                        changeIataCode = {changeDepartIataCode} 
                        country = {searchFlightOption.departCountry}
                        depart/>

                        <FlightSelectBox
                        changeCountry = {changeArriveCountry}
                        changeIataCode = {changeArriveIataCode}
                        country = {searchFlightOption.arriveCountry} 
                        arrive/>
                    </div>
                
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
                  
                        <label>탑승 인원</label>
                        <select onChange={changePersonNumber}>
                            <option>===선택하세요===</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                  
                    <button type = "submit">실행</button>
                </form>
            </FlightDiv>
            {flightInfo}
        </>
    )

}

