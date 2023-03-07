import { useCallback, useState } from "react"
import styled from "styled-components"
import {selectHotelOptionsType} from "./type"
import SelectBox from "../../utils/FlightSelectBox"
import HotelSelectBox from "../../utils/HotelSelectBox"
const HotelDiv = styled.div`
    display : flex;
    flex-diection : row;
    justify-content : center;
    align-items : center;
`    

const HotelInfoDiv = styled(HotelDiv)`

    margin : 0px auto;
    width : 80%;
    padding : 15px; 
    border : 3px #99ccff solid;
    margin-top : 40px;
    margin-bottom : 40px;
    border-radius : 10px;
`   

export default function Hotel(){
    

    const AMADEUS_API_ID = "obCv6RoAxEq0IdbHANdGncCabaugPCwU"
    const AMADEUS_API_KEY = "DDOBeUcEConOZYQG"

    const[accessToken, setAccessToken] = useState<string|undefined>('')    
    const[hotelResponseData, setHotelResponseData] = useState<any>([])
    const[searchHotelOption, setSearchHotelOption] = useState<selectHotelOptionsType>({
        country: "", cityCode : "", radius : "", ratings : ""
    }) 


    const changeCountry = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, country : e.target.value}))
    },[])
    const changeCityCode = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, cityCode : e.target.value}))
    },[])

    const changeRadius  = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, radius: e.target.value}))
	},[])

    const changeRatings = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelOption(prevState => ({...prevState, ratings : e.target.value}))
    },[])




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

        const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL`
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
            setHotelResponseData(data.data)
            setAccessToken(token)
        })
        .catch((err)=>{
            alert(err.message)
            console.log(err)
            window.location.reload();
        })
    }

    return(
        <HotelDiv>
                <form onSubmit={fetchData}>
                    <div>
                        <HotelSelectBox 
                        changeCountry = {changeCountry} 
                        country = {searchHotelOption.country}
                        changeCity = {changeCityCode} 
                        changeRadius = {changeRadius}
                        changeRating = {changeRatings}
                        />
                    </div>
                </form>
        </HotelDiv>
    )
}