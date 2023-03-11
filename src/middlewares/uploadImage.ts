const { existsSync, mkdir } = require('fs')
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";

import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


export default {

   multer: {

      storage: multer.diskStorage({

         async destination(request, file, callback) {
            let userName = "WithoutUser"
            const user_id = request.body.user_id
            const userRepository = new UserRepository()
            const user = await userRepository.findById(user_id)
            userName = user?.username

            let dest = path.resolve(__dirname, '..', 'images', "users", userName)

            /* Verifica se o diretório com o nome do usuário não existe, caso nao, cria */
            if (!existsSync(dest)) {

               mkdir(dest, function (err: any) {
                  if (err) {
                     console.log(err)
                  } else {
                     console.log("New directory successfully created.")
                  }
               })
            }

            return callback(null, dest)
         },
         filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("HEX");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
         },
      }),

   },
};