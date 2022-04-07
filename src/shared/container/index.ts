import { container, delay} from "tsyringe"
import { IAvailabilityRepository } from "../../modules/availability/repositories/IAvailabilityRepository"
import { AvailabilityRepository } from "../../modules/availability/repositories/implementations/AvailabilityRepository"

import { ProductsRepository } from "../../modules/product/repositories/implementations/ProductsRepository"
import { IProductsRepository } from "../../modules/product/repositories/IProductsRepository"

import { UserRepository} from "../../modules/users/repositories/implementations/UserRepository"
import {IUserRepository} from "../../modules/users/repositories/IUserRepository"

import {SchedulesRepository} from "../../modules/schedules/repositories/implementation/SchedulesRepository"

import {ISchedulesRepository} from "../../modules/schedules/repositories/ISchedulesRepository"

import {ITransactionsRepository} from "../../modules/transactions/repositories/ITransactionsRepository"
import { TransactionsRepository} from "../../modules/transactions/repositories/implementations/TransactionsRepository"

container.registerSingleton<IProductsRepository>(
   "ProductsRepository", ProductsRepository
)

container.registerSingleton<IUserRepository>(
   "UserRepository", 
   delay(() => UserRepository) 
)

container.registerSingleton<IAvailabilityRepository>(
   "AvailabilityRepository", 
   delay(() => AvailabilityRepository) 
)

container.registerSingleton<ISchedulesRepository>(
   "SchedulesRepository", 
   delay(() => SchedulesRepository) 
)

container.registerSingleton<ITransactionsRepository>(
   "TransactionsRepository", 
   delay(() => TransactionsRepository) 
)