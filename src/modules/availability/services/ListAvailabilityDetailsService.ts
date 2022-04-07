import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { Availability } from '../entities/Availability';
import { IAvailabilityRepository } from '../repositories/IAvailabilityRepository';
import {addTimes, uniqueArray} from "../../../utils/AddTimes"
import { ISchedulesRepository } from '../../schedules/repositories/ISchedulesRepository';

interface AvailabilityDetail{
  availability: Availability,
  morning_available_times: Array<string>
  afternoon_available_times: Array<string>
}


@injectable()
class ListAvailabilityDetailsService {

  constructor(
    @inject("AvailabilityRepository")
    private availabilityRepository: IAvailabilityRepository,
    
    @inject("SchedulesRepository")
    private SchedulesRepository: ISchedulesRepository,
    ) {
  }

  async execute(id:string, service_duration:string, user_id:string): Promise<AvailabilityDetail | undefined> {
    const availability =  await this.availabilityRepository.findById(id);

    if(!availability){
       throw new AppError("Availability does not exists for this date")
    }

    var afternoon_empty = true;
    var morning_empty = true;
    var availability_aft_start_time = '';
    var availability_aft_end_time = '';
    var availability_mng_start_time = '';
    var availability_mng_end_time = '';

    if(availability.afternoon_start_time != "" && availability.afternoon_start_time !=""){
       afternoon_empty = false;
        availability_aft_start_time = availability.afternoon_start_time
        availability_aft_end_time = availability.afternoon_end_time
    }

    if(availability.morning_start_time != "" && availability.morning_start_time !=""){
       morning_empty = false
        availability_mng_start_time = availability.morning_start_time
        availability_mng_end_time = availability.morning_end_time
    }
    
    var morning_times:Array<string> = []
    var newMorning_times:Array<string> = []
    var newAfternoon_times:Array<string> = []
    var afternoon_times:Array<string> = []

    if(!morning_empty){
      while(availability_mng_start_time <= availability_mng_end_time){

        if(addTimes(availability_mng_start_time, service_duration) > availability_mng_end_time){
          break;
        }

        morning_times.push(availability_mng_start_time)
        availability_mng_start_time = addTimes(availability_mng_start_time, service_duration)
        availability_mng_start_time = availability_mng_start_time + ":00"

      }
    }
    
    if(!afternoon_empty){
      while(availability_aft_start_time <= availability_aft_end_time){
        
        if(addTimes(availability_aft_start_time, service_duration) > availability_aft_end_time){
          break;
        }

        afternoon_times.push(availability_aft_start_time)
        availability_aft_start_time = addTimes(availability_aft_start_time, service_duration)
        availability_aft_start_time = availability_aft_start_time + ":00"

      }
    }

    const schedules = await this.SchedulesRepository.list(user_id)

    schedules.map((schedule)=>{
      if(schedule.date === availability.date){
        if(!morning_empty && schedule.isMorning){

           morning_times.map((moring_time, index)=>{
            var overlaps = false; 
            const listedEndTime = addTimes(moring_time, service_duration) + ":00"
            const scheduleEndTime = addTimes(schedule.start_time, schedule.service_duration) + ":00"
                       

            if(schedule.start_time >= moring_time && schedule.start_time < listedEndTime   
            || 
            scheduleEndTime > moring_time && listedEndTime > scheduleEndTime 
            || 
            schedule.start_time <= moring_time && scheduleEndTime >= listedEndTime
            ){
              
              newMorning_times.push(moring_time + " indisponível")
             
              overlaps = true;
            }

            if(!overlaps){
                newMorning_times.push(moring_time)
            }
            

          })

        }

        if(!afternoon_empty && !schedule.isMorning){

           afternoon_times.map((afternoon_time, index)=>{
            var overlaps = false; 
            const listedEndTime = addTimes(afternoon_time, service_duration) + ":00"
            const scheduleEndTime = addTimes(schedule.start_time, schedule.service_duration) + ":00"

            if(schedule.start_time >= afternoon_time && schedule.start_time < listedEndTime  
            || 
            scheduleEndTime > afternoon_time && listedEndTime > scheduleEndTime
            || 
            schedule.start_time <= afternoon_time && scheduleEndTime >= listedEndTime){

              newAfternoon_times.push(afternoon_time + " indisponível")
              overlaps = true;
            }

            if(!overlaps){
              newAfternoon_times.push(afternoon_time)    
            }
            

          })

        }


      }
    })

    var availabilityDetail:AvailabilityDetail;

    const uniqueNewMorningTimes = uniqueArray(newMorning_times)
    const uniqueNewAfternoonTimes = uniqueArray(newAfternoon_times)

    if(newMorning_times.length === 0 && newAfternoon_times.length === 0 ){
      return availabilityDetail = {
        availability,
        morning_available_times: morning_times,
        afternoon_available_times: afternoon_times
      }
    }else{
      
      if(newMorning_times.length === 0 && newAfternoon_times.length != 0 ){
        return availabilityDetail = {
          availability,
          morning_available_times: morning_times,
          afternoon_available_times: uniqueNewAfternoonTimes
        }
      }

      if(newMorning_times.length != 0 && newAfternoon_times.length != 0 ){
        return availabilityDetail = {
          availability,
          morning_available_times: uniqueNewMorningTimes,
          afternoon_available_times: uniqueNewAfternoonTimes
        }
      }

      if(newMorning_times.length != 0 && newAfternoon_times.length === 0 ){
        return availabilityDetail = {
          availability,
          morning_available_times: uniqueNewMorningTimes,
          afternoon_available_times: afternoon_times
        }
      }
 
    }

    
  }
}

export { ListAvailabilityDetailsService };