import { IAvailabilityRepository } from '../repositories/IAvailabilityRepository';
import {inject, injectable} from "tsyringe"
import {AppError} from '../../../shared/errors/AppError';
import {isBefore} from "date-fns"

interface IRequest{
   date:string;
   morning_start_time:string;
   morning_end_time: string;
   afternoon_start_time:string;
   afternoon_end_time:string;
   user_id:string;
}

@injectable()
class CreateAvailabilityService {

  constructor(
    @inject("AvailabilityRepository")
    private AvailabilityRepository: IAvailabilityRepository) {
  }

  async execute(data:IRequest):Promise<void> {
   
    const date = data.date
    const user_id = data.user_id
    const AvailabilityAlreadyExists = await this.AvailabilityRepository.findByDate(date, user_id)

    if(AvailabilityAlreadyExists){
      throw new AppError("Availability already exists for this date")
    }



    await this.AvailabilityRepository.create(data)
  
  }
}

export { CreateAvailabilityService };
