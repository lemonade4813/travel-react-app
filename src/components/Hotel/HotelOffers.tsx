import styled from "styled-components"
import {Table, Thead} from "../../style/tableStyle"
import { addHotel } from "../../features/counter/counterSlice"
import { useDispatch } from "react-redux"

const HotelOffersTable = styled(Table)`

& > tbody tr:nth-child(2n+1){
    background-color : #f0f0f0;
}
`

const HotelOffers = ({hotelOffers} : any) => {

    const dispatch = useDispatch();

    const {hotel, offers} = hotelOffers

    return(
    <div>
        {hotel && offers && (    
        <>
        <p>호텔 상품 검색 결과</p>
        <div>
        <p>호텔 정보</p>
        <HotelOffersTable>
            <Thead>
                <tr>
                    <th>호텔ID</th>
                    <th>호텔명</th>
                    <th>체인코드</th>
                    <th>도시코드</th>
                </tr>
            </Thead>
            <tbody>
                <tr>
                    <td>{hotel.hotelId}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.chainCode}</td>
                    <td>{hotel.cityCode}</td>
                </tr>  
            </tbody>
        </HotelOffersTable>
        </div>
        <HotelOffersTable>
            <Thead>
                <tr>
                    <td>번호</td>
                    <td>상품ID</td>
                    <td>체크인 일자</td>
                    <td>체크아웃 일자</td>
                    <td>예약 인원</td>
                    <td>예약 취소 정책</td>
                    <td>객실 대여 시간</td>
                    <td>예약 방식</td>
                    <td>객실 설명</td>
                    <td>침대 타입</td>
                    <td>침대 수</td>
                    <td>객실 유형</td>
                    <td>기본 요금</td>
                    <td>전체 요금</td>
                    <td>결제 통화</td>
                </tr>
            </Thead>
                <tbody>
                {offers.map((offer : any, index : any) => 
                (
                <tr key ={offer.id}>
                    <td>{index + 1}</td>
                    <td>{offer.id}</td>
                    <td>{offer.checkInDate}</td>
                    <td>{offer.checkOutDate}</td>
                    <td>{offer.guests.adults}</td>
                    <td>{offer.policies.cancellation.type}</td>
                    <td>{offer.policies.cancellation.description.text}</td>
                    <td>{offer.policies.paymentType}</td>
                    <td>{offer.room.description.text}</td>
                    <td>{offer.room.typeEstimated.bedType}</td>
                    <td>{offer.room.typeEstimated.beds}</td>
                    <td>{offer.room.typeEstimated.category}</td>
                    <td>{offer.price.base}</td>
                    <td>{offer.price.total}</td>
                    <td>{offer.price.currency}</td>
                    {/* <td onClick = {()=>dispatch(addHotel(cartPayload))}>카트 담기</td> */}
                </tr>
            ))}
            </tbody>
        </HotelOffersTable>
        </>)}
        </div>
    )
}

export default HotelOffers