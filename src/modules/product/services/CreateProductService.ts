import { IProductsRepository } from '../repositories/IProductsRepository';
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  price: string;
  duration: string;
  user_id: string;
  image_url: string
}

@injectable()
class CreateProductService {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {
  }


  async execute({
    name, description, price, duration, user_id, image_url
  }: IRequest): Promise<void> {
    try {
      const productAlreadyExists = await this.productsRepository.findByName(name)

      if (productAlreadyExists) {
        throw new AppError("Product already exists")
      }


      const enabled = true;
      await this.productsRepository.create({
        name, description, duration, price, user_id, enabled, image_url
      });


    } catch (error) {

    }

  }
}

export { CreateProductService };
