import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ISchedulesRepository } from '../repositories/ISchedulesRepository';

@injectable()
class DeleteScheduleService {

  constructor(
    @inject("SchedulesRepository")
    private SchedulesRepository: ISchedulesRepository) {
  }

  async execute(id:string): Promise<void> {

     const findSchedule = await this.SchedulesRepository.findById(id)

     if(!findSchedule){
        throw new AppError("Schedule not found with this id")
     }

     await this.SchedulesRepository.deleteById(id);
  }
}

export { DeleteScheduleService };
