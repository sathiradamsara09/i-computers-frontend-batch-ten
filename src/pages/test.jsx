
// import { useState } from "react";
// import uploadMedia from "../utils/mediaUpload";



// export default function TestPage(){

//      const [file , setFile] = useState(null);

//      async function handleUpload(){

//         try{
//             const url = await uploadMedia(file);
//             console.log("Public URL: ", url);
//         } catch (error) {
//             console.log(error);
//         }
        

//      }
    
//      function handleUploadOld(){
        
//         uploadMedia(file)
//         .then((url)=>{
//             console.log("Public URL: ", url);
//         })
//         .catch((error)=>{
//             console.log(error);
//         });
//      }


//     return(
//         <div className="w-full h-screen flex  flex-col justify-center items-center bg-primary text-secondary">

//             <input onChange={
//                 (e)=>{
                
//                     setFile(e.target.files[0]);
//                 } 
//             }  type="file"/>

//             <button onClick={handleUpload} className="bg-secondary text-primary px-4 py-2 rounded-lg mt-4 hover:bg-secondary/80 transition-all duration-300">
//                 Upload
//             </button>

//         </div>
//     )

// }

export default function TestPage(){
    return(
        <div className="w-full h-screen flex justify-center items-center bg-primary text-secondary flex-col gap-10">

           <h1 className="text-3xl font-bold">Test Page</h1>
           <p>This is a test page</p>

        </div>
    );
}