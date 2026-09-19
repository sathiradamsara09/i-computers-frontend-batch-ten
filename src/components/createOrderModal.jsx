import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function createOrderModal(props){
    /*firstName: user.firstName,
        lastName: user.lastName,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phone: req.body.phone,*/

    const [isModalOpen , setIsModalOpen] = useState(false)
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [addressLineOne , setAddressLineOne] = useState("")
    const [addressLineTwo , setAddressLineTwo] = useState("")
    const [city , setCity] = useState("")
    const [state , setState] = useState("")
    const [postalCode , setPostalCode] = useState("")
    const [phone , setPhone] = useState("")

    const cart = props.cart;

    async function createOrder(){
        try{

            const token = localStorage.getItem("token");

            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items : []
            }

            for(let i=0; i<cart.length; i++){
                data.items.push({
                    productId : cart[i].product.productId,
                    quantity : cart[i].quantity
                })
            }

            await api.post("/orders" , data , {
                headers : {
                    Authorization : "Bearer " + token
                }
            })

            toast.success("Order created successfully")
            setIsModalOpen(false)

        }catch(error){
            toast.error(error?.response?.data?.message || "An error occurred creating this order. ")
        }
    }

    return(
        <>
        <button className="bg-accent text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setIsModalOpen(true)}>Order now</button>
        {
            isModalOpen && 
            <div className="fixed bg-black/70 w-screen h-screen top-0 left-0 flex items-center justify-center">
                <div className="bg-white w-[400px] rounded-lg p-5 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Shipping Details</h1>
                    <input type="text" placeholder="First Name" className="border p-2 rounded-lg" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    <input type="text" placeholder="Last Name" className="border p-2 rounded-lg" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    <input type="text" placeholder="Address Line 1" className="border p-2 rounded-lg" value={addressLineOne} onChange={(e)=>setAddressLineOne(e.target.value)}/>
                    <input type="text" placeholder="Address Line 2" className="border p-2 rounded-lg" value={addressLineTwo} onChange={(e)=>setAddressLineTwo(e.target.value)}/>
                    <input type="text" placeholder="City" className="border p-2 rounded-lg" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    <input type="text" placeholder="State" className="border p-2 rounded-lg" value={state} onChange={(e)=>setState(e.target.value)}/>
                    <input type="text" placeholder="Postal Code" className="border p-2 rounded-lg" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
                    <input type="text" placeholder="Phone" className="border p-2 rounded-lg" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <div className="w-full flex flex-row justify-between items-center">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold" onClick={createOrder}
                            
                        >Place Order</button>


                    </div>
                </div>

                </div>
        }
        
        
        </>
    )
}       