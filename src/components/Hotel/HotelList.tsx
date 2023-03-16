import styled from "styled-components"
import {Table, Thead} from "../../style/tableStyle"

const HotelListTable = styled(Table)`
width : 500px;
height : 200px;
display : block;
overflow : auto;
margin-top : 20px;

& > tbody tr:nth-child(2n+1){
    background-color : #f0f0f0;
}

& > tbody tr {
    height : 15px;
}
`

export const HotelList = ({hotelList, setSelectHotel} : {[key : string] : any}) =>{

        return(
            ( 
            <HotelListTable>
                <Thead>
                    <tr>
                        <th>번호</th>
                        <th>호텔명</th>
                        <th>거리(KM)</th>
                        <th>호텔ID</th>
                        <th>GeoCode</th> 
                    </tr>
                </Thead>
                <tbody>
        {hotelList.map((hotel:any, index:any) : any => (
            <tr key={index} onClick ={()=>setSelectHotel(hotel.hotelId, index)}>
                <td>{index + 1}</td>
                <td>{hotel.name}</td>
                <td>{hotel.distance.value}</td>
                <td>{hotel.hotelId}</td>
                <td>{hotel.geoCode.longitude}, {hotel.geoCode.latitude}</td>
            </tr>
                ))}    
                </tbody>
            </HotelListTable>
        )
    )
}

export default HotelList