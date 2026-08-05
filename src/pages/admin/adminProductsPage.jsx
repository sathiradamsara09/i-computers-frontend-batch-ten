
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


export default function AdminProductsPage(){
    return(
  <div className="w-full h-full p-5">    
        
        
        <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-accent flex justify-center items-center rounded-full text-white text-3xl shadow-2xl hover:bg-black hover:text-accent">
        
        <FaPlus />

        </Link>
       </div>
    )

}