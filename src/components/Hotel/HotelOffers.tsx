import styled from "styled-components"
import {Table, Thead} from "../../style/tableStyle"

const HotelTable = styled(Table)`
width : 500px;
height : 300px;
display : block;
overflow : auto;
margin-top : 20px;

& > tbody tr:nth-child(2n+1){
    background-color : #f0f0f0;
}
`




const HotelOffers = (props: any) => {

    return(
        <>
        <HotelTable>
            <Thead>
                <tr>
                    <th>호텔ID</th>
                    <th>체인코드</th>
                    <th>호텔명</th>
                    <th>도시코드</th>
                </tr>
            </Thead>
            <tbody>
                <tr>
                    <td>{props.hotelId}</td>
                    <td>{props.chanCode}</td>
                    <td>{props.name}</td>
                    <td>{props.cityCode}</td>
                </tr>  
            </tbody>
        </HotelTable>

        <HotelTable>
            <thead>
                <tr>
                    <td>상품ID</td>
                    <td>체크인 일자</td>
                    <td>체크아웃 일자</td>
                    <td>객실 타입</td>
                    <td>예약 인원</td>
                </tr>
            </thead>
                <tr>


                    
                </tr>



        </HotelTable>
        </>
    )

}

export default HotelOffers