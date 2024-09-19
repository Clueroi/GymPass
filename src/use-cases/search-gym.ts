import { Gym,  } from '@prisma/client'
import { PrismaGymRepository} from '@/repositories/prisma/prisma-gym-repository'


interface SearchGymUseCaseRequest{
    query:string
    page:number
}

interface SearchGymUseCaseResponse{
    gyms: Gym[]
}

export class SearchGymUseCase{

    constructor(private gymsRepository: PrismaGymRepository){}

    async execute({
        query,
        page,
    }:SearchGymUseCaseRequest):Promise<SearchGymUseCaseResponse>{
    
        const gyms = await this.gymsRepository.searchMany(query, page)

        return { 
            gyms
        }
    } 
}
