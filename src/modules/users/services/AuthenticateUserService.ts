import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt"
import { AppError } from "../../../shared/errors/AppError";
import { OAuth2Client, TokenPayload } from 'google-auth-library'


interface IResquest {
   username: string;
   password: string;
}

interface IResponse {
   user: {
      name: string
      username: string;
      user_id: string;
      business_name: string;
   },
   token: string;
}

@injectable()
class AuthenticateUserService {
   private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

   constructor(
      @inject("UserRepository")
      private UserRepository: IUserRepository) {
   }

   async execute({ username, password }: IResquest): Promise<IResponse> {

      const user = await this.UserRepository.findByName(username)

      if (!user) {
         throw new AppError("Email or password incorrect")
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
         throw new AppError("Email or password incorrect")
      }

      const token = sign({}, "a401dd02b72c03e65c64d1ec858def08", {
         subject: user.id,
         expiresIn: "10d"
      });

      const tokenReturn: IResponse = {
         token,
         user: {
            name: user.name,
            username: user.username,
            user_id: user.id,
            business_name: user.business_name
         }
      }

      return tokenReturn
   }

   async executeGoogle( google_id_token:string ): Promise<IResponse> {

      const ticket = await this.googleClient.verifyIdToken({
         idToken: google_id_token,
         audience: process.env.GOOGLE_CLIENT_ID, // the CLIENT_ID configured on Google console APIs
       })

      const payload: TokenPayload | undefined = ticket.getPayload()
      const google_user_email = payload?.email ?? ''
 
      const user = await this.UserRepository.findByName(google_user_email)
      let token = "" 
      let tokenReturn: IResponse = {
         token: "",
         user: {
            name: "",
            username: "",
            user_id: "",
            business_name: ""
         }
      }
      if (!user && payload?.email_verified) {
         if (payload.email != null) {
            const new_name = payload.name || 'New User'
            const profile_image = payload.picture || ''
            const password = ''
            const apple_id = ''
            const phone_number = ''
  
            await this.UserRepository.create({
               name: new_name, password:"", username: google_user_email, user_level: "normal"
             });
          }

         const newUser = await this.UserRepository.findByName(google_user_email)
         if(!newUser){
            throw new AppError("Error when creating user with google")
         }

         token = sign({}, "a401dd02b72c03e65c64d1ec858def08", {
            subject: newUser.id,
            expiresIn: "10d"
         });

         tokenReturn  = {
            token,
            user: {
               name: newUser.name,
               username: newUser.username,
               user_id: newUser.id,
               business_name: newUser.business_name
            }
         }
      }

      return tokenReturn
   }
}

export { AuthenticateUserService }