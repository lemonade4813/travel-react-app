import styled from "styled-components";
import { airportLists, countryLists } from "../airportList/AirportList";


const Label = styled.label`
	margin : 15px;
`

const Select = styled.select`
	width : 250px;
	height : 30px;
`


const SelectBoxDiv = styled.div`
	margin-bottom : 10px;
	margin-right : 20px;
`
const flightSelectBox = (props : any) => {

	

let selectType;

	props.depart ? selectType = '출발' : selectType = '도착'


console.log(countryLists)
	return (
		<>
			<SelectBoxDiv>
				<Label htmlFor ="selectCountry">{selectType}국가</Label>
					<Select id ="selectCountry" onChange={props.changeCountry} disabled={props.selectCountry}>
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
				<Label htmlFor = "selectAirport">{selectType}공항</Label>
					<Select id ="selectCountry" onChange={props.changeIataCode}>
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
						
			{/* <label>출발국가선택
			<select onChange={props.changeDepartCountry}>
					<option value="">===선택하세요===</option>
				{countryLists.sort().map((country, index) => (
					<option
						key={country}
						value={country}
					>
						{country}
					</option>
				))}
			</select>
			</label>
			{props.departCountry && (
				<label>출발공항코드
				<select onChange={props.changeDepartIataCode}>
					<option value="">===선택하세요===</option>
				{airportLists.filter((airport) => (airport.country === props.departCountry)).map((airport, index) => (
					<option
						key={airport.name}
						value={airport.code}
					>
						{airport.name}
					</option>
				))}
			</select>
			</label>)}
			<label>도착국가선택
			<select onChange={props.changeArriveCountry}>
					<option value="">===선택하세요===</option>
				{countryLists.map((country, index) => (
					<option
						key={country}
						value={country}
					>
						{country}
					</option>
				))}
			</select>
			</label>
			{props.arriveCountry && (
				<label>도착공항코드
				<select onChange={props.changeArriveIataCode}>
					<option value="">===선택하세요===</option>
				{airportLists.filter((airport) => (airport.country === props.arriveCountry)).map((airport, index) => (
					<option
						key={airport.name}
						value={airport.code}
					>
						{airport.name}
					</option>
				))}
			</select>
			</label>)}		 */}
			</SelectBoxDiv>
		</>
	);
};


export default flightSelectBox;