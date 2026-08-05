import { createClient } from "@supabase/supabase-js";       


let url = import.meta.env.VITE_SUPABASE_URL;
let key = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(url, key);

export default function uploadMedia(file){

    return new Promise(

        (resolve, reject)=>{

            if(file == null){
                reject("No file selected");
                return;
            }


                const timeStamp = new Date().getTime();
                const fileName = timeStamp + "_" + file.name;

        supabase.storage.from("images").upload(fileName , file , {
                upsert : false,
                cacheControl : "3600",
            }) .then((response) => {

                if(response.error){
                    reject(response.error);
                    return;
                }

                const publicUrl = supabase.storage
                .from("images")
                .getPublicUrl(fileName).data.publicUrl;
            
            resolve(publicUrl);
            })
        .catch((error)=>{
            reject(error);
        });

    }
    );
     
}



