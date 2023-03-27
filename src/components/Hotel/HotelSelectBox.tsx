import styled from "styled-components";
import { cityLists, cityCodeLists } from "../../files/CityCodeList";

import { Label, Select, DivFlexColumn, DivFlexRow} from "../../utils/commonStyle";
import SelectBoxComponent from "../../utils/SelectBoxComponent";


const DivFlexColumnHotelSelectBox = styled(DivFlexColumn)`
	height : 300px;
`

const HotelSelectBox = (props : any) => {

	return (
		<>
			<DivFlexColumnHotelSelectBox>
				    <DivFlexRow>
					<SelectBoxComponent 
                            htmlFor="selectCountry" 
                            labelName = "국가" 
                            onChangeFunc = {props.changeCountry} 
                            optionValues = {cityLists.sort()}/>
					</DivFlexRow>
					<DivFlexRow>
					<SelectBoxComponent 
                            htmlFor="selectCity" 
                            labelName = "도시" 
                            onChangeFunc = {props.changeCountry} 
                            optionValues = {cityCodeLists.filter((cityCodeList) => (cityCodeList.country === props.country)).map((city)=>city.cityCode)}/>
					</DivFlexRow>
					<DivFlexRow>
					<SelectBoxComponent 
                            htmlFor="selectRadius" 
                            labelName = "반경선택(km)" 
                            onChangeFunc = {props.radius} 
                            optionValues = {['1','2','3','4','5','6','7','8','9','10']}/>
					</DivFlexRow>
					<DivFlexRow>
					<SelectBoxComponent 
                            htmlFor="selectRating" 
                            labelName = "호텔등급(stars)" 
                            onChangeFunc ={props.ratings} 
                            optionValues = {['1','2','3','4','5']}/>	
					</DivFlexRow>          
				</DivFlexColumnHotelSelectBox>
		</>
	);
};


export default HotelSelectBox;
