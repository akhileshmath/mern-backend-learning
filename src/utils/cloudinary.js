import { v2 as cloudinary} from "cloudinary";
import { error } from "console";
import fs  from "fs";


// Configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });

// Upload an image
const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if (!localFilePath) return   null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"

            }
        )
        //file has been uploaded successuful
        console.log("file has been uploaded",
            response.url
        );
        return response;

    } catch (error){
        fs.unlinkSync(localFilePath) // remove the locally saved tempory file as the up;oad operation got failed 
        return null;
    }

}




export {uploadOnCloudinary}