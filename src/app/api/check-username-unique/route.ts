import  dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation} from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})
 export async function GET(request: Request) {
    await dbConnect();
    // localhost:3000/api/cuu?username=rakesh?phone=android

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username")
        }
        //-----------------------------------------------validate with zod 
       const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result) //todo remove
        if (!result.success) {
           const usernameErrors =result.error.format().
           username?._errors || []
           return Response.json({
               success: false,
               message: usernameErrors?.length > 0     //  use ternary operator
               ? usernameErrors.join(", ")
               :"Invalid Query Parameters",
           }, {status :400})
        }

        const {username} = result.data
        
     const existingVerifieldUser = await  UserModel.findOne ({
        username, isVerified: true})
        if(existingVerifieldUser){
             return Response.json({
               success: false,
               message: "User Name is Already Taken"
           }, {status :400})

        }
          return Response.json({
               success: true,
               message: "User Name is Unique"
           }, {status :400})

      
    
    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        },
        { status: 500 }
    )
    }
 }