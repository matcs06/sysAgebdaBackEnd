import { Schedules } from '../entities/Schedules';

interface ICreateSchedulesDTO{
   customer_name:string;
   service:string;
   date: string;
   start_time:string;
   service_duration:string;
   phone_number: string;
   value?:string;
   isMorning: true | false;
   user_id:string;
}

interface ISchedulesRepository{
   list(user_id:string): Promise<Schedules[]>;
   create(data: ICreateSchedulesDTO): Promise<void>;
   deleteById(id:string): Promise<void>;
   findById(id:string): Promise<Schedules | undefined>;
   findByPhone(phone_number:string):Promise<Schedules | undefined>
}

export { ISchedulesRepository, ICreateSchedulesDTO };