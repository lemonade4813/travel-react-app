import { DivDatePicker, Span } from "./commonStyle"

import DatePicker from "react-datepicker"
import { ko } from "date-fns/locale"

const DatePickerComponent = (props : {name : string, selectedDate? : Date | null, changeDateFunc : any} ) => {
const {name, selectedDate, changeDateFunc} = props;
    
return(            
            <DivDatePicker>
                        <Span>{name}</Span>
                        <DatePicker
                        locale={ko} 
                        dateFormat="yyyy-MM-dd"
                        className="input-datepicker"
                        minDate={new Date()}
                        closeOnScroll={true}
                        placeholderText="예약 날짜 선택"
                        selected={selectedDate}
                        onChange={(date)=> changeDateFunc(date)}/>
            </DivDatePicker>
    )
}

export default DatePickerComponent;