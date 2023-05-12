import { useSelector } from "react-redux"

const Cart = () => {

    const flightItems = useSelector((state : any)=>state.hotelItem)

    return(

    <table>
        {flightItems.map((item : any )=>{
            
            

        })}
    </table>
    )

}

export default Cart