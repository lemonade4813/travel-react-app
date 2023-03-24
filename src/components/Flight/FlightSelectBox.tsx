import styled from "styled-components";
import { airportLists, countryLists } from "../../files/AirportList";
import { DivFlexRow, Label, Select } from "../../utils/commonStyle";

const DivSelectBox = styled(DivFlexRow)`
    border : none;
    align-items : center;
	margin : 0;
`

const flightSelectBox = (props : any) => {


let selectType;

	props.depart ? selectType = '출발' : selectType = '도착'

	return (
		<>
			<DivSelectBox>
				<Label htmlFor ="selectCountry">{selectType}국가</Label>
					<Select id ="selectCountry" onChange={props.changeCountry}>
						<option value="">===선택하세요===</option>
					{countryLists.sort().map((country) => (
						<option
							key={country}
							value={country}
						>
							{country}
						</option>
					))}
					</Select>
			</DivSelectBox>	
			<DivSelectBox>	
				<Label htmlFor = "selectAirport">{selectType}공항</Label>
					<Select id ="selectCountry" onChange={props.changeIataCode} disabled={props.selectCountry}>
						<option value="">===선택하세요===</option>
					{airportLists.filter((airport) => (airport.country === props.country)).map((airport) => (
						<option
							key={airport.name}
							value={airport.code}
						>
							{airport.name}
						</option>
					))}
					</Select>
			</DivSelectBox>
		</>
	);
};


export default flightSelectBox;