import DatePicker from "react-datepicker"
import styled from "styled-components"
import { ko } from "date-fns/locale"
import { SelectBoxDiv, Label, Select, DivFlexRow, DivFlow } from "../../utils/commonStyle";


const HotelOfferSelectBox = (props : any) => {

    return (
        <DivFlow>
                    <Label htmlFor = "adults">예약인원</Label>
					<Select onClick={props.changeAdults} id ="adults">
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
                    <DivFlexRow>
                        <p>체크인 일자</p>
                        <DatePicker
                        locale={ko} 
                        dateFormat="yyyy-MM-dd"
                        className="input-datepicker"
                        minDate={new Date()}
                        closeOnScroll={true}
                        placeholderText="예약 날짜 선택"
                        selected={props.selectedCheckInDate}
                        onChange={(date)=> props.changeCheckInDate(date)}/>
                    </DivFlexRow>
                    <DivFlexRow>
                        <p>체크아웃 일자</p>
                        <DatePicker
                        locale={ko} 
                        dateFormat="yyyy-MM-dd"
                        className="input-datepicker"
                        minDate={new Date()}
                        closeOnScroll={true}
                        placeholderText="예약 날짜 선택"
                        selected={props.selectedCheckOutDate}
                        onChange={(date)=> props.changeCheckOutDate(date)}/>
                    </DivFlexRow>
                    <Label htmlFor = "roomQuantity">예약 객실 수</Label>
					<Select onClick={props.changeRoomQuantity} id ="roomQuantity">
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
            </DivFlow>
    )
}

export default HotelOfferSelectBox