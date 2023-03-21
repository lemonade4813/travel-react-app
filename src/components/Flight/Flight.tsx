import { useCallback, useEffect, useMemo, useState } from "react"
import FlightSelectBox from "./FlightSelectBox"
import FlightData from "./FlightData"
import FlightDataSegments from "./FlightDataSegments"
import {selectFlightOptionsType} from "./type"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"
import styled from "styled-components"
import { dateToString } from "../../utils/etcFunc"
import { fetchData} from "../../utils/apiCallFunc"
import { DivFlexRow, DivDatePicker, Label, SubmitButton, Select } from "../../utils/commonStyle"

const DivFlexRowFlight = styled(DivFlexRow)`
    margin : 20px auto 0px;
    width : 80%
`

const FlightInfoDiv = styled(DivFlexRow)`

    margin : 0px auto;
    width : 90%
`

export default function Flight(){

    const[flightResponseData, setFlightResponseData] = useState<any>([])

    const[searchFlightOption, setSearchFlightOption] = useState<selectFlightOptionsType>({
        
        departCountry : "", departIataCode : "", arriveCountry : "", arriveIataCode : "", checkedFlightDate: null
        , personNumber : ""
    }) 

    const changeFlightOption = useCallback((key : string) => (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption(prevState => ({...prevState, [key] : e.target.value}))
    },[])

   
    const changeFlightDate = useCallback((date : Date | null) => {
        setSearchFlightOption(prevState => ({...prevState, checkedFlightDate : date}))
    },[])


    console.log(searchFlightOption)

    const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${searchFlightOption.departIataCode}&destinationLocationCode=${searchFlightOption.arriveIataCode}&departureDate=${dateToString(searchFlightOption.checkedFlightDate)}&adults=${searchFlightOption.personNumber}&nonStop=false&max=250`


    const fetchFlightResponseData = (e : React.FormEvent<HTMLFormElement>) =>{

        fetchData(e, flightCallUrl)
        .then((res)=>{
            setFlightResponseData(res.data)
        })
    }
    

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
            <p>항공권 예약 정보를 선택후 검색하세요.</p>
            <DivFlexRowFlight>
                <form onSubmit={fetchFlightResponseData}>
                <p>국가/공항 선택</p>
                        <DivFlexRow>
                            <FlightSelectBox 
                            changeCountry = {changeFlightOption('departCountry')} 
                            changeIataCode = {changeFlightOption('departIataCode')} 
                            country = {searchFlightOption.departCountry}
                            depart/>

                            <FlightSelectBox
                            changeCountry = {changeFlightOption('country')}
                            changeIataCode = {changeFlightOption('iataCode')}
                            country = {searchFlightOption.arriveCountry} 
                            arrive/>
                    </DivFlexRow>
                    <DivFlexRow>
                    <DivDatePicker>
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
                    </DivDatePicker>
                    <DivFlexRow>
                    <Label>탑승 인원(명)</Label>
                    <Select onChange={() => {changeFlightOption('personNumber')}}>
                            <option>===선택하세요===</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                    </Select>
                    </DivFlexRow>
                    </DivFlexRow>
                    <SubmitButton type = "submit" value="검색"/>
                </form>
            </DivFlexRowFlight>
            {flightInfo}
        </>
    )

}

