import { inject, injectable } from 'tsyringe';
import { Product } from '../../product/entities/Product';
import { IProductsRepository } from '../../product/repositories/IProductsRepository';
import { Schedules } from '../entities/Schedules';
import { ICreateSchedulesDTO, ISchedulesRepository } from '../repositories/ISchedulesRepository';

@injectable()
class ListScheduleService {

  constructor(
    @inject("SchedulesRepository")
    private SchedulesRepository: ISchedulesRepository,
    
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {}

  async execute(user_id:string): Promise<ICreateSchedulesDTO[]> {
    const schedules = await this.SchedulesRepository.list(user_id);
    const products = await this.productsRepository.list(user_id)
    var newarrayOfSchedules:Array<ICreateSchedulesDTO> = [];

    schedules.map(async (schedule)=>{
        
      const product = products.filter((prod)=>(
        prod.name === schedule.service
      )
      )
      
      const schedulePrice = product[0]?.price;
               
      const newS = {
        id: schedule.id,
        customer_name: schedule.customer_name,
        phone_number: schedule.phone_number,
        service: schedule.service,
        date: schedule.date,
        start_time: schedule.start_time,
        service_duration: schedule.service_duration,
        value: schedulePrice,
        isMorning: schedule.isMorning,
        user_id: user_id
      }

      newarrayOfSchedules.push(newS)
     
    })

    return newarrayOfSchedules

  }
}

export { ListScheduleService };