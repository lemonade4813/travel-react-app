import {filghtListType} from "../../type/Flight/filghtListType"

import {Table, Thead, Tr, Td}  from "../../style/tableStyle"

import styled from "styled-components"

const FilghtDataSegmentTable = styled(Table)`
height : 100px;
width : 800px;
`
const FlightDataSegments = (props: any) => {


    console.log("flightDataSegments : " +  JSON.stringify(props.flightDataSegments))

    return (
       <p></p>
    
    )
}
export default FlightDataSegments;
