import { AppError } from "../shared/errors/AppError"

export default function verifyKey(key:string){

   //ANTONIELEM
   const createUserKey = "4c176028a04a101cba2d36ca5cbb1155"
   if(key != createUserKey){
      throw new AppError("Invalid key to create user")
   }
}