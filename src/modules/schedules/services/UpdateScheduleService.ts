import {  ISchedulesRepository} from '../repositories/ISchedulesRepository'
import {inject, injectable} from "tsyringe"
import {AppError} from '../../../shared/errors/AppError';

interface IRequest{
   id: string, payment_status:string;
}

@injectable()
class UpdateScheduleService {

   constructor(
      @inject("SchedulesRepository")
      private SchedulesRepository: ISchedulesRepository) {
   }

  async execute({
    id, payment_status
  }:IRequest):Promise<void> {
    try {
      const foundSchedule = await this.SchedulesRepository.findById(id)

      if(!foundSchedule){
        throw new AppError("Schedule does not exists")
      }

      foundSchedule.payment_status = payment_status;

      await this.SchedulesRepository.save(foundSchedule)

    } catch (error) {
      throw new AppError("Error updating schedule")
      
    }
    
  }
}

export { UpdateScheduleService };