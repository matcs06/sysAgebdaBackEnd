import { IProductsRepository } from '../repositories/IProductsRepository';
import {inject, injectable} from "tsyringe"
import {AppError} from '../../../shared/errors/AppError';
import { Product } from '../entities/Product';

interface IRequest{
   id: string;
   name:string;
   description:string;
   price: string;
   duration:string;
}

@injectable()
class UpdateProductService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }

  async execute({
    id, name, description, price, duration,
  }:IRequest):Promise<void> {
    try {
      const productAlreadyExists = await this.productsRepository.findById(id)

      if(!productAlreadyExists){
        throw new AppError("There is not a product with this id")
      }

      productAlreadyExists.name = name;
      productAlreadyExists.price = price;
      productAlreadyExists.description = description;
      productAlreadyExists.duration = duration;

      await this.productsRepository.save(productAlreadyExists)

    } catch (error) {
      throw new AppError("Error updating service")
      
    }
    
  }
}

export { UpdateProductService };
