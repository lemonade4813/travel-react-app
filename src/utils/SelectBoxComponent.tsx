import { Label, Select} from "./commonStyle";

const SelectBoxComponent = (props : {
                                    htmlFor : string,
                                    labelName : string, 
                                    onChangeFunc : (event?: React.ChangeEvent<HTMLSelectElement>) => void, 
                                    optionValues : string[]}) => {
const {htmlFor, labelName, onChangeFunc, optionValues} = props;

return(
    <>
    <Label htmlFor = {htmlFor}>{labelName}</Label>
    <Select id = {htmlFor} onChange={onChangeFunc}>
        <option>===선택하세요===</option>
        {optionValues.map((val : string)=>
        <option key = {val} value = {val}>{val}</option>
        )
    }
    </Select>
    </>    
    )
}

export default SelectBoxComponent;