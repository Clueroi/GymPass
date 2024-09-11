import { Prisma, CheckIn } from "@prisma/client";
import { checkInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class inMemoryCheckInReposistory implements checkInsRepository {

    
    public items: CheckIn[] = []
    
    
    async findByUserIdOnDate(userId: string, date: Date) {
        
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        
        const checkInOnSameDay = this.items.find((checkIn)=> {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            
            checkInDate
            
            return checkIn.user_id === userId && isOnSameDate
        })
        
        
        
        
        if(!checkInOnSameDay){
            return null
        }
        
        return checkInOnSameDay
    }
    
    
    async countByUserId(userId: string){
        return this.items.filter((item)=> item.user_id === userId).length
    }

    
    async findManyByUserId(userId: string, page:number){
        return this.items.filter((item)=> item.user_id === userId)
        .slice((page -1)*20, page * 20)
    }


    async findById(id: string){
       const checkIn = this.items.find((item)=> item.user_id === id)

        if(!checkIn){
            return null
        }

        return checkIn
    } 

    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            is_validated: data.is_validated ? new Date(data.is_validated) : null,
            created_at: new Date(),
        }

        this.items.push(checkin)

        return checkin
    }

    async save(checkIn: CheckIn){
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }
}