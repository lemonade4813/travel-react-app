import { airportLists, countryLists } from "../airportList/AirportList";

const SelectBox = (props : any) => {


console.log("departCountry : " + props.departCountry)
console.log("arriveCountry : " + props.arriveCountry)


let selectType;

	if(props.depart){
		selectType = '출발'
	}
	else{
		selectType = '도착'
	}


console.log(countryLists)
	return (
		<>
			<label>{selectType}국가선택
			<select onChange={props.changeCountry}>
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
			{props.country && (
				<label>{selectType}공항코드
				<select onChange={props.changeIataCode}>
					<option value="">===선택하세요===</option>
				{airportLists.filter((airport) => (airport.country === props.country)).map((airport, index) => (
					<option
						key={airport.name}
						value={airport.code}
					>
						{airport.name}
					</option>
				))}
			</select>
			</label>)}


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
		</>
	);
};


export default SelectBox;