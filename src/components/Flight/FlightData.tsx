import {filghtListType} from "../../type/Flight/filghtListType"
import * as style from "../../style/style"
import styled from "styled-components"

const FilghtTable = styled(style.Table)`
height : 100px;
width : 400px;
`

const FlightList = (props: any) => {

    return (
        <FilghtTable>
            <style.Thead>
                <style.Tr>
                    <th>편도여부</th>
                    <th>예약가능 좌석</th>
                    <th>예약마감일자</th>
                </style.Tr>
            </style.Thead>
            <tbody>
                <style.Tr>
                    {props.flightData.oneWay === 'true' ? <style.Td>예</style.Td> : <style.Td>아니오</style.Td> }
                    <style.Td>{props.flightData.numberOfBookableSeats}</style.Td>
                    <style.Td>{props.flightData.lastTicketingDate}</style.Td>
                </style.Tr>    
            </tbody>
        </FilghtTable>
    )
}

export default FlightList;