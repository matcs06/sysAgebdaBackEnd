
import path from 'path';
import { NextFunction, Request, Response } from "express"
import { ProductsRepository } from "../modules/product/repositories/implementations/ProductsRepository";
import { AppError } from '../shared/errors/AppError';
import { existsSync, unlink } from "fs"

export async function deleteFile(request: Request, response: Response, next: NextFunction) {


   let user_name = String(request.query.user_name)
   const { id } = request.params

   if (!user_name) {
      user_name = "nouser"
   }

   const productsRepository = new ProductsRepository()
   const productToDelete = await productsRepository.findById(id)

   if (!productToDelete) {
      throw new AppError("Product does not exists!")
   }

   const dest = path.resolve(__dirname, '..', 'images', "users", user_name)

   let image_url = productToDelete.image_url
   if (productToDelete.image_url === "" || productToDelete.image_url === null) {
      image_url = "nothing.png"
   }

   const fileToDelete = path.resolve(dest, image_url)

   /* Verifica se o diretório com o nome do usuário não existe, caso nao, cria */
   if (!existsSync(fileToDelete)) {
      next()
   } else {
      unlink(fileToDelete, (err) => {
         if (err) {
            console.error(err);
         } else {
            console.log("File removed!");
         }
      })
      next()
   }
}