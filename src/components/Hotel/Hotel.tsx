import { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import {selectHotelOptionsType, searchHotelOfferOptionType} from "./type"
import HotelSelectBox from "./HotelSelectBox"
import HotelList from "./HotelList"
import HotelOffers from "./HotelOffers"
import HotelOfferSelectBox from "./HotelOfferSelectBox"
import { fetchData } from "../../utils/apiCallFunc"
import { DivFlexRow, DivFlow } from "../../utils/commonStyle"
import DatePicker from "react-datepicker"
import { ko } from "date-fns/locale"

const HotelDiv = styled.div`
    margin-top : 20px;
    display : flex;
    flex-diection : row;
    justify-content : center;
    align-items : center;
`    

// const HotelInfoDiv = styled(HotelDiv)`

//     margin : 0px auto;
//     width : 80%;
//     padding : 15px; 
//     border : 3px #99ccff solid;
//     margin-top : 40px;
//     margin-bottom : 40px;
//     border-radius : 10px;
// `   

export default function Hotel(){
    
   
    const[hotelListResponseData, setHotelListResponseData] = useState<any>([])
    const[searchHotelOption, setSearchHotelOption] = useState<selectHotelOptionsType>({
        country: '', cityCode : '', radius : '', ratings : ''
    }) 
  
    const[searchHotelOfferOption, setSearchHotelOfferOption] = useState<searchHotelOfferOptionType>({
        hotelId : '', adults : '', checkInDate : null , checkOutDate : null , roomQuantity : ''
    })

    const[HotelOffersResponseData, setHotelOffersResponseData] = useState<any>([])


    const[selectedHotelIndex, setSelectedHotelIndex] = useState<any>('')

    const changeCountry = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, country : e.target.value}))
    }
    const changeCityCode = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, cityCode : e.target.value}))
    },[])

    const changeRadius  = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, radius: e.target.value}))
	},[])

    const changeRatings = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, ratings : e.target.value}))
    },[])


    const changeHotelId = useCallback((hotelId :string, index : string) => {
        setSearchHotelOfferOption(prevState =>({...prevState, hotelId : hotelId }))
        setSelectedHotelIndex(index)
    },[])

    const changeAdults = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, adults : e.target.value}))
    },[])

    const changeCheckInDate = useCallback((date : Date | null) => {
        setSearchHotelOption(prevState => ({...prevState, checkedInDate : date}))
    },[])

    const changeCheckOutDate = useCallback((date : Date | null) => {
        setSearchHotelOption(prevState => ({...prevState, checkOutDate : date}))
    },[])

    const changeRoomQuantity = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, roomQuantity : e.target.value}))
    },[])

    console.log(searchHotelOfferOption)
    console.log(`selectedHotelIndex : ${selectedHotelIndex}`)

const hotelListCallUrl = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL`

const hotelOffersCallUrl = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2023-11-22&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`


const fetchHotelListData = (e : React.FormEvent<HTMLFormElement>) =>{

    fetchData(e, hotelListCallUrl)
    .then((res)=>{
        setHotelListResponseData(res.data)
    })
}

console.log(searchHotelOption)

const fetchHotelOffersData = (e : React.FormEvent<HTMLFormElement>) =>{

    fetchData(e, hotelOffersCallUrl)
    .then((res)=>{
        setHotelOffersResponseData(res.data)
    })
}

    return(
        <>
            <p>STEP 1. 국가와 도시명을 선택하여 호텔 리스트를 검색하세요.</p>
            <HotelDiv>
                <form onSubmit={fetchHotelListData}>
                    <div>
                        <HotelSelectBox 
                        changeCountry = {changeCountry} 
                        country = {searchHotelOption.country}
                        changeCity = {changeCityCode} 
                        changeRadius = {changeRadius}
                        changeRating = {changeRatings}
                        />
                    </div>
                    <input type = "submit" value="조회"/>
                </form>
            </HotelDiv>
            <p>STEP 2. 호텔과 원하는 객실의 조건과 날짜를 선택하세요.</p>
            <HotelDiv>
            <form onSubmit={fetchHotelOffersData}>
            <DivFlexRow>
            <div>
            <p>호텔 선택</p>    
            <HotelList hotelList={hotelListResponseData} setSelectHotel = {(hotelId : string, index : string) => {changeHotelId(hotelId, index)}}/>
            </div>
                    <HotelOfferSelectBox 
                    changeAdults ={changeAdults} 
                    changeCheckInDate = {changeCheckInDate}
                    changeCheckOutDate = {changeCheckOutDate}
                    roomQuantity = {changeRoomQuantity}
                    selectedCheckInDate = {searchHotelOfferOption.checkInDate}
                    selectedCheckOutDate = {searchHotelOfferOption.checkOutDate}/>
            </DivFlexRow>
                <input type = "submit" value="조회"/>
            </form>
        
         </HotelDiv>
         <HotelOffers hotelOffers = {HotelOffersResponseData}/>
        </>
    )
}