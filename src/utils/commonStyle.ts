import styled from "styled-components"

export const Label = styled.label`
	width : 100px;
`

export const Select = styled.select`
	width : 50%;
	height : 30px;
`

export const DivFlexColumn = styled.div`
	margin-bottom : 10px;
	margin-right : 20px;
    padding : 10px;
    display : flex;
    flex-direction : column;
    justify-content : space-around;
    align-items : center;
    border : 1px solid rgba(137, 119, 173, 0.3);
    border-radius : 10px;
    
`
export const DivFlexRow = styled.div`
    border : 1px solid rgba(137, 119, 173, 0.3);
    border-radius : 10px;
    padding : 10px;
    display : flex;
    flex-direction : row;
    justify-content : space-around;
`

export const DivDatePicker = styled.div`

    border : 1px solid rgba(137, 119, 173, 0.3);
    border-radius : 10px;
    align-items : center;
    display : flex;
    flex-direction : row;
    justify-content : center;
`


export const Span = styled.span`
    margin-left : 30px;
    width : 40%;
    height : 40px;
`

export const SubmitButton = styled.input`
    font-family: var(--font-notoSansKRLight);
    width : 60px;
    height : 30px;
    background-color : #4527a0;
    border-style : none;
    color : #fff;
    margin-top : 10px;
`

export const ExampleButton = styled.button`
    font-family : var(--Dovemayo_gothic);
    width : 140px;
    height : 30px;
    background-color : #ffa500;
    color : #fff;
    margin-bottom : 10px;
    border-style : none;
`