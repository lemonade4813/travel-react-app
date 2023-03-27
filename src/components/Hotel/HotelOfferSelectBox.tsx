import DatePicker from "react-datepicker"
import styled from "styled-components"
import { ko } from "date-fns/locale"
import SelectBoxComponent from "../../utils/SelectBoxComponent"
import { Label, Select, Span, DivFlexColumn,DivDatePicker, DivFlexRow} from "../../utils/commonStyle";
import DatePickerComponent from "../../utils/DatePickerComponent";


const HotelOfferSelectBox = (props : any) => {
    return (
                <>    
                    <DivFlexRow>
                        <SelectBoxComponent 
                        htmlFor="adults" 
                        labelName = "예약인원" 
                        onChangeFunc = {props.changeAdults} 
                        optionValues = {['1','2','3','4','5','6']}/>    
                    </DivFlexRow>
                    <DivFlexRow>
                        <SelectBoxComponent 
                        htmlFor="roomQuantity" 
                        labelName = "예약 객실 수" 
                        onChangeFunc = {props.changeRoomQuantity} 
                        optionValues = {['1','2','3','4','5']}/>
                    </DivFlexRow>
                    <DatePickerComponent 
                        name = "체크인 일자" 
                        selectedDate={props.selectedCheckInDate} 
                        changeDateFunc={props.changeCheckInDate}/>
                    <DatePickerComponent 
                        name = "체크아웃 일자" 
                        selectedDate={props.selectedCheckOutDate} 
                        changeDateFunc={props.changeCheckOutDate}/>
                </>    
    )
}

export default HotelOfferSelectBox