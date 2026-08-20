import { Link } from "react-router-dom";
export default function ProductCard(props){
    
    const product = props.product;
    
    
    return(
       <Link to={"/overview"} className="w-[300px] h-[400px] mt-10 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 border justify-between cursor-pointer">
            <div className="w-[300px] h-[280px] bg-red-900 relative">
             <img src={product.images[1]} alt={product.productNamec} className="w-full bg-white h-full object-cover absolute top-0 left-0" />
                <img src={product.images[0]} alt={product.productNamec} className="w-full bg-white h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500" />
            </div>
                <h1 className="text-lg font-semibold mt-4 px-4">
                 {product.name}
                </h1>
            <div className="w-full flex flex-col py-4">
                {
                    product.labelledPrice > product.price && <span className="text-sm text-grey-500 text-gray-500 mt-2 px-4 line-through">{product.labelledPrice}</span>
                }
                    
                    <span className="text-lg font-bold mt-1 px-4">
                    LKR {product.price}
                    </span>
            </div>

        </Link> 
    )
}