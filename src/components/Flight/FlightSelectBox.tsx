import styled from "styled-components";
import { airportLists, countryLists } from "../../files/AirportList";
import { DivFlexRow, Label, Select } from "../../utils/commonStyle";
import SelectBoxComponent from "../../utils/SelectBoxComponent";


const flightSelectBox = (props : any) => {


let selectType;

	props.depart ? selectType = '출발' : selectType = '도착'

	return (
		<>
			<DivFlexRow>
				<SelectBoxComponent 
                    htmlFor="selectCountry" 
                    labelName = {`${selectType}국가`} 
                    onChangeFunc = {props.changeCountry} 
                    optionValues = {countryLists.sort()}/>
			</DivFlexRow>
			<DivFlexRow>
				<SelectBoxComponent 
                    htmlFor="selectCity" 
                    labelName = {`${selectType}공항`}
                    onChangeFunc = {props.changeIataCode} 
                    optionValues = {airportLists.filter((airport) => (airport.country === props.country)).map((airport)=>airport.code)}/>
			</DivFlexRow>
		</>
	);
};


export default flightSelectBox;