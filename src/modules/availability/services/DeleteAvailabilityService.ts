import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IAvailabilityRepository } from '../repositories/IAvailabilityRepository';

interface IRequest{
   name:string;
   description:string;
   price: string;
   duration:string;
}

@injectable()
class DeleteAvailabilityService {

  constructor(
    @inject("AvailabilityRepository")
    private availabilityRepository: IAvailabilityRepository) {
  }

  async execute(id:string): Promise<void> {

     const findavailability = await this.availabilityRepository.findById(id)

     if(!findavailability){
        throw new AppError("Availability not found with this id")
     }

     await this.availabilityRepository.deleteById(id);
  }
}

export { DeleteAvailabilityService };
