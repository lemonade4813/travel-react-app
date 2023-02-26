import {filghtListType} from "../../type/Flight/filghtListType"

import * as style from "../../style/style"

import styled from "styled-components"

const FilghtDataSegmentTable = styled(style.Table)`
height : 100px;
width : 800px;
`
const FlightDataSegments = (props: any) => {


    console.log("flightDataSegments : " +  JSON.stringify(props.flightDataSegments))

    return (
        <FilghtDataSegmentTable>
            <style.Thead>
                <tr>
                    <th>출발공항코드</th>
                    <th>출발시간</th>
                    <th>도착공항코드</th>
                    <th>도착시간</th>
                </tr>
            </style.Thead>
            <tbody>
                {props.flightDataSegments.map((segment:any, index:any) : any => (
               <tr key={index}>
                    <td>{segment.departure.iataCode}</td>
                    <td>{segment.departure.at}</td>
                    <td>{segment.arrival.iataCode}</td>
                    <td>{segment.arrival.at}</td>
                </tr>
                ))}    
            </tbody>
        </FilghtDataSegmentTable>
    
    )
}
export default FlightDataSegments;
