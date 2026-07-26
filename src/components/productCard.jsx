export default function ProductCard(props){
    
    console.log(props.name)
    
    return(
       <div className="bg-[#00FF00] border w-56">
            <h1 className="text-white text-3xl">{props.name}</h1>
            <img src={props.image} alt={"picture of a "+props.name} />
            <p>LKR {props.price}</p>
            <button>Add to Cart</button>
        </div> 
    )
}