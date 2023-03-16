import styled from "styled-components";
import { cityLists, cityCodeLists } from "../../files/CityCodeList";

import { Label, Select, DivFlexColumn, DivFlexRow} from "../../utils/commonStyle";


const DivFlexColumnHotelSelectBox = styled(DivFlexColumn)`
	height : 300px;
`


const HotelSelectBox = (props : any) => {

	return (
		<>
			<DivFlexColumnHotelSelectBox>
				    <DivFlexRow>
					<Label htmlFor ="selectCountry">국가</Label>
					<Select id ="selectCountry" onChange={props.changeCountry}>
						<option value="">===선택하세요===</option>
					{cityLists.sort().map((city) => (
						<option
							key={city}
							value={city}
						>
							{city}
						</option>
					))}
					</Select>
					</DivFlexRow>
					<DivFlexRow>
                    <Label htmlFor = "selectCity">도시</Label>
					<Select id ="selectCity" onChange={props.changeCity}>
						<option value="">===선택하세요===</option>
					{cityCodeLists.filter((cityCodeList) => (cityCodeList.country === props.country)).map((city) => (
						<option
							key={city.cityCode}
							value={city.cityCode}
						>
							{city.city}
						</option>
					))}
					</Select>
					</DivFlexRow>
					<DivFlexRow>                
                    <Label htmlFor = "selectRating">반경선택(km)</Label>
					<Select id ="selectRating" onChange={props.changeCity}>
                            <option>===선택하세요===</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                    </Select>
					</DivFlexRow>
					<DivFlexRow>
                    <Label htmlFor = "selectRating">호텔등급(stars)</Label>
					<Select id ="selectRating" onChange={props.changeRadius}>
                            <option>===선택하세요===</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                    </Select>
					</DivFlexRow>          
				</DivFlexColumnHotelSelectBox>
		</>
	);
};


export default HotelSelectBox;
