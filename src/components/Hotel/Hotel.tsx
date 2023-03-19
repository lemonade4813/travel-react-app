import { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import HotelSelectBox from "./HotelSelectBox"
import {selectHotelOptionsType, searchHotelOfferOptionType} from "./type"
import HotelList from "./HotelList"
import HotelOffers from "./HotelOffers"
import HotelOfferSelectBox from "./HotelOfferSelectBox"
import { fetchData } from "../../utils/apiCallFunc"
import { DivFlexRow } from "../../utils/commonStyle"
import { HotelOffersResponseDataSample } from "../../files/HotelOffersResponseDataSample"

const DivHotelSelectBox = styled(DivFlexRow)`
    width : 70%;
    margin: 30px auto 30px;
`

export default function Hotel(){
    
   
    const[hotelListResponseData, setHotelListResponseData] = useState<any>([])
    const[searchHotelOption, setSearchHotelOption] = useState<selectHotelOptionsType>({
        country: '', cityCode : '', radius : '', ratings : ''
    }) 
  
    const[searchHotelOfferOption, setSearchHotelOfferOption] = useState<searchHotelOfferOptionType>({
        hotelId : '', adults : '', checkInDate : null , checkOutDate : null , roomQuantity : ''
    })

    const[hotelOffersResponseData, setHotelOffersResponseData] = useState<any>([])


    const[selectedHotelIndex, setSelectedHotelIndex] = useState<any>('')

    const changeHotelOption = useCallback((key : string) => (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, [key] : e.target.value}))
    },[])

    const changeHotelId = useCallback((hotelId :string, index : string) => {
        setSearchHotelOfferOption(prevState =>({...prevState, hotelId : hotelId }))
        setSelectedHotelIndex(index)
    },[])

    const changeHotelOfferOption = useCallback((key : string) => (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOfferOption(prevState => ({...prevState, [key] : e.target.value}))
    },[])


    const changeCheckInOutDate = useCallback((key : string) => (date : Date | null) => {
        setSearchHotelOfferOption(prevState => ({...prevState, [key] : date}))
    },[])

console.log(searchHotelOfferOption)    

const hotelListCallUrl = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${searchHotelOption.cityCode}&radius=${searchHotelOption.radius}&radiusUnit=KM&hotelSource=ALL&ratings=${searchHotelOption.ratings}`

const hotelOffersCallUrl = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2023-11-22&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`


const fetchHotelListData = (e : React.FormEvent<HTMLFormElement>) =>{

    
    fetchData(e, hotelListCallUrl)
    .then((res)=>{

        setHotelListResponseData(res.data)
})
}
const fetchHotelOffersData = (e : React.FormEvent<HTMLFormElement>) =>{

    fetchData(e, hotelOffersCallUrl)
    .then((res)=>{
        
        res.length > 0 ? setHotelOffersResponseData(res.data) : setHotelOffersResponseData(HotelOffersResponseDataSample.data[0])
    })

}


const selectHotelExample = () =>{
    setSearchHotelOption({country : '프랑스', cityCode : 'PAR', radius : '5', ratings : '1'})
}

const selecthotelOfferExample = () => {
    setSearchHotelOfferOption({hotelId : 'MCLONGHM', adults : '1', checkInDate : new Date('2023-11-23') , checkOutDate : new Date('2023-11-24') , roomQuantity : '1' })

}

console.log(`searchHotelOfferOption : ${searchHotelOfferOption}`)    
    return(
        <>
    <DivHotelSelectBox>
            <div>
            <p>STEP 1. 국가와 도시명을 선택하여 호텔 리스트를 검색하세요.</p>
            <button onClick={selectHotelExample}>Example</button>
                <form onSubmit={fetchHotelListData}>
                    <div>
                        <HotelSelectBox 
                        changeCountry = {changeHotelOption('country')} 
                        country = {searchHotelOption.country}
                        changeCity = {changeHotelOption('cityCode')} 
                        changeRadius = {changeHotelOption('radius')}
                        changeRatings = {changeHotelOption('ratings')}
                        />
                    </div>
                    <input type = "submit" value="조회"/>
                </form>
            </div>
            <div>
                <p>STEP 2. 호텔과 원하는 객실의 조건과 날짜를 선택하세요.</p>
                    {hotelListResponseData.length > 0 ? (<div>
                <div>
                <button onClick = {selecthotelOfferExample}>Example</button>
                <form onSubmit={fetchHotelOffersData}>
                    <div>
                        <p>호텔 선택</p>
                        {searchHotelOfferOption.hotelId ? <p>선택된 호텔 ID : {searchHotelOfferOption.hotelId}</p> : <p></p>}    
                        <HotelList hotelList={hotelListResponseData} setSelectHotel = {(hotelId : string, index : string) => {changeHotelId(hotelId, index)}}/>
                    </div>
                    <HotelOfferSelectBox 
                    changeAdults ={changeHotelOfferOption('adults')} 
                    changeCheckInDate = {changeCheckInOutDate('checkIndate')}
                    changeCheckOutDate = {changeCheckInOutDate('checkOutDate')}
                    changeRoomQuantity = {changeHotelOfferOption('roomQuantity')}
                    selectedCheckInDate = {searchHotelOfferOption.checkInDate}
                    selectedCheckOutDate = {searchHotelOfferOption.checkOutDate}/>
                <input type = "submit" value="조회"/>
                </form>
                </div>
            </div>): <p></p>}
            </div>
            </DivHotelSelectBox>
         <HotelOffers hotelOffers = {hotelOffersResponseData}/>
        </>
    )
}