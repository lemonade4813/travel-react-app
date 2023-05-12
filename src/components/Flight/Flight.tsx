import { useCallback, useEffect, useMemo, useState } from "react"
import FlightSelectBox from "./FlightSelectBox"
import {selectFlightOptionsType} from "./type"
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components"
import { dateToString } from "../../utils/etcFunc"
import { fetchData} from "../../utils/apiCallFunc"
import { DivFlexRow,SubmitButton, ExampleButton} from "../../utils/commonStyle"
import SelectBoxComponent from "../../utils/SelectBoxComponent"
import DatePickerComponent from "../../utils/DatePickerComponent"
import { Table, Thead} from "../../style/tableStyle"
import { handlePayment } from "../../utils/payment"
import { useDispatch } from "react-redux";
import { addFlight} from "../../features/counter/counterSlice";


const DivFlexRowFlight = styled(DivFlexRow)`
    margin : 20px auto 0px;
    width : 80%
`

const FlightInfoDiv = styled(DivFlexRow)`
    margin : 0px auto;
    width : 90%
`

const FilghtTable = styled(Table)`
    height : 100px;
`

export default function Flight(){

    const dispatch = useDispatch();

    const[flightResponseData, setFlightResponseData] = useState<any>([])

    const[searchFlightOption, setSearchFlightOption] = useState<selectFlightOptionsType>({
        
        departCountry : "", departIataCode : "", arriveCountry : "", arriveIataCode : "", selectedFlightDate: null
        , personNumber : ""
    }) 


    console.log(flightResponseData);


    const selectFlightOptionExample = () =>{
        setSearchFlightOption({
            departCountry : "Australia", departIataCode : "SYD", arriveCountry : "Thailand", arriveIataCode : "BKK", selectedFlightDate: new Date('2023-11-24')
            , personNumber : "1"
        })
        alert(`선택되었습니다. 검색 조건 ${JSON.stringify(searchFlightOption)}
        하단의 검색 버튼을 누르세요`)
    }
    

    const changeFlightOption = useCallback((key : string) => (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchFlightOption(prevState => ({...prevState, [key] : e.target.value}))
    },[])

   
    const changeFlightDate = useCallback((date : Date | null) => {
        setSearchFlightOption(prevState => ({...prevState, selectedFlightDate : date}))
    },[])


    const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${searchFlightOption.departIataCode}&destinationLocationCode=${searchFlightOption.arriveIataCode}&departureDate=${dateToString(searchFlightOption.selectedFlightDate)}&adults=${searchFlightOption.personNumber}&nonStop=false&max=250`


    const fetchFlightResponseData = (e : React.FormEvent<HTMLFormElement>) =>{

        fetchData(e, flightCallUrl)
        .then((res)=>{
            setFlightResponseData(res.data)
        })
    }
    
    const flightInfo = useMemo(
        ()=>
        flightResponseData.map((response : any, index : number)=>{

          const {oneWay, lastTicketingDate, numberOfBookableSeats, price} = response
          const flightDataSegments = response.itineraries[0].segments
          const cartPayload = {oneWay, lastTicketingDate, numberOfBookableSeats, price, flightDataSegments}                 
        return(    
            <>
                <p><strong>검색결과 {index+1}</strong></p>
                    <FlightInfoDiv>
                        <FilghtTable>
                            <Thead>
                                <tr>
                                    <th>편도여부</th>
                                    <th>예약가능 좌석</th>
                                    <th>예약마감일자</th>
                                </tr>
                            </Thead>
                            <tbody>
                                <tr>
                                    {oneWay === 'true' ? <td>예</td> : <td>아니오</td> }
                                    <td>{numberOfBookableSeats}</td>
                                    <td>{lastTicketingDate}</td>
                                </tr>    
                            </tbody>
                        </FilghtTable>
                        <FilghtTable>
                            <Thead>
                                <tr>
                                    <th>출발공항코드</th>
                                    <th>출발시간</th>
                                    <th>도착공항코드</th>
                                    <th>도착시간</th>
                                </tr>
                            </Thead>
                            <tbody>
                                {flightDataSegments.map((segment:any, index:any) : any => (
                            <tr key={index}>
                                    <td>{segment.departure.iataCode}</td>
                                    <td>{segment.departure.at}</td>
                                    <td>{segment.arrival.iataCode}</td>
                                    <td>{segment.arrival.at}</td>
                                </tr>
                                ))}    
                            </tbody>
                        </FilghtTable>
                        <FilghtTable>
                        <Thead>
                            <tr>
                                <td>통화</td>
                                <td>기본 금액</td>    
                                <td>총액</td>
                            </tr>
                        </Thead>
                        <tbody>
                            <tr>
                                <td>{price.currency}</td>
                                <td>{price.base}</td>    
                                <td>{price.total}</td>
                            </tr>
                        </tbody>
                        </FilghtTable>
                        <div>
                            <button onClick = {()=>handlePayment(price.currency, price.total)}>결제하기</button>
                            <button onClick = {()=>dispatch(addFlight(cartPayload))}>카트 담기</button>
                        </div>
                    </FlightInfoDiv>    
            </>
        )

    }),[flightResponseData, dispatch])

    return(
        <>
            <p>항공권 예약 정보를 선택후 검색하세요.</p>
            <ExampleButton onClick = {selectFlightOptionExample}>검색 조건 자동 선택</ExampleButton>
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
                            changeCountry = {changeFlightOption('arriveCountry')}
                            changeIataCode = {changeFlightOption('arriveIataCode')}
                            country = {searchFlightOption.arriveCountry} 
                            arrive/>
                        </DivFlexRow>
                        <DivFlexRow>
                            <DatePickerComponent 
                                name = "예약 날짜 선택" 
                                selectedDate={searchFlightOption.selectedFlightDate} 
                                changeDateFunc={changeFlightDate}/>
                        </DivFlexRow>
                        <SelectBoxComponent 
                            htmlFor="personNumber" 
                            labelName = "탑승 인원(명)" 
                            onChangeFunc = {() => {changeFlightOption('personNumber')}} 
                            optionValues = {["1","2","3","4","5","6"]}/>    
                        <SubmitButton type = "submit" value="검색"/>
                </form>
            </DivFlexRowFlight>
            {flightInfo}
        </>
    )

}

