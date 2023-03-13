import styled from "styled-components"

export const Label = styled.label`
	margin : 15px;
`

export const Select = styled.select`
	width : 250px;
	height : 30px;
`

export const SelectBoxDiv = styled.div`
	margin-bottom : 10px;
	margin-right : 20px;
    padding : 10px;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    border : 1px solid rgba(137, 119, 173, 0.3);
    border-radius : 10px
    
`
export const DivFlexRow = styled.div`
    border : 1px solid rgba(137, 119, 173, 0.3);
    border-radius : 10px;
    padding : 30px;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;

    & > p {
        width : 150px;
    }
`

export const DivFlow = styled.div`
    float : left;
`