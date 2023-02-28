import {filghtListType} from "../../type/Flight/filghtListType"
import  {Table, Thead, Tr, Td}  from "../../style/tableStyle"
import styled from "styled-components"

const FilghtTable = styled(Table)`
height : 100px;
width : 400px;
`

const FlightList = (props: any) => {

    return (
        <FilghtTable>
            <Thead>
                <Tr>
                    <th>편도여부</th>
                    <th>예약가능 좌석</th>
                    <th>예약마감일자</th>
                </Tr>
            </Thead>
            <tbody>
                <Tr>
                    {props.flightData.oneWay === 'true' ? <Td>예</Td> : <Td>아니오</Td> }
                    <Td>{props.flightData.numberOfBookableSeats}</Td>
                    <Td>{props.flightData.lastTicketingDate}</Td>
                </Tr>    
            </tbody>
        </FilghtTable>
    )
}

export default FlightList;