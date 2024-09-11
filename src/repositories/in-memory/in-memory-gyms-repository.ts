import { Gym, Prisma } from "@prisma/client";
import { findManyNearbyParams, GymsRepository } from "../prisma/gyms-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class inMemoryGymsRepository implements GymsRepository {

    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async findManyNearby(params: findManyNearbyParams) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                {
                    latitude: params.latitude,
                    longitude: params.longitude
                },
                {
                    latitude:item.latitude.toNumber(),
                    longitude:item.longitude.toNumber()
                }
            )

            console.log(distance) //De uma olhada em quão longe está

            return distance < 10
        })
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
            created_at: Date(),
        }

        this.items.push(gym)

        return gym
    }


    async searchMany(query: string, page: number) {
        return this.items.filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }
}