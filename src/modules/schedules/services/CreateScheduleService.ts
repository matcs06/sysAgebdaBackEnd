import { ISchedulesRepository } from '../repositories/ISchedulesRepository';
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../shared/errors/AppError';
import { IAvailabilityRepository } from '../../availability/repositories/IAvailabilityRepository';
import { addTimes } from '../../../utils/AddTimes';

interface IRequest {
   customer_name: string;
   service: string;
   date: string;
   start_time: string;
   service_duration: string;
   phone_number: string;
   isMorning: true | false;
   price: string;
   user_id: string;
}


@injectable()
class CreateSchedulesService {

   constructor(
      @inject("SchedulesRepository")
      private SchedulesRepository: ISchedulesRepository,

      @inject("AvailabilityRepository")
      private AvailabilityRepository: IAvailabilityRepository,

   ) { }

   async execute(data: IRequest): Promise<void> {

      const availability = await this.AvailabilityRepository.findByDate(data.date, data.user_id)

      if (!availability) {
         throw new AppError("Availability does not exists for this date")
      }

      var afternoon_empty = true;
      var morning_empty = true;
      var availability_aft_start_time = '';
      var availability_aft_end_time = '';
      var availability_mng_start_time = '';
      var availability_mng_end_time = '';

      if (availability.afternoon_start_time != "" && availability.afternoon_start_time != "") {
         afternoon_empty = false;
         availability_aft_start_time = availability.afternoon_start_time
         availability_aft_end_time = availability.afternoon_end_time
      }

      if (availability.morning_start_time != "" && availability.morning_start_time != "") {
         morning_empty = false
         availability_mng_start_time = availability.morning_start_time
         availability_mng_end_time = availability.morning_end_time
      }

      //It possible to compare to strings"time" if they are in HH:MM:SS format
      /*Checando se  tempo escolhido está dentro do definido no availability e se o chedule é no periodo da manha ou tarde*/
      if (!morning_empty && data.isMorning) {
         if (availability_mng_start_time <= data.start_time && availability_mng_end_time > data.start_time) {

            const startTimeAndDuration = addTimes(data.start_time, data.service_duration)

            if (startTimeAndDuration + ":00" > availability_mng_end_time) {
               throw new AppError("Your schedule is crossing the end time of the availability")
            }

         } else {
            throw new AppError("Your schedule is out of the morning availability time for this date")
         }
      }

      if (!afternoon_empty && !data.isMorning) {
         if (availability_aft_start_time <= data.start_time && availability_aft_end_time > data.start_time) {

            const startTimeAndDuration = addTimes(data.start_time, data.service_duration)

            if (startTimeAndDuration + ":00" > availability_aft_end_time) {
               throw new AppError("Your schedule is crossing the end time of the availability")
            }

         } else {
            throw new AppError("Your schedule is out of the afternoon availability time for this date")
         }
      }

      const schedules = await this.SchedulesRepository.list(data.user_id)

      if (schedules) {

         schedules.map((schedule) => {

            if (schedule.date === data.date) {
               //Checando se já tem um agendamento no período escolhido de um novo 
               //agendamento
               const scheduledEndTime = addTimes(schedule.start_time, schedule.service_duration)
               const newTimeEnd = addTimes(data.start_time, data.service_duration)

               if (data.start_time >= schedule.start_time && data.start_time < scheduledEndTime + ":00") {
                  throw new AppError("There is already a schedule in this time range")
               }

               if (newTimeEnd + ":00" > schedule.start_time && newTimeEnd + ":00" < scheduledEndTime + ":00") {
                  throw new AppError("There is already a schedule in this time range")
               }

            }

         })

      }

      await this.SchedulesRepository.create(data)

   }
}

export { CreateSchedulesService };
