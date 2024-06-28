import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../../product/repositories/IProductsRepository';
import { ICreateSchedulesDTO, ISchedulesRepository } from '../repositories/ISchedulesRepository';
import { addLeadingZero } from '../../../utils/AddTimes';

@injectable()
class ListScheduleByMonthAndYearService {

  constructor(
    @inject("SchedulesRepository")
    private SchedulesRepository: ISchedulesRepository,

    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) { }

  async executebyMonthAndYear(user_id: string, schedule_date: String): Promise<ICreateSchedulesDTO[]> {
    const schedules = await this.SchedulesRepository.list(user_id);
    const products = await this.productsRepository.list(user_id)
    var newarrayOfSchedules: Array<ICreateSchedulesDTO> = [];

    schedules.map(async (schedule) => {

      let priceFromSchedule = "0";

      if (schedule.price == null || schedule.price == "") {
        priceFromSchedule = "0"
      } else {
        priceFromSchedule = schedule.price;
      }

      const product = products.filter((prod) => (
        prod.name === schedule.service
      )
      )

      let schedulePrice = product[0]?.price;

      if (!schedulePrice || schedulePrice == undefined || schedulePrice == null) {
        schedulePrice = priceFromSchedule
      }

      const newS = {
        id: schedule.id,
        customer_name: schedule.customer_name,
        phone_number: schedule.phone_number,
        service: schedule.service,
        date: schedule.date,
        start_time: schedule.start_time,
        service_duration: schedule.service_duration,
        value: schedulePrice,
        price: schedulePrice,
        isMorning: schedule.isMorning,
        payment_status: schedule.payment_status,
        user_id: user_id
      }

      newarrayOfSchedules.push(newS)

    })

    const filteredYear = schedule_date.substring(3)

    //const previousMonth = addLeadingZero((currenMont - 1)) + "/" + schedule_date.substring(4)

    //const nextMonth = addLeadingZero((currenMont + 1)) + "/" + schedule_date.substring(4)


    const filteredArrayByMonthAndYear = newarrayOfSchedules.filter((schedule: ICreateSchedulesDTO) => schedule.date.substring(6) == filteredYear)

    return filteredArrayByMonthAndYear

  }
}

export { ListScheduleByMonthAndYearService };