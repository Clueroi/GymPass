import { Gym,  } from '@prisma/client'
import { PrismaGymRepository} from '@/repositories/prisma/prisma-gym-repository'


interface FetchNearbyGymsUseCaseRequest{
    userLatitude:number
    userLongitude:number
}

interface FetchNearbyGymsUseCaseResponse{
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase{

    constructor(private gymsRepository: PrismaGymRepository){}

    async execute({
        userLatitude,
        userLongitude,
    }:FetchNearbyGymsUseCaseRequest):Promise<FetchNearbyGymsUseCaseResponse>{
    
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return { 
            gyms
        }
    } 
}
